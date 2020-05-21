// File: pages.js
// Description: Provides functions for working with page data.

const {pool} = require("../services/database/mysqlPool");


// return information about the specific page
async function getPage(pageId) {

  try {

    // get the specified page
    const sql = "SELECT * " +
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
      const sql = "SELECT S.pageId, S.name " +
      "FROM Pages AS S " +
      "LEFT JOIN Industries_Subjects AS M " +
      "ON S.pageId = M.subjectId " +
      "WHERE M.industryId = ? " +
      "AND S.pageType = 0 " +
      "ORDER BY S.name ASC;";
      results = await pool.query(sql, pageId);
      finalResults.relatedPages = results[0];
    } else {
      const sql = "SELECT I.pageId, I.name " +
      "FROM Pages AS I " +
      "LEFT JOIN Industries_Subjects AS M " +
      "ON I.pageId = M.industryId " +
      "WHERE M.subjectId = ? " +
      "AND I.pageType = 1 " +
      "ORDER BY I.name ASC;";
      results = await pool.query(sql, pageId);
      finalResults.relatedPages = results[0];
    }

    return finalResults;

  } catch (err) {
    console.error("Error searching for page");
    throw Error(err);
  }

}
exports.getPage = getPage;


// return a list of all of the pages and their related subjects/industries
async function getPages() {

  try {

    const finalResults = {
      pages: {}
    };

    // get all subject pages
    let sql = "SELECT pageId, pageType, name " +
      "FROM Pages " +
      "WHERE pageType = 0 " +
      "ORDER BY pageType ASC, name ASC;";

    let results = await pool.query(sql, []);

    finalResults.pages.subjects = results[0];
    let pageCount = finalResults.pages.subjects.length;

    // get all of the related industries
    for (let i = 0; i < pageCount; i++) {

      const sql = "SELECT I.pageId, I.name " +
      "FROM Pages AS I " +
      "LEFT JOIN Industries_Subjects AS M " +
      "ON I.pageId = M.industryId " +
      "WHERE M.subjectId = ? " +
      "AND I.pageType = 1 " +
      "ORDER BY I.name ASC;";
      results = await pool.query(sql, finalResults.pages.subjects[i].pageId);
      finalResults.pages.subjects[i].relatedPages = results[0];

    }

    // get all industry pages
    sql = "SELECT pageId, pageType, name " +
      "FROM Pages " +
      "WHERE pageType = 1 " +
      "ORDER BY pageType ASC, name ASC;";

    results = await pool.query(sql, []);

    finalResults.pages.industries = results[0];
    pageCount = finalResults.pages.industries.length;

    // get all of the related subjects
    for (let i = 0; i < pageCount; i++) {

      const sql = "SELECT S.pageId, S.name " +
      "FROM Pages AS S " +
      "LEFT JOIN Industries_Subjects AS M " +
      "ON S.pageId = M.subjectId " +
      "WHERE M.industryId = ? " +
      "AND S.pageType = 0 " +
      "ORDER BY S.name ASC;";
      results = await pool.query(sql, finalResults.pages.industries[i].pageId);
      finalResults.pages.industries[i].relatedPages = results[0];

    }

    return finalResults;

  } catch (err) {
    console.error("Error searching for pages");
    throw Error(err);
  }

}
exports.getPages = getPages;


// return all of the page info, headers, cards, and items for a single page
async function getFullPage(pageId) {

  try {

    // get the specified page
    let sql = "SELECT * " +
      "FROM Pages " +
      "WHERE pageId = ?;";

    let results = await pool.query(sql, pageId);
    const finalResults = results[0][0];

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

      const sql = "SELECT * " +
      "FROM Cards " +
      "WHERE headerId = ? " +
      "ORDER BY cardId ASC";

      results = await pool.query(sql, headerId);
      finalResults.headers[i].cards = results[0];
      const cardCount = finalResults.headers[i].cards.length;

      // get all of the items for each card
      for (let j = 0; j < cardCount; j++) {

        const cardId = finalResults.headers[i].cards[j].cardId;

        const sql = "SELECT * " +
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


// create a page
async function createPage(pageType, name, title, description, imageUrl, userId) {

  try {

    // make sure the user exists
    let sql = "SELECT * " +
    "FROM Users " +
    "WHERE userId = ?;";
    let results = await pool.query(sql, userId);

    if (!results[0].length) {
      return {error: 1};
    }

    // make sure the page does not already exist
    sql = "SELECT * " +
    "FROM Pages " +
    "WHERE pageType = ? " +
    "AND name = ?;";
    results = await pool.query(sql, [pageType, name]);

    if (results[0].length) {
      return {error: 2};
    }

    // create the new page
    sql = "INSERT INTO Pages (pageType, name, title, description, imageUrl, userId, approved) " +
    "VALUES (?, ?, ?, ?, ?, ?, 0);";
    results = await pool.query(sql, [pageType, name, title, description, imageUrl, userId]);

    const finalResults = {
      insertId: results[0].insertId
    };

    return finalResults;

  } catch (err) {
    console.error("Error creating page");
    throw Error(err);
  }

}
exports.createPage = createPage;


// delete a page
async function deletePage(pageId) {

  try {

    // check to see if the page exists
    let sql = "SELECT * " +
      "FROM Pages " +
      "WHERE pageId = ?;";

    let results = await pool.query(sql, pageId);

    if (!results[0].length) {
      return {error: 1};
    }

    // delete the page
    sql = "DELETE " +
      "FROM Pages " +
      "WHERE pageId = ?;";

    results = await pool.query(sql, pageId);

    const finalResults = {
      affectedRows: results[0].affectedRows
    };

    return finalResults;

  } catch (err) {
    console.error("Error deleting page");
    throw Error(err);
  }

}
exports.deletePage = deletePage;


// update a page
async function updatePage(pageId, pageType, name, title, description, imageUrl, approved) {

  try {

    const sqlArray = [];

    // make sure that the page exists
    let sql = "SELECT * " +
    "FROM Pages " +
    "WHERE pageId = ?;";
    let results = await pool.query(sql, pageId);

    if (!results[0].length) {
      return {error: 1};
    }

    // make sure that the page name and type combination doesn't already exist
    sql = "SELECT * " +
    "FROM Pages " +
    "WHERE pageType = ? " +
    "AND name = ?;";
    results = await pool.query(sql, [pageType, name]);

    if (results[0].length) {
      return {error: 2};
    }

    // construct a sql query based on the fields given
    sql = "UPDATE Pages SET ";

    if (typeof pageType !== "undefined") {
      sql += "pageType = ?, ";
      sqlArray.push(pageType);
    }

    if (typeof name !== "undefined") {
      sql += "name = ?, ";
      sqlArray.push(name);
    }

    if (typeof title !== "undefined") {
      sql += "title = ?, ";
      sqlArray.push(title);
    }

    if (typeof description !== "undefined") {
      sql += "description = ?, ";
      sqlArray.push(description);
    }

    if (typeof imageUrl !== "undefined") {
      sql += "imageUrl = ?, ";
      sqlArray.push(imageUrl);
    }

    if (typeof approved !== "undefined") {
      sql += "approved = ?,";
      sqlArray.push(approved);
    }

    // add the last line of the SQL query
    sql = sql.replace(/.$/, " WHERE pageId = ?;");
    sqlArray.push(pageId);

    // make sure that we are updating at least one field
    if (sqlArray.length <= 1) {
      return {error: 3};
    }

    // perform the update query
    results = await pool.query(sql, sqlArray);

    const finalResults = {
      changedRows: results[0].changedRows
    };

    return finalResults;

  } catch (err) {
    console.error("Error updating page");
    throw Error(err);
  }

}
exports.updatePage = updatePage;
