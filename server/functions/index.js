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

// 클라이언트 응답. 참고: https://developer.mozilla.org/ko/docs/Web/HTTP/Status
// 200 OK 요청이 성공적으로 되었습니다. 성공의 의미는 HTTP 메소드에 따라 달라집니다
// 201 Created 요청이 성공적이었으며 그 결과로 새로운 리소스가 생성되었습니다.
// 400 Bad Request 이 응답은 잘못된 문법으로 인하여 서버가 요청을 이해할 수 없음을 의미합니다.
// 408 Request Timeout
// 429 Too Many Requests
// 500 Internal Server Error  서버가 처리 방법을 모르는 상황이 발생했습니다
// 502 Bad Gateway 서버가 요청을 처리하는 데 필요한 응답을 얻기 위해 게이트웨이로 작업하는 동안 잘못된 응답을 수신했음을 의미

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

app.post("/addmessage", async (req, res) => {
  const newData = {
    title: req.body.title,
    userHandle: req.body.userHandle,
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

app.post("/signup", async (req, res) => {
  const newData = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle,
  };

  try {
    // const snap = await db.doc(`/users/${newData.handle}`).get();
    // if (snap.exists) {
    //   throw { email: "Email already in use" };
    // }
    let token, userId;

    const data = await firebase
      .auth()
      .createUserWithEmailAndPassword(newData.email, newData.password);

    userId = data.user.uid;
    token = await data.user.getIdToken();
    const userCredentials = {
      email: newData.email,
      handle: newData.handle,
      createdAt: admin.firestore.Timestamp.now().toDate().toISOString(),
      userId: userId,
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

  db.doc(`/users/${newData.handle}`)
    .get()
    .then(doc => {
      if (doc.exists) {
        return res.status(400).json({ handle: "this handle is already taken" });
      } else {
        return firebase.auth().createUserWithEmailAndPassword(newData.email, newData.password);
      }
    })
    .then(data => {
      return data.user.getIdToken();
    })
    .then(token => {
      return res.status(201).json({ token: token });
    })
    .catch(e => {
      console.error(e);
      if (e.code === "auth/email-already-in-use") {
        return res.status(400).json({ email: "email already used" });
      } else {
        return res.status(500).json({ error: e });
      }
    });
});

exports.api = functions.https.onRequest(app); // https://baseurl.com/api/
// exports.api = functions.region("asia-northeast1").https.onRequest(app);
