import Dexie from "dexie";

export const db = new Dexie("UserLists");
db.version(1).stores({
  users: "originalId, originalId, email", // Primary key and indexed props
});

db.version(1).stores({
  emails: "originalId, originalId", // Primary key and indexed props
});
