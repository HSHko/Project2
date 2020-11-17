const functions = require("firebase-functions");

const express = require("express");
const app = express();
app.use(express.json()); // for parsing application/json

const cors = require("cors");
app.use(cors()); // for firebase deploy

console.log({ msg: "server connected" });

// firebase examples: https://firebase.google.com/docs/samples/?authuser=0
const { fbAuth } = require("./util/admin");

const screams = require("./handlers/screams");
app.get("/screams", screams.getScreams);
app.get("/screams/:screamId", screams.getScream);
app.post("/scream", fbAuth, screams.addScreams);
app.delete("/scream/:screamId", fbAuth, screams.deleteScream);
app.get("/scream/:screamId/like", fbAuth, screams.likeScream);
app.get("/scream/:screamId/unlike", fbAuth, screams.unlikeScream);
app.post("/scream/:screamId/comment", fbAuth, screams.addCommentOnScream);

const users = require("./handlers/users");
app.post("/signup", users.signUp);
app.post("/login", users.login);
app.get("/getauthuser", fbAuth, users.getAuthenticatedUser);
app.post("/adduserdetails", fbAuth, users.addUserDetails);
app.post("/user/image", fbAuth, users.uploadImg);

// firebase deploy --only "functions:api,functions:createNotificationOnLike"
// exports.unDeploy = {}
const region = "asia-northeast1"; // "europe-west1"; //
exports.api = functions.region(region).https.onRequest(app);

exports.createNotifOnLike = functions
  .region(region)
  .firestore.document("likes/{id}")
  .onCreate(async snapshot => {
    const { db, admin } = require("./util/admin");
    const screamDoc = db.doc(`/screams/${snapshot.data().screamId}`);
    console.log(snapshot.data().screamId);
    try {
      const screamQry = await screamDoc.get();
      if (!screamQry.exists) throw { error: "scream not found" };
      if (screamQry.data().signId !== snapshot.data().signId) throw { error: "signId not match" };

      const newData = {
        screamId: screamQry.id,
        recipient: screamQry.data().signId,
        doner: snapshot.data().signId,
        type: "like",
        read: false,
        createdAt: admin.firestore.Timestamp.now().toDate().toISOString(),
      };
      db.doc(`notifs/${snapshot.id}`).set(newData);
      console.log("GGGGGGGGGGGGGGGGGGGGGGGGG");
    } catch (err) {
      console.error(err);
    }
  });

// exports.createNotificationOnLike = functions
//   .region(region)
//   .firestore.document("likes/{id}")
//   .onCreate(snapshot => {
//     return db
//       .doc(`/screams/${snapshot.data().screamId}`)
//       .get()
//       .then(doc => {
//         if (doc.exists && doc.data().signId !== snapshot.data().signId) {
//           return db.doc(`/notis/${snapshot.id}`).set({
//             createdAt: new Date().toISOString(),
//             recipient: doc.data().signId,
//             doner: snapshot.data().signId,
//             type: "like",
//             read: false,
//             screamId: doc.id,
//           });
//         }
//       })
//       .catch(err => console.error(err));
//   });

// firebase-busboy 이해: http://ghcksdk.com/firebase-express-multipart-form/
// 이미지파일을 브라우저에서 서버로 전송하기 위해서는 폼에 enctype="multipart/form-data" 를 추가해서 인코딩 타입을 multipart로 해줘야 한다.
// cloud functions에서는 요청의 body를 req.body가 아니라 req.rawBody에 저장한다.
// multer와 비슷한 역할을 하는 미들웨어인 busBoy를 사용하여 req.rawBody를 넘겨주니 정상적으로 파일을 읽을 수 있었다.
// https://qiita.com/toshi0607/items/c4440d3fbfa72eac840c

// TODO:
// https://www.youtube.com/watch?v=m_u6P5k0vP0&t=1989s
// 에러쉽게 만드는 모듈: https://www.npmjs.com/package/http-errors
// res.status(400).json 하는거보다 next(errorWithStatusAndMessage) 식으로 하는게 나음
// https://expressjs.com/en/guide/error-handling.html
// csurf, helmet 모듈 사용, 유저 요청 validate, sanitize
