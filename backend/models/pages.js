// File: pages.js
// Description: Provides functions for working with page data.

const {pool} = require('../services/database/mysqlPool');


// return information about the specific page
async function getPage(pageId) {

  try {

    // get the specified page
    let sql = "SELECT * " +
      "FROM Pages " +
      "WHERE pageId = ?;";

    let results = await pool.query(sql, pageId);

    // check to see if we were able to find the page
    if (!results[0].length) {
      return {pageId: 0};
    }

    const finalResults = results[0][0];
    const pageType = results[0][0].pageType;

    // get all of the subjects/industries that are related to the page
    if (pageType) {
      let sql = "SELECT S.pageId AS subjectId, S.name AS subjectName " +
      "FROM Pages AS S " +
      "LEFT JOIN Industries_Subjects AS M " +
      "ON S.pageId = M.subjectId " +
      "WHERE M.industryId = ? " +
      "AND S.pageType = 0 " +
      "ORDER BY S.name ASC;";
      results = await pool.query(sql, pageId);
      finalResults.subjects = results[0];
    } else {
      let sql = "SELECT I.pageId AS industryId, I.name AS industryName " +
      "FROM Pages AS I " +
      "LEFT JOIN Industries_Subjects AS M " +
      "ON I.pageId = M.industryId " +
      "WHERE M.subjectId = ? " +
      "AND I.pageType = 1 " +
      "ORDER BY I.name ASC;";
      results = await pool.query(sql, pageId);
      finalResults.industries = results[0];
    }

    return finalResults;

  } catch (err) {
    console.error("Error searching for page");
    throw Error(err);
  }

}
exports.getPage = getPage;


// return a list of all of the industries and their related subjects
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

      results = await pool.query(sql, industryId);
      finalResults.industries[i].subjects = results[0];

    }

    return finalResults;

  } catch (err) {
    console.error("Error searching for industries");
    throw Error(err);
  }

}
exports.getIndustries = getIndustries;


// return all of the page info, headers, cards, and items for a single page
async function getFullPage(pageId) {

  try {

    // get the specified page
    let sql = "SELECT * " +
      "FROM Pages " +
      "WHERE pageId = ?;";

    let results = await pool.query(sql, pageId);
    let finalResults = results[0][0];

    // check to see if we were able to find the page
    if (!results[0].length) {
      return {pageId: 0};
    }

    // get all of the headers for the page
    sql = "SELECT * " +
    "FROM Headers " +
    "WHERE pageId = ? " +
    "ORDER BY headerId ASC";
  
    results = await pool.query(sql, pageId);
    finalResults.headers = results[0];
    const headerCount = finalResults.headers.length;

    // get all of the cards for each header
    for (let i = 0; i < headerCount; i++) {

      const headerId = finalResults.headers[i].headerId;
      
      let sql = "SELECT * " +
      "FROM Cards " +
      "WHERE headerId = ? " +
      "ORDER BY cardId ASC";

      results = await pool.query(sql, headerId);
      finalResults.headers[i].cards = results[0];
      const cardCount = finalResults.headers[i].cards.length;

      // get all of the items for each card
      for (let j = 0; j < cardCount; j++) {

        const cardId = finalResults.headers[i].cards[j].cardId;
      
        let sql = "SELECT * " +
        "FROM Items " +
        "WHERE cardId = ? " +
        "ORDER BY itemId ASC";
  
        results = await pool.query(sql, cardId);
        finalResults.headers[i].cards[j].items = results[0];

      }

    }

    return finalResults;

  } catch (err) {
    console.error("Error searching for page");
    throw Error(err);
  }

}
exports.getFullPage = getFullPage;