const functions = require("firebase-functions");
const { region } = require("../util/config");
const { db, admin } = require("../util/admin");

exports.createNotifOnLike = functions
  .region(region)
  .firestore.document("likes/{id}")
  .onCreate(async (snapshot) => {
    const screamDoc = db.doc(`/screams/${snapshot.data().scream_id}`);

    try {
      const screamQry = await screamDoc.get();
      if (!screamQry.exists) throw { error: "scream not found" };
      if (screamQry.data().sign_id !== snapshot.data().sign_id)
        throw { error: "sign_id not match" };

      console.log({ checkpoint: "0" });
      const newData = {
        scream_id: screamQry.id,
        recipient: screamQry.data().sign_id,
        doner: snapshot.data().sign_id,
        type: "like",
        read: false,
        created_at: admin.firestore.Timestamp.now().toDate().toISOString(),
      };
      await db.doc(`notifications/${snapshot.id}`).set(newData);
    } catch (err) {
      console.error(err);
    }
  });

exports.deleteNotifOnUnlike = functions
  .region(region)
  .firestore.document("likes/{id}")
  .onDelete(async (snapshot) => {
    try {
      await db.doc(`notifications/${snapshot.id}`).delete();
    } catch (err) {
      console.error(err);
    }
  });

/*
exports.onUserImageChange = functions
  .region(region)
  .firestore.document(`/users/${userId}`)
  .onUpdate(async change => {
    console.log(change.before.data());
    console.log(change.after.data());
    let batch = db.batch();

    try {
      if (change.before.data().imgUrl !== change.after.data().imgUrl)
        throw { error: "imgUrl not changed" };

      const screamDoc = db.collection(`screams`).where(`sign_id`, `==`, change.before.data().sign_id);
      const screamQry = await screamDoc.get();
      screamQry.forEach(doc => {
        const scream = db.doc(`/screams/${doc.id}`);
        batch.update(scream, { userImg: change.after.data().imgUrl });
      });
      return batch.commit();
    } catch (err) {
      console.error(err);
    }
  });
*/
