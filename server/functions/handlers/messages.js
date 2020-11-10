const { db, admin } = require("../util/admin");

exports.getAllMessages = async (req, res) => {
  try {
    const snap = await db.collection("messages").orderBy("createdAt", "desc").get();
    let data = [];

    snap.forEach(doc =>
      data.push({
        id: doc.id,
        title: doc.data().title,
        createdAt: doc.data().createdAt,
      }),
    );
    console.log({ data: data });
    console.log({ snap: snap });
    res.json(data);
  } catch (e) {
    console.error(e.message);
  }
};

exports.addMessages = async (req, res) => {
  const newData = {
    title: req.body.title,
    userHandle: req.user.handle,
    createdAt: admin.firestore.Timestamp.now().toDate().toISOString(),
  };

  try {
    const snap = await db.collection("messages").add(newData);
    const result = `Message with ID: ${snap.id} added.`;
    res.json({ result: result });
  } catch (e) {
    console.error(e.message);
    return res.status(500).json({ error: `something went wrong.` });
  }
};
