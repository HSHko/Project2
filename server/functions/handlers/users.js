const { db, admin } = require("../util/admin");
const { validateSignUpData, validateLoginData } = require("../util/validators");
const firebase = require("firebase");
const pool = require("../util/pool");
firebase.initializeApp(pool);

exports.signUp = async (req, res) => {
  const qryData = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle,
  };

  const { valid, errors } = validateSignUpData(qryData);
  if (!valid) return res.status(400).json({ errors: errors });

  try {
    await db
      .doc(`/users/${qryData.handle}`)
      .get()
      .then(doc => {
        if (doc.exists) {
          throw { error: "handle Already exist" };
        }
      });

    const data = await firebase
      .auth()
      .createUserWithEmailAndPassword(qryData.email, qryData.password);

    token = await data.user.getIdToken();

    const userCredentials = {
      email: qryData.email,
      handle: qryData.handle,
      createdAt: admin.firestore.Timestamp.now().toDate().toISOString(),
      uid: data.user.uid,
    };
    await db.doc(`/users/${qryData.handle}`).set(userCredentials);

    return res.status(201).json({ token: token });
  } catch (e) {
    console.error(e);
    if (e.code === "auth/email-already-in-use") {
      return res.status(400).json(e);
    } else {
      return res.status(500).json(e);
    }
  }
};

exports.login = async (req, res) => {
  const qryData = {
    email: req.body.email,
    password: req.body.password,
  };

  const { valid, errors } = validateLoginData(qryData);
  if (!valid) return res.status(400).json({ errors: errors });

  try {
    const data = await firebase.auth().signInWithEmailAndPassword(qryData.email, qryData.password);

    token = await data.user.getIdToken();

    return res.status(201).json({ token: token });
  } catch (e) {
    console.error(e);
    if (e.code === "auth/wrong-password") {
      return res.status(403).json({ error: e });
    }
    return res.status(500).json(e);
  }
};
