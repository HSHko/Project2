const admin = require("firebase-admin");
admin.initializeApp();
exports.admin = admin;

const db = admin.firestore();
exports.db = db;

// FireBaseAuthentication
exports.fbAuth = async (req, res, next) => {
  try {
    let idToken;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      idToken = req.headers.authorization.split("Bearer ")[1];
    } else {
      throw { fb_auth: "fbAuth token not found" };
    }

    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.fbAuth = decodedToken;

    const userQry = await db.collection("users").doc(req.fbAuth.uid).get();
    req.fbAuth.userData = userQry.data();
    return next();
  } catch (e) {
    console.error("Error while verifying token", e);
    return res.status(403).json(e);
  }
};
