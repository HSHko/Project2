const { db, admin } = require("util/admin");

exports.getScreams = async (req, res) => {
  try {
    const dbQry = await db.collection("screams").orderBy("createdAt", "desc").get();
    let newData = [];

    dbQry.forEach(doc =>
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

exports.getScream = async (req, res) => {
  let newData = {};

  try {
    const screamQry = await db.doc(`/screams/${req.params.screamId}`).get();
    if (!screamQry.exists) throw { error: "scream doc not exist" };
    newData = screamQry.data();
    newData.screamId = screamQry.id;

    const commentQry = await db
      .collection("comments")
      .orderBy("createdAt", "desc")
      .where("screamId", "==", req.params.screamId)
      .get();
    // if (!commentQry.exsits) throw { error: "comment doc does not exist" };
    console.log(commentQry);
    newData.comments = [];
    commentQry.forEach(doc => {
      newData.comments.push(doc.data());
    });

    return res.status(200).json({ newData: newData });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.addScreams = async (req, res) => {
  const newData = {
    signId: req.fbAuth.signId,
    title: req.body.title,
    body: req.body.body,
    createdAt: admin.firestore.Timestamp.now().toDate().toISOString(),
    likeCnt: 0,
    commentCnt: 0,
  };

  try {
    const dbQry = await db.collection("screams").add(newData);
    const result = `Scream with ID: ${dbQry.id} added.`;
    return res.status(201).json({ result: result });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.addCommentOnScream = async (req, res) => {
  if (req.body.body.trim() === "") return res.status(500).json({ error: "empty body" });

  const newData = {
    signId: req.fbAuth.signId,
    screamId: req.params.screamId,
    body: req.body.body,
    createdAt: admin.firestore.Timestamp.now().toDate().toISOString(),
    likeCnt: 0,
  };

  try {
    const screamQry = await db.doc(`/screams/${req.params.screamId}`).get();
    if (!screamQry.exists) throw { error: "scream not found" };

    screamQry.ref.update({ commentCnt: screamQry.data().commentCnt + 1 });
    db.collection("comments").add(newData);

    return res.status(201).json({ newData: newData });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.likeScream = async (req, res) => {
  const likeDoc = db
    .collection(`likes`)
    .where(`signId`, `==`, req.fbAuth.signId)
    .where(`screamId`, `==`, req.params.screamId)
    .limit(1);
  const screamDoc = db.doc(`/screams/${req.params.screamId}`);

  try {
    const likeQry = await likeDoc.get();
    if (!likeQry.empty) throw { error: "already liked" };

    const screamQry = await screamDoc.get();
    if (!screamQry.exists) throw { error: "scream not found" };

    let newData;
    newData = screamQry.data();
    newData.screamId = screamQry.id;
    db.collection("likes").add({
      screamId: req.params.screamId,
      signId: req.fbAuth.signId,
    });
    newData.likeCnt += 1;
    await screamDoc.update({ likeCnt: newData.likeCnt });

    return res.status(201).json({ newData: newData });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.unlikeScream = async (req, res) => {
  const likeDoc = db
    .collection(`likes`)
    .where(`signId`, `==`, req.fbAuth.signId)
    .where(`screamId`, `==`, req.params.screamId)
    .limit(1);
  const screamDoc = db.doc(`/screams/${req.params.screamId}`);

  try {
    const likeQry = await likeDoc.get();
    if (likeQry.empty) throw { error: "not liked yet" };

    const screamQry = await screamDoc.get();
    if (!screamQry.exists) throw { error: "scream not found" };

    await db.doc(`/likes/${likeQry.docs[0].id}`).delete();
    await screamDoc.update({ likeCnt: screamQry.data().likeCnt - 1 });

    return res.status(201).json({ unliked: likeQry.docs[0].data() });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.deleteScream = async (req, res) => {
  const screamDoc = db.doc(`/screams/${req.params.screamId}`);

  try {
    const screamQry = await screamDoc.get();
    if (!screamQry.exists) throw { error: "scream not found" };
    if (screamQry.data().signId !== req.fbAuth.signId) throw { error: "signId not match" };

    await screamDoc.delete();

    return res.status(200).json({ result: screamQry });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};
