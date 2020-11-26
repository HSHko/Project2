const { db, admin } = require("../util/admin");

exports.getScreams = async (req, res) => {
  let newData = [];
  try {
    const dbDoc = db.collection("screams").orderBy("created_at", "desc");
    const dbQry = await dbDoc.get();

    dbQry.forEach((doc) =>
      newData.push({
        scream_id: doc.id,
        title: doc.data().title,
        created_at: doc.data().created_at,
      })
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
    const screamDoc = db.doc(`/screams/${req.params.scream_id}`);
    const screamQry = await screamDoc.get();
    if (!screamQry.exists) throw { error: "scream not found" };

    newData = screamQry.data();
    newData.scream_id = screamQry.id;

    const commentDoc = db
      .collection("comments")
      .orderBy("created_at", "desc")
      .where("scream_id", "==", req.params.scream_id);
    const commentQry = await commentDoc.get();
    newData.comments = [];
    commentQry.forEach((doc) => {
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
    sign_id: req.fbAuth.sign_id,
    title: req.body.title,
    body: req.body.body,
    created_at: admin.firestore.Timestamp.now().toDate().toISOString(),
    like_cnt: 0,
    comment_cnt: 0,
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
  if (req.body.body.trim() === "")
    return res.status(500).json({ error: "empty body" });

  const newData = {
    sign_id: req.fbAuth.sign_id,
    scream_id: req.params.scream_id,
    body: req.body.body,
    created_at: admin.firestore.Timestamp.now().toDate().toISOString(),
    like_cnt: 0,
  };

  try {
    const screamQry = await db.doc(`/screams/${req.params.scream_id}`).get();
    if (!screamQry.exists) throw { error: "scream not found" };

    screamQry.ref.update({ comment_cnt: screamQry.data().comment_cnt + 1 });
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
    .where(`sign_id`, `==`, req.fbAuth.sign_id)
    .where(`scream_id`, `==`, req.params.scream_id)
    .limit(1);
  const screamDoc = db.doc(`/screams/${req.params.scream_id}`);

  try {
    const likeQry = await likeDoc.get();
    if (!likeQry.empty) throw { error: "already liked" };

    const screamQry = await screamDoc.get();
    if (!screamQry.exists) throw { error: "scream not found" };

    let newData;
    newData = screamQry.data();
    newData.scream_id = screamQry.id;
    db.collection("likes").add({
      scream_id: req.params.scream_id,
      sign_id: req.fbAuth.sign_id,
    });
    newData.like_cnt += 1;
    await screamDoc.update({ like_cnt: newData.like_cnt });

    return res.status(201).json({ newData: newData });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.unlikeScream = async (req, res) => {
  const likeDoc = db
    .collection(`likes`)
    .where(`sign_id`, `==`, req.fbAuth.sign_id)
    .where(`scream_id`, `==`, req.params.scream_id)
    .limit(1);
  const screamDoc = db.doc(`/screams/${req.params.scream_id}`);

  try {
    const likeQry = await likeDoc.get();
    if (likeQry.empty) throw { error: "not liked yet" };

    const screamQry = await screamDoc.get();
    if (!screamQry.exists) throw { error: "scream not found" };

    await db.doc(`/likes/${likeQry.docs[0].id}`).delete();
    await screamDoc.update({ like_cnt: screamQry.data().like_cnt - 1 });

    return res.status(201).json({ unliked: likeQry.docs[0].data() });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.deleteScream = async (req, res) => {
  const screamDoc = db.doc(`/screams/${req.params.scream_id}`);

  try {
    const screamQry = await screamDoc.get();
    if (!screamQry.exists) throw { error: "scream not found" };
    if (screamQry.data().sign_id !== req.fbAuth.sign_id)
      throw { error: "sign_id not match" };

    await screamDoc.delete();

    return res.status(200).json({ result: screamQry });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};
