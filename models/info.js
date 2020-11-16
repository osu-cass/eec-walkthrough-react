// File: info.js
// Description: Provides functions for working with info

const {pool} = require("../services/database/mysqlPool");


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