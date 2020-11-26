const { db, admin } = require("../util/admin");
const { validateSignUpData, validateLoginData } = require("../util/validators");
const { uuid } = require("uuidv4");
const firebase = require("firebase");
const pool = require("../util/pool");
firebase.initializeApp(pool);

exports.signUp = async (req, res) => {
  const newData = {
    sign_id: req.body.sign_id,
    email: req.body.email,
    password: req.body.password,
    confirm_password: req.body.confirm_password,
  };

  const { valid, errors } = validateSignUpData(newData);
  if (!valid) return res.status(400).json({ errors: errors });

  const noImg = "mystery-man.png";

  try {
    const dbQry = await db.doc(`/users/${newData.sign_id}`).get();
    if (dbQry.exists) throw { error: "sign_id Already exist" };

    const fbData = await firebase
      .auth()
      .createUserWithEmailAndPassword(newData.email, newData.password);
    token = await fbData.user.getIdToken();

    const credentials = {
      sign_id: newData.sign_id,
      email: newData.email,
      uid: fbData.user.uid,
      custom_id: "",
      authority: "user",
      created_at: admin.firestore.Timestamp.now().toDate().toISOString(),
      img_url: `https://firebasestorage.googleapis.com/v0/b/${pool.storageBucket}/o/${noImg}?alt=media`,
      introduce: "",
    };
    await db.doc(`/users/${newData.sign_id}`).set(credentials);

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

    return res.status(200).json({ token: token });
  } catch (err) {
    console.error(err);
    if (e.code === "auth/wrong-password") {
      return res.status(403).json({ error: err });
    }
    return res.status(500).json(err);
  }
};

exports.addUserDetails = async (req, res) => {
  if (req.body.introduce.trim() !== "") req.body.introduce = req.body.introduce;

  try {
    await db.doc(`users/${req.fbAuth.sign_id}`).update(req.body);
    return res.json({ msg: "addUserDetails Done" });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.getUserDetails = async (req, res) => {
  let newData = {};

  try {
    const userDoc = db.doc(`/users/${req.params.sign_id}`);
    const userQry = await userDoc.get();
    if (!userQry.exists)
      throw { error: `userDoc: ${req.params.sign_id} not found` };

    const screamDoc = db
      .collection(`screams`)
      .where(`sign_id`, `==`, req.params.sign_id)
      .orderBy(`created_at`, `desc`);
    const screamQry = await screamDoc.get();

    newData.screams = [];
    screamQry.forEach((doc) => {
      newData.screams.push({
        title: doc.data().title,
        body: doc.data().body,
        created_at: doc.data().created_at,
        like_cnt: doc.data().like_cnt,
        comment_cnt: doc.data().comment_cnt,
      });
    });

    return res.status(200).json({ newData: newData });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.getAuthenticatedUser = async (req, res) => {
  let newData = {};

  try {
    const userDoc = db.doc(`/users/${req.fbAuth.sign_id}`);
    const userQry = await userDoc.get();
    if (!userQry.exists) throw { "userQry.exists": userQry.exsits };

    newData.credentials = userQry.data();

    const likeQry = await db
      .collection("likes")
      .where("sign_id", "==", req.fbAuth.sign_id)
      .get();
    newData.likes = [];
    likeQry.forEach((doc) => {
      newData.likes.push(doc.data());
    });

    const notifQry = await db
      .collection("notifications")
      .where("recipient", "==", req.fbAuth.sign_id)
      .orderBy("created_at", "desc")
      .limit(10)
      .get();
    newData.notifications = [];
    notifQry.forEach((doc) => {
      newData.notifications.push({
        recipient: doc.data().recipient,
        doner: doc.data().doner,
        created_at: doc.data().created_at,
        scream_id: doc.data().scream_id,
        type: doc.data().type,
        read: doc.data().read,
        notification_id: doc.id,
      });
    });

    return res.json(newData);
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
  let generatedToken = uuid();

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
    imgFileName = `${Math.round(
      Math.random() * 1000000000000
    ).toString()}.${imgExtension}`;
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
            firebaseStorageDownloadTokens: generatedToken,
          },
        },
      })
      .then(() => {
        console.log({ "req.fbAuth": req.fbAuth });
        const img_url = `https://firebasestorage.googleapis.com/v0/b/${pool.storageBucket}/o/${imgFileName}?alt=media&token=${generatedToken}`;
        return db.doc(`/users/${req.fbAuth.sign_id}`).update({ img_url });
      })
      .then(() => {
        return res.json({ message: "img uploaded successfully" });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err });
      });
  });
  busboy.end(req.rawBody);
};

exports.marknotificationsRead = async (req, res) => {
  let batch = db.batch();
  req.body.forEach((notification_id) => {
    const notification = db.doc(`/notifications/${notification_id}`);
    batch.update(notification, { read: true });
  });

  try {
    await batch.commit();
    return res.status(200).json({ msg: "notifications marked read" });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};
