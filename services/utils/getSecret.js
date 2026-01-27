// File: getSecret.js
// Description: provides functions that get user secrets

const fs = require("fs");

function getSecret(envVar) {
  const fileEnvVar = envVar + "_FILE";
  const filePath = process.env[fileEnvVar];

  // Verify the file exists, then read it
  if (filePath && fs.existsSync(filePath)) {
    return fs.readFileSync(filePath, "utf8").trim();
  }

  return process.env[envVar];
}

module.exports = getSecret;