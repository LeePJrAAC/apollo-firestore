const admin = require("firebase-admin");

const serviceAccount = require("../learning-58ecf-firebase-adminsdk-htmhl-f7f2f4c624.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = { admin, db };
