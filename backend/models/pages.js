// File: pages.js
// Description: Provides functions for working with page data.

const {pool} = require('../services/database/mysqlPool');

// Return a list of all of the industries and their related subjects
async function getIndustries() {

  try {

    // get all of the industries in the database
    let sql = "SELECT pageId AS industryId, name AS industryName " +
      "FROM Pages " +
      "WHERE pageType = 1;";

    let results = await pool.query(sql, []);
    
    let finalResults = {
      industries: results[0]
    }
    const industryCount = finalResults.industries.length;

    // get all of the subjects per industry
    for (let i = 0; i < industryCount; i++) {

      const industryId = finalResults.industries[i].industryId;
      
      let sql = "SELECT S.pageId AS subjectId, S.name AS subjectName " +
      "FROM Pages AS S " +
      "LEFT JOIN Industries_Subjects AS M " +
      "ON S.pageId = M.subjectId " +
      "WHERE M.industryId = ? " +
      "AND S.pageType = 0 " +
      "ORDER BY S.name ASC;";

      let results = await pool.query(sql, industryId);
      finalResults.industries[i].subjects = results[0];

    }

    return finalResults;

  } catch (err) {
    console.log("Error searching for industries");
    throw Error(err);
  }

}
exports.getIndustries = getIndustries;