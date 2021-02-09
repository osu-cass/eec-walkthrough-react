// File: info.js
// Description: Provides functions for working with info

const {pool} = require("../services/database/mysqlPool");
const {sanitizeRichText} = require("../services/format/sanitizeRichText");


// returns all info objects
async function getInfo() {

  try {

    const sql = "SELECT * FROM Info ORDER BY infoId";

    const results = await pool.query(sql, []);

    const finalResults = {
      info: results[0]
    };

    return finalResults;

  } catch (err) {
    console.error("Error getting info");
    throw Error(err);
  }

}
exports.getInfo = getInfo;


// update an info object
async function updateInfo(infoId, title, text, icon) {

  try {

    const sqlArray = [];

    // make sure that the info object exists
    let sql = "SELECT * " +
    "FROM Info " +
    "WHERE infoId = ?;";
    let results = await pool.query(sql, infoId);

    if (!results[0].length) {
      return {error: 1};
    }

    // update the info object
    sql = "UPDATE Info " +
    "SET title = ?, text = ?, icon = ? " +
    "WHERE infoId = ?;";
    sqlArray.push(title);
    sqlArray.push(sanitizeRichText(text));
    sqlArray.push(icon);
    sqlArray.push(infoId);

    // perform the update query
    results = await pool.query(sql, sqlArray);

    const finalResults = {
      infoId: infoId
    };

    return finalResults;

  } catch (err) {
    console.error("Error updating info object");
    throw Error(err);
  }

}
exports.updateInfo = updateInfo;