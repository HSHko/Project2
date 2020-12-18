const { db, admin } = require("../util/admin");

exports.getComments = async (req, res) => {
  const reqData = {
    idx: req.params.idx,
  };
  let resData = [];

  try {
    const commentsQry = db
      .collection("comments")
      .where(`recipient`, `==`, `reqData.idx`)
      .orderBy(`created_at`, desc)
      .limit(20) // TODO: comment pages
      .get();

    if (commentsQry.empty) throw { errors: "comment not found" };

    for (const doc of commentsQry.docs) {
      const userQry = await db
        .collection("users")
        .doc(`${doc.data().donor}`)
        .get();

      if (doc.data.status === "disabled") {
        resData.push({
          // recipient: "",
          donor: "",
          body: "このコメントは削除されました。",
          created_at: "",
          like_cnt: 0,
        });
      } else {
        resData.push({
          // recipient: "",
          donor: userQry.data().sign_id,
          body: doc.data().body,
          created_at: doc.data().created_at,
          like_cnt: doc.data().like_cnt,
        });
      }
    }

    return res.status(200).json(resData);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.addComment = async (req, res) => {
  const reqData = {
    donor: req.fbAuth.userQry.id,
    recipient: req.params.idx,
    body: req.body.body,
  };
  let newData = {};

  try {
    newData = {
      recipient: reqData.recipient,
      donor: reqData.donor,
      body: reqData.body,
      created_at: admin.firestore.Timestamp.now(),
      like_cnt: 0,
    };

    await db.collection("comments").add(newData);
    return res.status(200).json(resData);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};
