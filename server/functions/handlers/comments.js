const { db, admin } = require("../util/admin");

exports.getComments = async (req, res) => {
  const reqData = {
    idx: req.body.idx,
  };

  let resData = {};

  try {
    return res.status(200).json(resData);
  } catch (err) {
    console.error(err);
    return res.json(500).json(err);
  }
};

exports.addComment = async (req, res) => {
  const reqData = {
    donor: req.body.donor,
    recipient: req.body.recipient,
    body: req.body.body,
  };

  let newData = {
    ...reqData,
    created_at: admin.firestore.Timestamp.now().toDate().toISOString(),
    like_cnt: 0,
  };

  try {
    await db.collection("comments").add(newData);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};
