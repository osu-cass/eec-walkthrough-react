// File: files.js
// Description: Provides functions for working with files

const {pool} = require("../services/database/mysqlPool");
const path = require("path");
const fs = require("await-fs");

// return a list of the files owned by a user
async function getFiles(userId) {

  try {
    const filesArray = [];

    // joining path of directory
    let directoryPath;
    if (process.env.NODE_ENV === "production") {
      directoryPath = path.join(__dirname, `../client/files/uploads/user_${userId}/`);
    } else {
      directoryPath = path.join(__dirname, `../client/public/uploads/user_${userId}/`);
    }

    // passing directoryPath and callback function
    const files = await fs.readdir(directoryPath);

    // create a file object for each file found
    files.forEach(function (file) {
      const fileObject = {
        url: `/uploads/user_${userId}/${file}`,
        name: file,
        userId: userId,
        source: "",
        used: "No"
      };
      filesArray.push(fileObject);
    });

    // find each instance of each file being used on the website
    for (let i = 0; i < filesArray.length; i++) {

      const fileUrl = `/uploads/user_${userId}/${filesArray[i].name}`;

      // check items
      let sql = "SELECT contentUrl, sourceId " +
      "FROM Items " +
      "WHERE contentUrl LIKE CONCAT('%', ?, '%');"
      let results = await pool.query(sql, fileUrl);

      // if we found a match then we know this is used on the site
      if (results[0].length) {
        filesArray[i].used = "Yes";

        // see if we can find a valid source for the image
        for (let j = 0; j < results[0].length; j++) {
          if (results[0][j].sourceId) {
            const sql = "SELECT text " +
            "FROM Sources " +
            "WHERE sourceId = ?;";
            const sourceResults = await pool.query(sql, results[0][j].sourceId);

            if (sourceResults[0].length) {
              filesArray[i].source = sourceResults[0][0].text;
            }

            break;

          }
        }
      }

      // check pages
      sql = "SELECT imageUrl " +
      "FROM Pages " +
      "WHERE imageUrl LIKE CONCAT('%', ?, '%');"
      results = await pool.query(sql, fileUrl);

      if (results[0].length) {
        filesArray[i].used = "Yes";
      }

      // check sponsors
      sql = "SELECT imageUrl " +
      "FROM Sponsors " +
      "WHERE imageUrl LIKE CONCAT('%', ?, '%');"
      results = await pool.query(sql, fileUrl);

      if (results[0].length) {
        filesArray[i].used = "Yes";
      }

    }

    const finalResults = {
      files: filesArray
    };

    return finalResults;

  } catch (err) {
    console.error("Error searching for files");
    throw Error(err);
  }

}
exports.getFiles = getFiles;