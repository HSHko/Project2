const functions = require("firebase-functions");

const express = require("express");
const app = express();
app.use(express.json()); // for parsing application/json

const cors = require("cors");
app.use(cors()); // for firebase deploy

console.log({ msg: "server connected" });

// https://github.com/hidjou/classsed-react-firebase-functions/tree/master/functions
// firebase examples: https://firebase.google.com/docs/samples/?authuser=0
const { fbAuth, db } = require("./util/admin");

// firebase deploy --only functions:func1,functions:func2

// const screams = require("./handlers/screams");
// app.get("/screams", screams.getScreams);
// app.get("/screams/:scream_id", screams.getScream);
// app.post("/scream", fbAuth, screams.addScreams);
// app.delete("/scream/:scream_id", fbAuth, screams.deleteScream);
// app.get("/scream/:scream_id/like", fbAuth, screams.likeScream);
// app.get("/scream/:scream_id/unlike", fbAuth, screams.unlikeScream);
// app.post("/scream/:scream_id/comment", fbAuth, screams.addCommentOnScream);

const posts = require("./handlers/posts");
app.get("/posts/getpost/:idx", posts.getPost);
app.get("/posts/getposts/:page", posts.getPosts);
app.post("/posts/addpost", fbAuth, posts.addPost);

const comments = require("./handlers/comments");
app.get("/comments/getcomments/:idx", comments.getComments);
app.post("/comments/addcomment/:idx", fbAuth, comments.addComment);

const users = require("./handlers/users");
app.post("/users/signup", users.signUp);
app.post("/users/signin", users.signIn);
app.post("/users/getuserdetails", fbAuth, users.getUserDetails);
app.post("/users/adduserdetails", fbAuth, users.addUserDetails);
app.post("/users/image", fbAuth, users.uploadImg);

// firebase deploy --only "functions:api,functions:createNotificationOnLike"
// exports.unDeploy = {}
const { region } = require("./util/config");
exports.api = functions.region(region).https.onRequest(app);

const events = require("./handlers/events");
exports.createNotifOnLike = events.createNotifOnLike;
exports.deleteNotifOnUnlike = events.deleteNotifOnUnlike;

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

// // 시작 테스트
// // http://localhost:5001/project2-7396c/us-central1/helloWorld
// // Hello from Firebase!
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", { structuredData: true });
//   response.send("Hello from Firebase!");
// });

// // 기본 구문
// // exports.getMessage = functions.https.onRequest(async (req, res) => {
// // app.get("/messages", async (req, res) => {
// // exports.api = functions.https.onRequest(app);

// // ⏩테스트: $ firebase emulators:start
