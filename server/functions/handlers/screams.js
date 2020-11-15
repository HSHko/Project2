const { db, admin } = require("../util/admin");

exports.getAllScreams = async (req, res) => {
  try {
    const snap = await db.collection("screams").orderBy("createdAt", "desc").get();
    let newData = [];

    snap.forEach(doc =>
      newData.push({
        id: doc.id,
        title: doc.data().title,
        createdAt: doc.data().createdAt,
      }),
    );
    res.status(200).json({ newData: newData });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.addScreams = async (req, res) => {
  const newData = {
    signId: req.user.signId,
    title: req.body.title,
    body: req.body.body,
    createdAt: admin.firestore.Timestamp.now().toDate().toISOString(),
    likeCount: 0,
    commentCount: 0,
  };

  try {
    const snap = await db.collection("screams").add(newData);
    const result = `Scream with ID: ${snap.id} added.`;
    return res.status(201).json({ result: result });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.getScream = async (req, res) => {
  let newData = {};

  try {
    const screamQry = await db.doc(`/screams/${req.params.screamId}`).get();
    if (!screamQry.exists) throw { error: "no such db" };
    newData = screamQry.data();
    newData.screamId = doc.id;
    console.log(doc.id);

    const commentQry = db.collection("comments").where("screamId", "==", req.params.screamId).get();
    newData.comments = [];
    commenctQry.forEach(doc => {
      newData.push(doc.data());
    });

    return res.status(200).json({ newData: newData });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};
