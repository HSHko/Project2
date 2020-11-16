const { db, admin } = require("../util/admin");
const { validateSignUpData, validateLoginData } = require("../util/validators");
const firebase = require("firebase");
const pool = require("../util/pool");

exports.signUp = async (req, res) => {
  const newData = {
    signId: req.body.signId,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  };

  const { valid, errors } = validateSignUpData(newData);
  if (!valid) return res.status(400).json({ errors: errors });

  const noImg = "mystery-man.png";

  try {
    const dbQry = await db.doc(`/users/${newData.signId}`).get();
    if (dbQry.exists) throw { error: "signId Already exist" };

    const fbData = await firebase
      .auth()
      .createUserWithEmailAndPassword(newData.email, newData.password);

    token = await fbData.user.getIdToken();

    const userCredentials = {
      signId: newData.signId,
      email: newData.email,
      auth: "",
      custumId: "",
      createdAt: admin.firestore.Timestamp.now().toDate().toISOString(),
      imgUrl: `https://firebasestorage.googleapis.com/v0/b/${pool.storageBucket}/o/${noImg}?alt=media`,
      uid: fbData.user.uid,
    };
    await db.doc(`/users/${newData.signId}`).set(userCredentials);

    return res.status(201).json({ token: token });
  } catch (err) {
    console.error(err);
    if (err.code === "auth/email-already-in-use") {
      return res.status(400).json(err);
    } else {
      return res.status(500).json(err);
    }
  }
};

exports.login = async (req, res) => {
  const newData = {
    email: req.body.email,
    password: req.body.password,
  };

  const { valid, errors } = validateLoginData(newData);
  if (!valid) return res.status(400).json({ errors: errors });

  try {
    const qryData = await firebase
      .auth()
      .signInWithEmailAndPassword(newData.email, newData.password);

    token = await qryData.user.getIdToken();

    return res.status(201).json({ token: token });
  } catch (e) {
    console.error(e);
    if (e.code === "auth/wrong-password") {
      return res.status(403).json({ error: e });
    }
    return res.status(500).json(e);
  }
};

exports.addUserDetails = async (req, res) => {
  if (req.body.introduce.trim() !== "") req.body.introduce = req.body.introduce;
  // if (req.body.website.trim() !== "") {
  //   if (req.body.website.trim().substring(0, 4) !== "http") {
  //     req.body.website = `http://${req.body.website.trim()}`;
  //   } else {
  //     req.body.website = req.body.website;
  //   }
  // }

  try {
    console.log({ "req.body": req.body });
    await db.doc(`users/${req.fbAuth.signId}`).update(req.body);
    return res.json({ msg: "addUserDetails Done" });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.getAuthenticatedUser = async (req, res) => {
  let userData = {};

  try {
    const userQry = await db.doc(`/users/${req.fbAuth.signId}`).get();
    if (userQry.exists) {
      userData.credentials = userQry.data();
    } else throw { "userQry.exists": userQry.exsits };

    const likeQry = await db.collection("likes").where("signId", "==", req.fbAuth.signId).get();
    userData.likes = [];
    likeQry.forEach(doc => {
      userData.likes.push(doc.data());
    });

    const notifyQry = await db
      .collection("notifications")
      .where("recipient", "==", req.fbAuth.signId)
      .orderBy("createdAt", "desc")
      .limit(10)
      .get();
    userData.notifications = [];
    notifyQry.forEach(doc => {
      userData.notifications.push({
        recipient: doc.data().recipient,
        sender: doc.data().sender,
        createdAt: doc.data().createdAt,
        screamId: doc.data().screamId,
        type: doc.data().type,
        read: doc.data().read,
        notificationId: doc.id,
      });
    });

    return res.json(userData);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.uploadImg = async (req, res) => {
  const Busboy = require("busboy");
  const path = require("path"); // File System 모듈
  const os = require("os"); // 서버의 기본적인 하드웨어 자원들의 정보를 확인
  const fs = require("fs");

  const busboy = new Busboy({ headers: req.headers });

  let imgFileName;
  let imgToBeUploaded = {};

  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    // Content-Disposition: form-data; name="fieldName"; filename="filename.jpg" // fieldname, filename
    // Content-Type: image // mimetype
    // console.log({
    //   "req.headers": req.headers,
    //   fieldname: fieldname,
    //   filename: filename, // 7bit
    //   encoding: encoding,
    //   mimetype: mimetype,
    // });
    if (mimetype !== "image/jpeg" && mimetype !== "image/png") {
      return res.status(400).json({
        mimetype: mimetype,
        error: "mimetype is not image/jpeg && image/png",
      });
    }

    // my.img.png => ['my', 'img', 'png']
    const imgExtension = filename.split(".")[filename.split(".").length - 1];
    // '32756238461724837.png'
    imgFileName = `${Math.round(Math.random() * 1000000000000).toString()}.${imgExtension}`;
    // 'C:\\Users\\XXX\\AppData\\Local\\Temp\\66804778864.jpg'
    const filepath = path.join(os.tmpdir(), imgFileName);
    imgToBeUploaded = { filepath, mimetype };
    file.pipe(fs.createWriteStream(filepath));
  });
  busboy.on("finish", () => {
    admin
      .storage()
      .bucket()
      .upload(imgToBeUploaded.filepath, {
        resumable: false,
        metadata: {
          metadata: {
            contentType: imgToBeUploaded.mimetype,
          },
        },
      })
      .then(() => {
        console.log({ "req.fbAuth": req.fbAuth });
        const imgUrl = `https://firebasestorage.googleapis.com/v0/b/${pool.storageBucket}/o/${imgFileName}?alt=media`;
        return db.doc(`/users/${req.fbAuth.signId}`).update({ imgUrl });
      })
      .then(() => {
        return res.json({ message: "img uploaded successfully" });
      })
      .catch(err => {
        console.error(err);
        return res.status(500).json({ error: err });
      });
  });
  busboy.end(req.rawBody);
};
