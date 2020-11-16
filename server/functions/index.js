const functions = require("firebase-functions");

const express = require("express");
const app = express();
app.use(express.json()); // for parsing application/json

const firebase = require("firebase");
const pool = require("./util/pool");
firebase.initializeApp(pool);

// firebase-busboy 이해: http://ghcksdk.com/firebase-express-multipart-form/
// 이미지파일을 브라우저에서 서버로 전송하기 위해서는 폼에 enctype="multipart/form-data" 를 추가해서 인코딩 타입을 multipart로 해줘야 한다.
// cloud functions에서는 요청의 body를 req.body가 아니라 req.rawBody에 저장한다.
// multer와 비슷한 역할을 하는 미들웨어인 busBoy를 사용하여 req.rawBody를 넘겨주니 정상적으로 파일을 읽을 수 있었다.

// https://qiita.com/toshi0607/items/c4440d3fbfa72eac840c

console.log({ msg: "server started" });

// TODO:
// https://www.youtube.com/watch?v=m_u6P5k0vP0&t=1989s
// 에러쉽게 만드는 모듈: https://www.npmjs.com/package/http-errors
// res.status(400).json 하는거보다 next(errorWithStatusAndMessage) 식으로 하는게 나음
// https://expressjs.com/en/guide/error-handling.html
// csurf, helmet 모듈 사용, 유저 요청 validate, sanitize

// firebase examples: https://firebase.google.com/docs/samples/?authuser=0
const { fbAuth } = require("./util/admin");

const screams = require("./handlers/screams");
app.get("/screams", screams.getScreams);
app.get("/screams/:screamId", screams.getScream);
app.post("/scream", fbAuth, screams.addScreams);
// TODO: delete
app.post("/scream/:screamId/like", fbAuth, screams.likeScream);
app.post("/scream/:screamId/unlike", fbAuth, screams.unlikeScream);
app.post("/scream/:screamId/comment", fbAuth, screams.addCommentOnScream);

const users = require("./handlers/users");
app.post("/signup", users.signUp);
app.post("/login", users.login);
app.get("/getauthuser", fbAuth, users.getAuthenticatedUser);
app.post("/adduserdetails", fbAuth, users.addUserDetails);
app.post("/user/image", fbAuth, users.uploadImg);

// exports.api = functions.https.onRequest(app); // https://baseurl.com/api/
exports.api = functions.region("asia-northeast1").https.onRequest(app);
