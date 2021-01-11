const { db, admin } = require("../util/admin");
const { FieldValue } = require("firebase-admin").firestore;

exports.addLikeToPost = async (req, res) => {
  const reqData = {
    // fbAuth
    idx: parseInt(req.params.idx, 10),
    cond: req.params.cond,
  };
  let resData = {};

  try {
    if (!["like", "dislike"].includes(reqData.cond))
      throw { errors: "invalid condition" };

    const likeDoc = db.collection(`likes`).doc(req.fbAuth.uid);
    let likeQry = await likeDoc.get();
    if (!likeQry.exists) {
      await db.collection(`likes`).doc(req.fbAuth.uid).set({});
      likeQry = await likeDoc.get();
    }

    const likeQuantity = likeQry.data()[reqData.idx] || 0;
    const postQry = await db
      .collection(`posts`)
      .where(`idx`, `==`, reqData.idx)
      .limit(1)
      .get();
    console.log({
      doc: postQry.docs[0].id,
    });
    const postDoc = db.collection(`posts`).doc(postQry.docs[0].id);

    switch (reqData.cond) {
      case "like":
        if (likeQuantity > 0) {
          throw { rebundancy: "alreay liked" };
        } else if (likeQuantity === 0) {
          await postDoc.update({
            like_cnt: FieldValue.increment(1),
            dislike_cnt: FieldValue.increment(0),
          });
        } else {
          await postDoc.update({
            like_cnt: FieldValue.increment(1),
            dislike_cnt: FieldValue.increment(-1),
          });
        }
        await likeDoc.update({
          [reqData.idx]: 1,
        });
        break;
      case "dislike":
        if (likeQuantity > 0) {
          await postDoc.update({
            like_cnt: FieldValue.increment(-1),
            dislike_cnt: FieldValue.increment(1),
          });
        } else if (likeQuantity === 0) {
          await postDoc.update({
            like_cnt: FieldValue.increment(0),
            dislike_cnt: FieldValue.increment(1),
          });
        } else {
          throw { rebundancy: "already disliked" };
        }
        await likeDoc.update({
          [reqData.idx]: -1,
        });
        break;
      default:
        throw { errors: "invalid condition" };
    }

    return res.status(201).json(resData);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.addfLikeToPost = async (req, res) => {
  const reqData = {
    // fbAuth
    postIdx: parseInt(req.params.postIdx, 10),
    likeQuantity: parseInt(req.query.like, 10) >= 0 ? 1 : -1,
  };
  let resData = {
    ok: `like to post: ${reqData.postIdx} amount: ${reqData.likeQuantity} done`,
  };

  try {
    const likeDoc = db.collection(`likes`).doc(req.fbAuth.uid);
    let likeQry = await likeDoc.get();
    if (!likeQry.exists) {
      await likeDoc.set({});
      likeQry = await likeDoc.get();
    }

    let selfLikeCnt = likeQry.data()[reqData.postIdx] || 0;

    if (reqData.likeQuantity > 0 && selfLikeCnt > 0)
      throw { already_liked: "already liked" };
    if (reqData.likeQuantity < 0 && selfLikeCnt < 0)
      throw { disliked: "already disliked" };

    const postQry = await db
      .collection(`posts`)
      .where(`idx`, `==`, reqData.postIdx)
      .limit(1)
      .get();

    if (postQry.empty) throw { page: "not found" };

    let correctionValue = {
      quantity: 0,
      like: 0,
      dislike: 0,
    };

    if (reqData.likeQuantity >= 0) {
      if (selfLikeCnt > 0) {
        // not reachable
      } else if (selfLikeCnt === 0) {
        correctionValue = {
          ...correctionValue,
          quantity: 1,
          like: 1,
        };
      } else {
        correctionValue = {
          ...correctionValue,
          quantity: 2,
          like: 1,
          dislike: -1,
        };
      }
    } else {
      if (selfLikeCnt > 0) {
        correctionValue = {
          ...correctionValue,
          quantity: -2,
          like: -1,
          dislike: 1,
        };
      } else if (selfLikeCnt === 0) {
        correctionValue = {
          ...correctionValue,
          quantity: -1,
          dislike: 1,
        };
      } else {
        // not reachable
      }
    }

    await likeDoc.update({
      [reqData.postIdx]: selfLikeCnt + correctionValue.quantity,
    });

    await db
      .collection(`posts`)
      .doc(postQry.docs[0].id)
      .update({
        like_cnt: FieldValue.increment(correctionValue.like),
        dislike_cnt: FieldValue.increment(correctionValue.dislike),
      });

    resData = {
      ...resData,
      selfLikeCnt: selfLikeCnt + correctionValue.quantity,
      like_cnt: postQry.docs[0].data().like_cnt + correctionValue.like,
      dislike_cnt: postQry.docs[0].data().dislike_cnt + correctionValue.dislike,
    };

    return res.status(201).json(resData);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.getSelfLikeQuantityFromPost = async (req, res) => {
  const reqData = {
    pageIdx: req.query.page,
  };
  const resData = 0;

  try {
    const likeQry = await db.collection(`likes`).doc(req.fbAuth.uid).get();
    if (!likeQry.exists) throw { likeDoc: "not found" };

    const likeQuantity = likeQry.data()[reqData.pageIdx] || 0;

    resData = likeQuantity;

    res.status(200).json(resData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};
