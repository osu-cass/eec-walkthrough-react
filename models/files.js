// File: files.js
// Description: Provides functions for working with files

const {pool} = require("../services/database/mysqlPool");
const path = require("path");
const fs = require("await-fs");

// return a list of the upload directories
async function getDirectories(sort, order, cursor) {

  try {

    const RESULTS_PER_PAGE = 25;
    const directoryArray = [];

    // joining path of directory
    let directoryPath;
    if (process.env.NODE_ENV === "production") {
      directoryPath = path.join(__dirname, `../client/files/uploads/`);
    } else {
      directoryPath = path.join(__dirname, `../client/public/uploads/`);
    }

    // passing directoryPath and callback function
    const files = await fs.readdir(directoryPath);

    // create a file object for each directory found
    files.forEach((file) => {

      // see if the file (directory) is named correctly with a
      // underscore dividing the name in two
      const splitName = file.split("_");
      if (splitName.length === 2) {
        const fileObject = {
          name: "",
          userId: parseInt(splitName[1], 10),
          fileCount: 0
        };

        directoryArray.push(fileObject);
      }
    });

    // find the username for each directory
    for (let i = 0; i < directoryArray.length; i++) {

      // get the username
      const sql = "SELECT username " +
      "FROM Users " +
      "WHERE userId = ?;";
      const results = await pool.query(sql, directoryArray[i].userId);

      // if we found a match then we know this is used on the site
      if (results[0].length) {
        directoryArray[i].name = results[0][0].username;
      }

      // see how many files are in the directory
      const directoryFiles = await fs.readdir(`${directoryPath}user_${directoryArray[i].userId}`);
      directoryArray[i].fileCount = directoryFiles.length;
    }

    // sort the list of results
    // 0: username, 1: user ID, 2: number of files
    if (sort === 0) {
      if (order === 0) {
        directoryArray.sort((a, b) => (a.name > b.name) ? 1 : -1);
      } else {
        directoryArray.sort((a, b) => (a.name < b.name) ? 1 : -1);
      }
    } else if (sort === 1) {
      if (order === 0) {
        directoryArray.sort((a, b) => (parseInt(a.userId, 10) > parseInt(b.userId, 10)) ? 1 : -1);
      } else {
        directoryArray.sort((a, b) => (parseInt(a.userId, 10) < parseInt(b.userId, 10)) ? 1 : -1);
      }
    } else {
      if (order === 0) {
        directoryArray.sort((a, b) => (parseInt(a.fileCount, 10) > parseInt(b.fileCount, 10)) ? 1 : -1);
      } else {
        directoryArray.sort((a, b) => (parseInt(a.fileCount, 10) < parseInt(b.fileCount, 10)) ? 1 : -1);
      }
    }

    // select a max of 25 directories based on our cursor
    let nextCursor = "null";
    if (cursor === "null") {
      if (RESULTS_PER_PAGE < directoryArray.length) {
        nextCursor = directoryArray[RESULTS_PER_PAGE].userId;
        directoryArray.length = RESULTS_PER_PAGE;
      }
    } else {
      // the cursor is set, remove each element before the cursor
      for (let i = 0; i < directoryArray.length; i++) {
        if (directoryArray[i].userId === cursor) {
          directoryArray.splice(0, i);
          break;
        }
      }

      // make sure we are still meeting the 25 limit
      if (RESULTS_PER_PAGE < directoryArray.length) {
        nextCursor = directoryArray[RESULTS_PER_PAGE].userId;
        directoryArray.length = RESULTS_PER_PAGE;
      }
    }

    const finalResults = {
      directories: directoryArray,
      nextCursor: nextCursor
    };

    return finalResults;

  } catch (err) {
    console.error("Error searching for directories");
    throw Error(err);
  }

}
exports.getDirectories = getDirectories;


// return a list of the files owned by a user
async function getFiles(userId, sort, order, cursor) {

  try {

    const RESULTS_PER_PAGE = 25;
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
    files.forEach((file) => {
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
      "WHERE contentUrl LIKE CONCAT('%', ?, '%');";
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
        continue;
      }

      // check pages
      sql = "SELECT imageUrl " +
      "FROM Pages " +
      "WHERE imageUrl LIKE CONCAT('%', ?, '%');";
      results = await pool.query(sql, fileUrl);

      if (results[0].length) {
        filesArray[i].used = "Yes";
        continue;
      }

      // check sponsors
      sql = "SELECT imageUrl " +
      "FROM Sponsors " +
      "WHERE imageUrl LIKE CONCAT('%', ?, '%');";
      results = await pool.query(sql, fileUrl);

      if (results[0].length) {
        filesArray[i].used = "Yes";
        continue;
      }

      // check contributors
      sql = "SELECT imageUrl " +
      "FROM Contributors " +
      "WHERE imageUrl LIKE CONCAT('%', ?, '%');";
      results = await pool.query(sql, fileUrl);

      if (results[0].length) {
        filesArray[i].used = "Yes";
        continue;
      }

      // check banners
      sql = "SELECT imageUrl " +
      "FROM Banners " +
      "WHERE imageUrl LIKE CONCAT('%', ?, '%');";
      results = await pool.query(sql, fileUrl);

      if (results[0].length) {
        filesArray[i].used = "Yes";
        continue;
      }

    }

    // sort the list of results
    // 0: file name, 1: source, 2: used on website
    if (sort === 0) {
      if (order === 0) {
        filesArray.sort((a, b) => (a.name > b.name) ? 1 : -1);
      } else {
        filesArray.sort((a, b) => (a.name < b.name) ? 1 : -1);
      }
    } else if (sort === 1) {
      if (order === 0) {
        filesArray.sort((a, b) => (a.source > b.source) ? 1 : -1);
      } else {
        filesArray.sort((a, b) => (a.source < b.source) ? 1 : -1);
      }
    } else {
      if (order === 0) {
        filesArray.sort((a, b) => (a.used > b.used) ? 1 : -1);
      } else {
        filesArray.sort((a, b) => (a.used < b.used) ? 1 : -1);
      }
    }

    // select a max of 25 images based on our cursor
    let nextCursor = "null";
    if (cursor === "null") {
      if (RESULTS_PER_PAGE < filesArray.length) {
        nextCursor = filesArray[RESULTS_PER_PAGE].name;
        filesArray.length = RESULTS_PER_PAGE;
      }
    } else {
      // the cursor is set, remove each element before the cursor
      for (let i = 0; i < filesArray.length; i++) {
        if (filesArray[i].name === cursor) {
          filesArray.splice(0, i);
          break;
        }
      }

      // make sure we are still meeting the 25 limit
      if (RESULTS_PER_PAGE < filesArray.length) {
        nextCursor = filesArray[RESULTS_PER_PAGE].name;
        filesArray.length = RESULTS_PER_PAGE;
      }
    }

    const finalResults = {
      files: filesArray,
      nextCursor: nextCursor
    };

    return finalResults;

  } catch (err) {
    console.error("Error searching for files");
    throw Error(err);
  }

}
exports.getFiles = getFiles;