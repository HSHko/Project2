const admin = require("firebase-admin");
admin.initializeApp();
exports.admin = admin;

const db = admin.firestore();
exports.db = db;

// FireBaseAuthentication
exports.fbAuth = async (req, res, next) => {
  try {
    let idToken;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      idToken = req.headers.authorization.split("Bearer ")[1];
    } else {
      throw { error: "No Token" };
    }

    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    const dbQry = await db.collection("users").where("uid", "==", req.user.uid).limit(1).get();
    req.user.signId = dbQry.docs[0].data().signId;
    return next();
  } catch (e) {
    console.error("Error while verifying token", e);
    return res.status(403).json(e);
  }
};
