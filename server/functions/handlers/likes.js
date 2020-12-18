const { db, admin } = require("../util/admin");

exports.addLikeToPost = async (req, res) => {
  const reqData = {
    // fbAuth
    postIdx: req.params.postIdx,
    likeQuantity: parseInt(req.query.like),
  };
  let resData = {
    ok: `like to post: ${reqData.postIdx} amount: ${reqData.likeQuantity} done`,
  };

  try {
    const likeQry = await db.collection(`likes`).doc(req.fbAuth.uid).get();

    const likeCnt = likeQry.data()[resData.postIdx] || 0;
    if (reqData.likeQuantity > 0 && likeCnt > 0)
      throw { errors: "already liked" };
    if (reqData.likeQuantity < 0 && likeCnt < 0)
      throw { errors: "already disliked" };

    await db
      .collection(likes)
      .doc(req.fbAuth.uid)
      .update({
        [reqData.postIdx]: likeCnt + reqData.likeQuantity,
      });

    return res.status(201).json(resData);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};
