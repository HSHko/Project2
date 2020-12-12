const { db, admin } = require("../util/admin");

// 정렬 참고
// https://firebase.google.com/docs/firestore/query-data/order-limit-data?hl=ko

exports.getPosts = async (req, res) => {
  let resData = [];

  try {
    const postsQry = await db
      .collection(`posts`)
      .orderBy("created_at", "desc")
      .limit(10)
      .get();

    if (postsQry.empty) throw { error: "no post found" };

    for (const doc of postsQry.docs) {
      if (!doc.exists) continue;
      let donor = "!unknown";

      const usersQry = await db.collection(`users`).doc(doc.data().donor).get();
      donor = usersQry.data().sign_id;

      resData.push({
        idx: doc.data().idx,
        status: doc.data().status,
        category: doc.data().category,
        title: doc.data().title,
        // body
        created_at: doc.data().created_at,
        donor: donor,
        view_cnt: doc.data().view_cnt,
        like_cnt: doc.data().like_cnt,
        comment_cnt: doc.data().comment_cnt,
      });
    }

    res.status(200).json(resData);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.getPost = async (req, res) => {
  const reqData = {
    idx: parseInt(req.query.idx),
  };
  let resData = {};

  try {
    const postQry = await db
      .collection(`posts`)
      .where(`idx`, `==`, reqData.idx)
      .limit(1)
      .get();

    if (postQry.empty) throw { error: "doc not found" };

    resData = postQry.docs[0].data();

    res.status(200).json(resData);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.addPost = async (req, res) => {
  const reqData = {
    // idx
    category: req.body.category,
    title: req.body.title,
    body: req.body.body,
    donor: req.fbAuth.uid,
  };

  try {
    if (reqData.title.length > 40) throw { title: "exceeded limit length" };
    if (reqData.body.length > 2000) throw { body: "exceeded limit length" };

    let idx = 1;
    const postsQry = await db
      .collection("posts")
      .orderBy("created_at", "desc")
      .limit(1)
      .get();

    if (postsQry.docs[0] !== undefined) {
      idx = postsQry.docs[0].data().idx + 1;
    }

    const newData = {
      idx: idx,
      status: "",
      category: reqData.category,
      title: reqData.title,
      body: reqData.body,
      donor: reqData.donor,
      created_at: admin.firestore.Timestamp.now().toDate().toISOString(),
      view_cnt: 0,
      like_cnt: 0,
      comment_cnt: 0,
    };

    await db.collection("posts").add(newData);
    return res.status(201).json({ result: `page ${idx} added` });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};
