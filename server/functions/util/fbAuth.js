const { admin, db } = require("./admin");

// FireBaseAuthentication
module.exports = async (req, res, next) => {
  try {
    let idToken;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      idToken = req.headers.authorization.split("Bearer ")[1];
    } else {
      throw { error: "No token found" };
    }

    const decodedToken = await admin.auth().verifyIdToken(idToken);
    // console.log({ decodedToken: decodedToken });
    req.user = decodedToken;
    const data = await db.collection("users").where("uid", "==", req.user.uid).limit(1).get();
    // >    'data.docs[0].data()': {
    // >      email: 'test1@email.com',
    // >      createdAt: '2020-11-09T10:59:28.653Z',
    // >      uid: 'A0gG6DyLs*********Hr2NKm1',
    // >      handle: 'test1'
    // >    }
    req.user.signId = data.docs[0].data().signId;
    return next();
  } catch (e) {
    console.error("Error while verifying token", e);
    return res.status(403).json(e);
  }
};
