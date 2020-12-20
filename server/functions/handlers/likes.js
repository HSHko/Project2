const { db, admin } = require("../util/admin");
const { FieldValue } = require("firebase-admin").firestore;

exports.addLikeToPost = async (req, res) => {
  const reqData = {
    // fbAuth
    postIdx: parseInt(req.params.postIdx),
    likeQuantity: parseInt(req.query.like) >= 0 ? 1 : -1,
  };
  let resData = {
    ok: `like to post: ${reqData.postIdx} amount: ${reqData.likeQuantity} done`,
  };

  try {
    const likeDoc = db.collection(`likes`).doc(req.fbAuth.uid);
    const likeQry = await likeDoc.get();

    let selfLikeCnt = 0;
    if (!likeQry.data()[reqData.postIdx])
      await likeDoc.set({ [reqData.postIdx]: 0 });
    else selfLikeCnt = likeQry.data()[reqData.postIdx];

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

    console.log({ selfLikeCnt: selfLikeCnt, correctionValue: correctionValue });

    await likeDoc.update({
      [reqData.postIdx]: FieldValue.increment(correctionValue.quantity),
    });

    await db
      .collection(`posts`)
      .doc(postQry.docs[0].id)
      .update({
        like_cnt: FieldValue.increment(correctionValue.like),
        dislike_cnt: FieldValue.increment(correctionValue.dislike),
      });

    return res.status(201).json(resData);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};
