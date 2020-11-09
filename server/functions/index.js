const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

const express = require("express");
const app = express();
app.use(express.json());

const firebase = require("firebase");
const firebaseConfig = require("./auth");
firebase.initializeApp(firebaseConfig);

console.log({ msg: "server started" });

// TODO:
// 에러쉽게 만드는 모듈: https://www.npmjs.com/package/http-errors
// res.status(400).json 하는거보다 next(errorWithStatusAndMessage) 식으로 하는게 나음
// https://expressjs.com/en/guide/error-handling.html
// csurf, helmet 모듈 사용, 유저 요청 validate, sanitize

// ⏩테스트: $ firebase emulators:start
// ⏩데이터베이스 저장: https://console.firebase.google.com/u/0/   Cloud Firestore
// ⏩참고: https://firebase.google.com/docs/functions/get-started
// 참고2'

// 시작 테스트
// http://localhost:5001/project2-7396c/us-central1/helloWorld
// Hello from Firebase!
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

// 기본 구문
// exports.getMessage = functions.https.onRequest(async (req, res) => {
// app.get("/messages", async (req, res) => {
// exports.api = functions.https.onRequest(app);

// 🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦
// GET METHOD
// 🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦
app.get("/messages", async (req, res) => {
  try {
    const snap = await db.collection("messages").get();
    let data = [];
    snap.forEach(doc => data.push(doc.data()));
    res.json(data);
  } catch (e) {
    console.error(e.message);
  }
});

app.get("/messages2", async (req, res) => {
  try {
    const snap = await db.collection("messages").orderBy("createdAt", "desc").get();
    let data = [];

    snap.forEach(doc =>
      data.push({
        id: doc.id,
        title: doc.data().title,
        createdAt: doc.data().createdAt,
      }),
    );
    console.log({ data: data });
    console.log({ snap: snap });
    res.json(data);
  } catch (e) {
    console.error(e.message);
  }
});

// 🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦
// POST METHOD
// 🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦

const FBAuth = (req, res, next) => {
  let idToken;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    idToken = req.headers.authorization.split("Bearer ")[1];
  } else {
    console.error("No token found");
    return res.status(403).json({ error: "Unauthorized" });
  }

  admin
    .auth()
    .verifyIdToken(idToken)
    .then(decodedToken => {
      req.user = decodedToken;
      console.log(decodedToken);
      return db.collection("users").where("userId", "==", req.user.uid).limit(1).get();
    })
    .then(data => {
      req.user.handle = data.docs[0].data().handle;
      return next();
    })
    .catch(e => {
      console.error("Error while verifying token", e);
      return res.status(403).json(e);
    });
};

app.post("/addmessage", FBAuth, async (req, res) => {
  const newData = {
    body: req.body.body,
    userHandle: req.user.handle,
    createdAt: admin.firestore.Timestamp.now().toDate().toISOString(),
  };

  try {
    const snap = await db.collection("messages").add(newData);
    const result = `Message with ID: ${snap.id} added.`;
    res.json({ result: result });
  } catch (e) {
    console.error(e.message);
    return res.status(500).json({ error: `something went wrong.` });
  }
});

function isEmpty(string) {
  if (string.trim() === "") return true;
  return false;
}

function isEmail(email) {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  return false;
}

app.post("/signup", async (req, res) => {
  const newData = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle,
  };

  let errors = {};

  if (isEmpty(newData.email)) errors.email = "empty";
  else if (!isEmail(newData.email)) errors.email = "Invalid Email address";
  if (isEmpty(newData.password)) errors.password = "empty";
  if (newData.password !== newData.confirmPassword) errors.confirmPassword = "not match";
  if (isEmpty(newData.handle)) errors.handle = "empty";

  if (Object.keys(errors).length > 0) return res.status(400).json({ erros: errors });

  try {
    await db
      .doc(`/users/${newData.handle}`)
      .get()
      .then(doc => {
        if (doc.exists) {
          throw { error: "handle Already exist" };
        }
      });

    const data = await firebase
      .auth()
      .createUserWithEmailAndPassword(newData.email, newData.password);

    token = await data.user.getIdToken();

    const userCredentials = {
      email: newData.email,
      handle: newData.handle,
      createdAt: admin.firestore.Timestamp.now().toDate().toISOString(),
      uid: data.user.uid,
    };
    await db.doc(`/users/${newData.handle}`).set(userCredentials);

    return res.status(201).json({ token: token });
  } catch (e) {
    console.error(e);
    if (e.code === "auth/email-already-in-use") {
      return res.status(400).json(e);
    } else {
      return res.status(500).json(e);
    }
  }
});

app.post("/login", async (req, res) => {
  const newData = {
    email: req.body.email,
    password: req.body.password,
  };

  let errors = {};

  if (isEmpty(newData.email)) errors.email = "empty";
  if (isEmpty(newData.password)) errors.password = "empty";

  if (Object.keys(errors).length > 0) return res.status(400).json(errors);

  try {
    const data = await firebase.auth().signInWithEmailAndPassword(newData.email, newData.password);

    token = await data.user.getIdToken();

    return res.status(201).json({ token: token });
  } catch (e) {
    console.error(e);
    if (e.code === "auth/wrong-password") {
      return res.status(403).json({ error: e });
    }
    return res.status(500).json(e);
  }
});

exports.api = functions.https.onRequest(app); // https://baseurl.com/api/
// exports.api = functions.region("asia-northeast1").https.onRequest(app);
