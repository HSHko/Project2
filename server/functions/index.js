const functions = require("firebase-functions");
const { db, admin } = require("./util/admin");

const express = require("express");
const app = express();
app.use(express.json());

const fbAuth = require("./util/fbAuth");

console.log({ msg: "server started" });

// TODO:
// https://www.youtube.com/watch?v=m_u6P5k0vP0&t=1989s
// 에러쉽게 만드는 모듈: https://www.npmjs.com/package/http-errors
// res.status(400).json 하는거보다 next(errorWithStatusAndMessage) 식으로 하는게 나음
// https://expressjs.com/en/guide/error-handling.html
// csurf, helmet 모듈 사용, 유저 요청 validate, sanitize

const messages = require("./handlers/messages");
app.get("/messages", messages.getAllMessages);
app.post("/addmessage", fbAuth, messages.addMessages);

const users = require("./handlers/users");
app.post("/signup", users.signUp);
app.post("/login", users.login);

exports.api = functions.https.onRequest(app); // https://baseurl.com/api/
// exports.api = functions.region("asia-northeast1").https.onRequest(app);
