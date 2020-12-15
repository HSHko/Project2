const { db, admin } = require("../util/admin");

// 정렬 참고
// https://firebase.google.com/docs/firestore/query-data/order-limit-data?hl=ko

exports.getPosts = async (req, res) => {
  const reqData = {
    page: parseInt(req.params.page),
  };

  let resData = [];

  try {
    const latestPostQry = await db
      .collection(`posts`)
      .orderBy("created_at", "desc")
      .limit(1)
      .get();
    if (latestPostQry.empty) throw { errors: "no post found" };

    const max = latestPostQry.docs[0].data().idx;
    let hi = max - (reqData.page - 1) * 10;
    let lo = hi - 9;
    if (lo < 1) lo = 1;
    if (hi < 1)
      throw { errors: "invalid page (page exceeded number of valid posts)" };

    const postsQry = await db
      .collection(`posts`)
      .where(`idx`, `<=`, hi)
      .where(`idx`, `>=`, lo)
      .limit(10)
      .get();

    for (const doc of postsQry.docs) {
      if (!doc.exists) continue;
      const usersQry = await db.collection(`users`).doc(doc.data().donor).get();

      if (doc.data().status === "disabled") {
        resData.push({
          idx: doc.data().idx,
          category: "",
          title: "このポストはは削除されました",
          created_at: "",
          donor: "",
          view_cnt: doc.data().view_cnt,
          like_cnt: doc.data().like_cnt,
          comment_cnt: doc.data().comment_cnt,
        });
      } else
        resData.push({
          idx: doc.data().idx,
          category: doc.data().category,
          title: doc.data().title,
          created_at: doc.data().created_at,
          donor: usersQry.data().sign_id,
          view_cnt: doc.data().view_cnt,
          like_cnt: doc.data().like_cnt,
          comment_cnt: doc.data().comment_cnt,
        });
    }

    resData.reverse();

    res.status(200).json(resData);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.getPost = async (req, res) => {
  const reqData = {
    idx: parseInt(req.params.idx),
  };
  let resData = {};

  try {
    const postQry = await db
      .collection(`posts`)
      .where(`idx`, `==`, reqData.idx)
      .limit(1)
      .get();

    if (postQry.empty) throw { errors: "doc not found" };
    if (postQry.docs[0].data.status === "disabled")
      throw { errors: "disabled doc" };

    resData = {
      ...postQry.docs[0].data(),
    };

    res.status(200).json(resData);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.addPost = async (req, res) => {
  const reqData = {
    category: req.body.category,
    title: req.body.title,
    body: req.body.body,
    donor: req.fbAuth.uid,
  };

  console.log({ req: req.body });
  console.log({ reqData: reqData });

  try {
    if (reqData.title.length > 40) throw { title: "exceeded limit length" };
    if (reqData.body.length > 2000) throw { body: "exceeded limit length" };

    let idx = 1;
    const postsQry = await db
      .collection("posts")
      .orderBy("created_at", "desc")
      .limit(1)
      .get();

    if (!postsQry.empty) idx = postsQry.docs[0].data().idx + 1;

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

// exports.getPosts = async (req, res) => {
//   let resData = [];

//   try {
//     const postsQry = await db
//       .collection(`posts`)
//       .orderBy("created_at", "desc")
//       .limit(10)
//       .get();

//     if (postsQry.empty) throw { error: "no post found" };

//     for (const doc of postsQry.docs) {
//       if (!doc.exists) continue;
//       let donor = "disabled user";

//       const usersQry = await db.collection(`users`).doc(doc.data().donor).get();
//       if (usersQry.exists) donor = usersQry.data().sign_id;

//       resData.push({
//         idx: doc.data().idx,
//         status: doc.data().status,
//         category: doc.data().category,
//         title: doc.data().title,
//         // body
//         created_at: doc.data().created_at,
//         donor: donor,
//         view_cnt: doc.data().view_cnt,
//         like_cnt: doc.data().like_cnt,
//         comment_cnt: doc.data().comment_cnt,
//       });
//     }

//     res.status(200).json(resData);
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json(err);
//   }
// };
