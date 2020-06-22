// File: pages.js
// Description: Provides functions for working with page data.

const {pool} = require("../services/database/mysqlPool");


// return information about the specific page
async function getPage(pageId, viewAll) {

  try {

    let sql = "";

    // get the specified page
    if (viewAll) {
      sql = "SELECT * " +
      "FROM Pages " +
      "WHERE pageId = ?;";
    } else {
      sql = "SELECT * " +
      "FROM Pages " +
      "WHERE pageId = ? " +
      "AND approved = 1;";
    }

    let results = await pool.query(sql, pageId);

    // check to see if we were able to find the page
    if (!results[0].length) {
      return {pageId: 0};
    }

    const finalResults = results[0][0];
    const pageType = results[0][0].pageType;

    // get all of the subjects/industries that are related to the page
    if (pageType) {
      if (viewAll) {
        sql = "SELECT S.pageId, S.name " +
        "FROM Pages AS S " +
        "LEFT JOIN Industries_Subjects AS M " +
        "ON S.pageId = M.subjectId " +
        "WHERE M.industryId = ? " +
        "AND S.pageType = 0 " +
        "ORDER BY S.name ASC;";
      } else {
        sql = "SELECT S.pageId, S.name " +
        "FROM Pages AS S " +
        "LEFT JOIN Industries_Subjects AS M " +
        "ON S.pageId = M.subjectId " +
        "WHERE M.industryId = ? " +
        "AND S.pageType = 0 " +
        "AND S.approved = 1 " +
        "ORDER BY S.name ASC;";
      }
      results = await pool.query(sql, pageId);
      finalResults.relatedPages = results[0];
    } else {
      if (viewAll) {
        sql = "SELECT I.pageId, I.name " +
        "FROM Pages AS I " +
        "LEFT JOIN Industries_Subjects AS M " +
        "ON I.pageId = M.industryId " +
        "WHERE M.subjectId = ? " +
        "AND I.pageType = 1 " +
        "ORDER BY I.name ASC;";
      } else {
        sql = "SELECT I.pageId, I.name " +
        "FROM Pages AS I " +
        "LEFT JOIN Industries_Subjects AS M " +
        "ON I.pageId = M.industryId " +
        "WHERE M.subjectId = ? " +
        "AND I.pageType = 1 " +
        "AND approved = 1 " +
        "ORDER BY I.name ASC;";
      }
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
async function getPages(viewAll) {

  try {

    let sql = "";
    const finalResults = {
      pages: {}
    };

    // get subject pages
    if (viewAll) {
      sql = "SELECT pageId, pageType, name " +
      "FROM Pages " +
      "WHERE pageType = 0 " +
      "ORDER BY pageType ASC, name ASC;";
    } else {
      sql = "SELECT pageId, pageType, name " +
      "FROM Pages " +
      "WHERE pageType = 0 " +
      "AND approved = 1 " +
      "ORDER BY pageType ASC, name ASC;";
    }

    let results = await pool.query(sql, []);

    finalResults.pages.subjects = results[0];
    let pageCount = finalResults.pages.subjects.length;

    // get all of the related industries
    for (let i = 0; i < pageCount; i++) {

      let sql = "";
      if (viewAll) {
        sql = "SELECT I.pageId, I.name " +
        "FROM Pages AS I " +
        "LEFT JOIN Industries_Subjects AS M " +
        "ON I.pageId = M.industryId " +
        "WHERE M.subjectId = ? " +
        "AND I.pageType = 1 " +
        "ORDER BY I.name ASC;";
      } else {
        sql = "SELECT I.pageId, I.name " +
        "FROM Pages AS I " +
        "LEFT JOIN Industries_Subjects AS M " +
        "ON I.pageId = M.industryId " +
        "WHERE M.subjectId = ? " +
        "AND I.pageType = 1 " +
        "AND I.approved = 1 " +
        "ORDER BY I.name ASC;";
      }


      results = await pool.query(sql, finalResults.pages.subjects[i].pageId);
      finalResults.pages.subjects[i].relatedPages = results[0];

    }

    // get all industry pages
    if (viewAll) {
      sql = "SELECT pageId, pageType, name " +
      "FROM Pages " +
      "WHERE pageType = 1 " +
      "ORDER BY pageType ASC, name ASC;";
    } else {
      sql = "SELECT pageId, pageType, name " +
      "FROM Pages " +
      "WHERE pageType = 1 " +
      "AND approved = 1 " +
      "ORDER BY pageType ASC, name ASC;";
    }

    results = await pool.query(sql, []);

    finalResults.pages.industries = results[0];
    pageCount = finalResults.pages.industries.length;

    // get all of the related subjects
    for (let i = 0; i < pageCount; i++) {

      let sql = "";
      if (viewAll) {
        sql = "SELECT S.pageId, S.name " +
        "FROM Pages AS S " +
        "LEFT JOIN Industries_Subjects AS M " +
        "ON S.pageId = M.subjectId " +
        "WHERE M.industryId = ? " +
        "AND S.pageType = 0 " +
        "ORDER BY S.name ASC;";
      } else {
        sql = "SELECT S.pageId, S.name " +
        "FROM Pages AS S " +
        "LEFT JOIN Industries_Subjects AS M " +
        "ON S.pageId = M.subjectId " +
        "WHERE M.industryId = ? " +
        "AND S.pageType = 0 " +
        "AND S.approved = 1 " +
        "ORDER BY S.name ASC;";
      }
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
async function getFullPage(pageId, viewAll) {

  try {

    let sql = "";

    // get the specified page
    if (viewAll) {
      sql = "SELECT * " +
      "FROM Pages " +
      "LEFT JOIN Temp_Pages " +
      "ON pageId = tempPageId " +
      "WHERE pageId = ?;";
    } else {
      sql = "SELECT * " +
      "FROM Pages " +
      "WHERE pageId = ? " +
      "AND approved = 1;";
    }

    let results = await pool.query(sql, pageId);
    const finalResults = results[0][0];

    // check to see if we were able to find the page
    if (!results[0].length) {
      return {pageId: 0};
    }

    // get all of the headers for the page
    if (viewAll) {
      sql = "SELECT * " +
      "FROM Headers " +
      "LEFT JOIN Temp_Headers " +
      "ON headerId = tempHeaderId " +
      "WHERE pageId = ? " +
      "ORDER BY orderIndex ASC, headerId ASC;";
    } else {
      sql = "SELECT * " +
      "FROM Headers " +
      "WHERE pageId = ? " +
      "AND approved = 1 " +
      "ORDER BY orderIndex ASC, headerId ASC;";
    }

    results = await pool.query(sql, pageId);
    finalResults.headers = results[0];
    const headerCount = finalResults.headers.length;


    // get all of the cards for each header
    for (let i = 0; i < headerCount; i++) {
      const headerId = finalResults.headers[i].headerId;

      if (viewAll) {
        sql = "SELECT * " +
        "FROM Cards " +
        "LEFT JOIN Temp_Cards " +
        "ON cardId = tempCardId " +
        "WHERE headerId = ? " +
        "ORDER BY orderIndex ASC, cardId ASC";
      } else {
        sql = "SELECT * " +
        "FROM Cards " +
        "WHERE headerId = ? " +
        "AND approved = 1 " +
        "ORDER BY orderIndex ASC, cardId ASC";
      }

      results = await pool.query(sql, headerId);
      finalResults.headers[i].cards = results[0];
      const cardCount = finalResults.headers[i].cards.length;

      // get all of the items for each card
      for (let j = 0; j < cardCount; j++) {

        const cardId = finalResults.headers[i].cards[j].cardId;

        if (viewAll) {

          // get all approved items
          sql = "SELECT DISTINCT itemId, cardId, parentId, orderIndex, " +
          "Items.iconType, typeName, typeKeyword, contentText, " +
          "contentUrl, contentLabel, " +
          "created, approved " +
          "FROM Items " +
          "LEFT JOIN Icons on Items.iconType = Icons.iconType " +
          "WHERE cardId = ? " +
          "AND approved = 1 " +
          "ORDER BY orderIndex ASC, itemId ASC";

          results = await pool.query(sql, cardId);

          finalResults.headers[i].cards[j].items = results[0];

          // get all unapproved items
          sql = "SELECT DISTINCT itemId, cardId, parentId, orderIndex, " +
          "Items.iconType, typeName, typeKeyword, contentText, " +
          "contentUrl, contentLabel, " +
          "created, approved " +
          "FROM Items " +
          "LEFT JOIN Icons on Items.iconType = Icons.iconType " +
          "WHERE cardId = ? " +
          "AND approved = 0 " +
          "ORDER BY orderIndex ASC, itemId ASC";

          results = await pool.query(sql, cardId);

          finalResults.headers[i].cards[j].tempItems = results[0];

        } else {
          sql = "SELECT DISTINCT itemId, cardId, parentId, orderIndex, " +
          "Items.iconType, typeName, typeKeyword, contentText, " +
          "contentUrl, contentLabel, " +
          "created, approved " +
          "FROM Items " +
          "LEFT JOIN Icons on Items.iconType = Icons.iconType " +
          "WHERE cardId = ? " +
          "AND approved = 1 " +
          "ORDER BY orderIndex ASC, itemId ASC";

          results = await pool.query(sql, cardId);

          finalResults.headers[i].cards[j].items = results[0];
          finalResults.headers[i].cards[j].tempItems = [];

        }

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

    // make sure the page does not already exist
    let sql = "SELECT * " +
    "FROM Pages " +
    "WHERE pageType = ? " +
    "AND name = ?;";
    let results = await pool.query(sql, [pageType, name]);

    if (results[0].length) {
      return {error: 1};
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
    "AND name = ? " +
    "AND NOT pageId = ?;";
    results = await pool.query(sql, [pageType, name, pageId]);

    if (results[0].length) {
      return {error: 2};
    }

    // construct a sql query based on the fields given
    sql = "UPDATE Pages SET ";

    if (typeof pageType !== "undefined") {
      sql += "pageType = ?,";
      sqlArray.push(pageType);
    }

    if (typeof name !== "undefined") {
      sql += "name = ?,";
      sqlArray.push(name);
    }

    if (typeof title !== "undefined") {
      sql += "title = ?,";
      sqlArray.push(title);
    }

    if (typeof description !== "undefined") {
      sql += "description = ?,";
      sqlArray.push(description);
    }

    if (typeof imageUrl !== "undefined") {
      sql += "imageUrl = ?,";
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


// add a subject to an industry
async function addSubject(subjectId, industryId) {

  try {

    // make sure the subject exists
    let sql = "SELECT * " +
    "FROM Pages " +
    "WHERE pageId = ? " +
    "AND pageType = 0;";
    let results = await pool.query(sql, subjectId);

    if (!results[0].length) {
      return {error: 1};
    }

    // make sure the industry exists
    sql = "SELECT * " +
    "FROM Pages " +
    "WHERE pageId = ? " +
    "AND pageType = 1;";
    results = await pool.query(sql, industryId);

    if (!results[0].length) {
      return {error: 2};
    }

    // make sure the connection does not already exist
    sql = "SELECT * " +
    "FROM Industries_Subjects " +
    "WHERE subjectId = ? " +
    "AND industryId = ?;";
    results = await pool.query(sql, [subjectId, industryId]);

    if (results[0].length) {
      return {error: 3};
    }

    // create the new connection
    sql = "INSERT INTO Industries_Subjects (subjectId, industryId) " +
    "VALUES (?, ?);";
    results = await pool.query(sql, [subjectId, industryId]);

    const finalResults = {
      industryId: industryId,
      subjectId: subjectId
    };

    return finalResults;

  } catch (err) {
    console.error("Error creating connection");
    throw Error(err);
  }

}
exports.addSubject = addSubject;


// remove a subject from an industry
async function deleteSubject(subjectId, industryId) {

  try {

    // make sure the subject exists
    let sql = "SELECT * " +
    "FROM Pages " +
    "WHERE pageId = ? " +
    "AND pageType = 0;";
    let results = await pool.query(sql, subjectId);

    if (!results[0].length) {
      return {error: 1};
    }

    // make sure the industry exists
    sql = "SELECT * " +
    "FROM Pages " +
    "WHERE pageId = ? " +
    "AND pageType = 1;";
    results = await pool.query(sql, industryId);

    if (!results[0].length) {
      return {error: 2};
    }

    // make sure the connection exists
    sql = "SELECT * " +
    "FROM Industries_Subjects " +
    "WHERE subjectId = ? " +
    "AND industryId = ?;";
    results = await pool.query(sql, [subjectId, industryId]);

    if (!results[0].length) {
      return {error: 3};
    }

    // remove the connection
    sql = "DELETE " +
    "FROM Industries_Subjects " +
    "WHERE subjectId = ? " +
    "AND industryId = ?;";
    results = await pool.query(sql, [subjectId, industryId]);

    const finalResults = {
      affectedRows: results[0].affectedRows
    };

    return finalResults;

  } catch (err) {
    console.error("Error deleting connection");
    throw Error(err);
  }

}
exports.deleteSubject = deleteSubject;


// gets pages that match the search query
async function searchPages(text, cursor, viewAll) {
  try {

    const RESULTS_PER_PAGE = 25;
    const sqlArray = [];
    let pages;
    const nextCursor = {
      primary: "null",
      secondary: "null"
    };

    // initial sql query
    let sql =
      "SELECT * FROM Pages ";

    // only use the cursor if it isn't the initial search request
    if (cursor.primary === "null") {
      sql += "WHERE TRUE ";
    } else {

      // We set our primary cursor to the name as it is the value
      // that we are sorting by.
      //
      // Instances where the primary cursor value could have duplicate values
      // are handled by also sorting by page ID.

      sql += "WHERE name >= ? AND " +
        "(name > ? OR pageId >= ?) ";
      sqlArray.push(cursor.primary);
      sqlArray.push(cursor.primary);
      sqlArray.push(cursor.secondary);

    }

    // get the text we are searching for
    if (text !== "*") {
      sql += "AND name LIKE CONCAT('%', ?, '%') ";
      sqlArray.push(text);
    }

    // only show the user pages they are allowed to see
    if (!viewAll) {
      sql += "AND approved = 1 ";
    }

    // sort search results by name
    sql += "ORDER BY name ASC, " +
      "pageId ASC LIMIT ?;";

    // get the number of results per page (plus the next cursor)
    sqlArray.push(RESULTS_PER_PAGE + 1);

    // perform the query
    const results = await pool.query(sql, sqlArray);

    // get the next cursor and return the correct number of pages
    if (results[0].length < RESULTS_PER_PAGE + 1) {

      // if we have returned the last of the data then we return
      // a null next cursor
      pages = results[0];
      nextCursor.primary = "null";
      nextCursor.secondary = "null";

    } else {

      // Our next cursor will store a primary and secondary value.
      // The primary value is the main value we are sorting by.
      // The secondary value is the page ID and it is used to sort when we
      // have results with matching primary values.
      pages = results[0].slice(0, -1);
      const nextPlan = results[0][RESULTS_PER_PAGE];

      // set the primary and secondary strings
      nextCursor.primary = String(nextPlan.username);
      nextCursor.secondary = String(nextPlan.userId);

    }

    return {
      pages: pages,
      nextCursor: nextCursor
    };

  } catch (err) {
    console.error("Error searching for pages");
    throw Error(err);
  }
}
exports.searchPages = searchPages;