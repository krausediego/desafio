import admin from "firebase-admin";
import fs from "node:fs";
import path from "node:path";

const serviceAccount = JSON.parse(
  fs.readFileSync(path.resolve("firebase-config.json"), "utf-8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const database = admin.firestore();

export { database };
