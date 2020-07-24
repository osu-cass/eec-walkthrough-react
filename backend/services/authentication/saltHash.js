// File: saltHash.js
// Description: provides functions that deal with creating and verifying passwords

const crypto = require("crypto");

// create password hash
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 2048, 32, "sha512").toString("hex");
  return [salt, hash].join("$");
}
exports.hashPassword = hashPassword;

// check the password hash
function verifyHash(password, original) {

  if (typeof password !== "string" || typeof original !== "string") {
    return false;
  }

  const originalHash = original.split("$")[1];
  const salt = original.split("$")[0];
  const hash = crypto.pbkdf2Sync(password, salt, 2048, 32, "sha512").toString("hex");

  return hash === originalHash;
}
exports.verifyHash = verifyHash;