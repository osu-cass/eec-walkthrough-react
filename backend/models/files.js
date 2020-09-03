// File: files.js
// Description: Provides functions for working with file data.

const {pool} = require("../services/database/mysqlPool");


// upload a new file
async function uploadFile(files) {

  try {

    const finalResults = {
      url: "/"
    };

    return finalResults;

  } catch (err) {
    console.error("Error uploading file");
    throw Error(err);
  }

}
exports.uploadFile = uploadFile;