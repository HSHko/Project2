const { db, admin } = require("../util/admin");
const { FieldValue } = require("firebase-admin").firestore;
const { splitTimeStamp } = require("../util/converters");

exports.getCommentsFromPost = async (req, res) => {
  const reqData = {
    postIdx: parseInt(req.params.idx),
  };
  let resData = [];

  try {
    const commentsQry = await db
      .collection(`comments`)
      .doc(`${reqData.postIdx}`)
      .collection(`comments`)
      .get();
    if (commentsQry.empty) throw { comments: "empty" };

    for (const doc of commentsQry.docs) {
      let pushData = {};

      const userQry = await db
        .collection(`users`)
        .doc(`${doc.data().donor}`)
        .get();
      if (!userQry.exists) continue;

      const createdAt = splitTimeStamp(doc.data().created_at);

      pushData = {
        status: doc.data().status,
        donor: userQry.data().sign_id, // length test => donor: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        body: doc.data().body,
        created_at: `${createdAt.month}.${createdAt.day} ${createdAt.hours}`,
      };

      if (doc.data().status === `disabled`) {
        pushData = {
          ...pushData,
          donor: `deleted`,
          body: `deleted`,
        };
      }

      resData.push(pushData);
      // console.log({ check: `pushData: ${pushData.donor}` });
    }

    return res.status(200).json(resData);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.addCommentToPost = async (req, res) => {
  const reqData = {
    donor: req.fbAuth.uid,
    postIdx: parseInt(req.params.idx),
    body: req.body.body,
  };
  let resData = {
    result: `comment added to post idx: ${reqData.postIdx}`,
  };
  let newData = {};

  try {
    if (reqData.body.length < 4)
      throw { body_length: `comment length must be longer than 4 characters` };

    const postQry = await db
      .collection(`posts`)
      .where(`idx`, `==`, reqData.postIdx)
      .limit(1)
      .get();
    if (postQry.empty) throw { post: "not exist" };
    console.log({
      check: `postQry.docs[0].data().idx: ${postQry.docs[0].data().idx}`,
    });

    const commentsQry = await db
      .collection(`comments`)
      .doc(`${postQry.docs[0].data().idx}`)
      .collection(`comments`)
      .get();
    let commentIdx = 1;
    let postedCommentsQry = null;
    if (!commentsQry.empty) {
      console.log({ check: `commentsQry exists` });
      postedCommentsQry = await db
        .collection(`comments`)
        .doc(`${postQry.docs[0].data().idx}`)
        .collection(`comments`)
        .orderBy(`created_at`, `desc`)
        .limit(1)
        .get();
      commentIdx = postedCommentsQry.docs[0].data().idx + 1;
    }

    newData = {
      idx: commentIdx,
      status: "",
      donor: reqData.donor,
      body: reqData.body,
      created_at: admin.firestore.Timestamp.now(),
      like_cnt: 0,
      dislike_cnt: 0,
    };

    await db
      .collection(`comments`)
      .doc(`${reqData.postIdx}`)
      .collection(`comments`)
      .doc(`${commentIdx}`)
      .set(newData);

    await db
      .collection(`posts`)
      .doc(`${postQry.docs[0].id}`)
      .update({
        comment_cnt: FieldValue.increment(1),
      });

    return res.status(201).json(resData);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};
