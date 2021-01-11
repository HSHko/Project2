const { db, admin } = require("../util/admin");
const { FieldValue } = require("firebase-admin").firestore;
const { splitTimeStamp } = require("../util/converters");
const firebase = require("firebase");

// 정렬 참고
// https://firebase.google.com/docs/firestore/query-data/order-limit-data?hl=ko

exports.getPostsFromList = async (req, res) => {
  const reqData = {
    page: parseInt(req.params.page, 10),
    postNumPerPage: 10,
  };
  let resData = {
    postsData: [],
    pageData: {
      latestPostIdx: 0,
    },
  };

  try {
    // 表示版の見せるページの数を次のようにします
    // first post = {(latest post idx) - (target page - 1)*(postNum per page)} から
    // last post = (first post) - (postNum per page + 1)まで
    if (reqData.page < 1) throw { errors: "invalid page" };

    const latestPostQry = await db
      .collection(`posts`)
      .orderBy("idx", "desc")
      .limit(1)
      .get();
    if (latestPostQry.empty) throw { errors: "no post found" };

    const targetPage = reqData.page;
    const postNumPerPage = reqData.postNumPerPage;
    const latestPostIdx = latestPostQry.docs[0].data().idx;
    let lastPostIdx = latestPostIdx - (targetPage - 1) * postNumPerPage;
    let firstPostIdx = Math.max(1, latestPostIdx - postNumPerPage + 1);
    if (lastPostIdx < firstPostIdx) lastPostIdx = firstPostIdx;

    const postsListQry = await db
      .collection(`posts`)
      .where(`idx`, `<=`, lastPostIdx)
      .where(`idx`, `>=`, firstPostIdx)
      .limit(postNumPerPage)
      .get();

    for (const doc of postsListQry.docs) {
      if (!doc.exists) continue;
      const donorQry = await db.collection(`users`).doc(doc.data().donor).get();
      if (!donorQry.exists) continue;

      let createdAt = splitTimeStamp(doc.data().created_at);
      const currentTime = splitTimeStamp(admin.firestore.Timestamp.now());
      if (currentTime.day !== createdAt.day) {
        createdAt = `${createdAt.month}.${createdAt.day}`;
      } else {
        createdAt = `${createdAt.hour}:${createdAt.min}`;
      }

      let newData = {
        idx: doc.data().idx,
        status: doc.data().idx,
        category: doc.data().category,
        title: doc.data().title,
        created_at: createdAt,
        donor: donorQry.data().sign_id,
        view_cnt: doc.data().view_cnt,
        like_quantity: doc.data().like_cnt - doc.data().dislike_cnt,
        comment_cnt: doc.data().comment_cnt,
      };

      resData.postsData.push(newData);
    }
    resData.postsData.reverse();
    resData.pageData.latestPostIdx = lastPostIdx;

    return res.status(200).json(resData);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.createPost = async (req, res) => {
  const categories = ["一般", "情報", "その他"];
  const reqData = {
    donor: req.fbAuth.uid,
    category: req.body.category,
    title: req.body.title,
    body: req.body.body,
  };

  try {
    if (reqData.title.length < 2 || reqData.title.length > 40)
      throw { title: "length limitation error" };
    if (reqData.body.length < 2 || reqData.body.length > 2000)
      throw { body: "length limitation error" };
    if (!categories.includes(reqData.category))
      throw { category: "invalid category" };

    let idx = 1;
    const latestPostQry = await db
      .collection("posts")
      .orderBy("idx", "desc")
      .limit(1)
      .get();
    if (!latestPostQry.empty) idx = latestPostQry.docs[0].data().idx + 1;

    const newData = {
      idx: idx,
      status: "",
      donor: reqData.donor,
      category: reqData.category,
      title: reqData.title,
      body: reqData.body,
      created_at: admin.firestore.Timestamp.now(),
      updated_at: "",
      view_cnt: 0,
      like_cnt: 0,
      dislike_cnt: 0,
      comment_cnt: 0,
    };

    await db.collection("posts").add(newData);
    return res.status(201).json({ result: `page ${idx} added` });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.getPost = async (req, res) => {
  const reqData = {
    idx: parseInt(req.params.idx, 10),
  };
  let resData = {
    postData: {},
    commentsData: {},
  };

  try {
    const postsQry = await db
      .collection(`posts`)
      .where(`idx`, `==`, reqData.idx)
      .limit(1)
      .get();
    if (postsQry.empty) throw { errors: "doc not found" };
    if (postsQry.docs[0].data().status === "disabled")
      throw { disabled: "disabled doc" };

    const userQry = await db
      .collection(`users`)
      .doc(postsQry.docs[0].data().donor)
      .get();
    if (!userQry.exists) throw { errors: "user not found" };

    let createdAt = splitTimeStamp(postsQry.docs[0].data().created_at);
    createdAt = `${createdAt.days} ${createdAt.hours}`;

    resData.postData = {
      ...postsQry.docs[0].data(),
      // idx
      // status
      // view_cnt
      // like_cnt
      // dislike_cnt
      donor: userQry.data().sign_id,
      like_quantity:
        postsQry.docs[0].data().like_cnt - postsQry.docs[0].data().dislike_cnt,
      created_at: createdAt,
      updated_at: postsQry.docs[0].data().updated_at || undefined,
    };

    await db
      .collection(`posts`)
      .doc(postsQry.docs[0].id)
      .update({
        view_cnt: FieldValue.increment(1),
      });

    return res.status(200).json(resData);
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

  try {
    if (reqData.title.length > 40) throw { title: "exceeded limit length" };
    if (reqData.title.length < 2)
      throw { title: "title must be at least 4 characters long" };
    if (reqData.body.length > 2000) throw { body: "exceeded limit length" };
    if (reqData.body.length < 2)
      throw { body: "body must be at least 2 characters long" };

    let idx = 1;
    const postsQry = await db
      .collection("posts")
      .orderBy("idx", "desc")
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
      created_at: admin.firestore.Timestamp.now(),
      updated_at: "",
      view_cnt: 0,
      like_cnt: 0,
      dislike_cnt: 0,
      comment_cnt: 0,
    };

    await db.collection("posts").add(newData);
    return res.status(201).json({ result: `page ${idx} added` });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.disablePost = async (req, res) => {
  const reqData = {
    // fbAuth, fbAuth.userData
    postIdx: parseInt(req.params.postidx, 10),
  };
  let resData = {
    ok: `disabled post idx: ${reqData.postIdx}`,
  };

  try {
    const postsQry = db
      .collection(`posts`)
      .where(`idx`, `==`, reqData.postIdx)
      .limit(1)
      .get();
    if (postsQry.empty) throw { post: `not found` };

    if (postsQry.docs[0].data().donor !== req.fbAuth.uid)
      throw {
        authority: `requested user ${req.fbAuth.uid} and donor ${
          postsQry.docs[0].data().donor
        } not match`,
      };

    await db
      .collection(`posts`)
      .doc(postsQry.docs[0].id)
      .update({ status: `disabled` });

    return res.status(201).json(err);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};
