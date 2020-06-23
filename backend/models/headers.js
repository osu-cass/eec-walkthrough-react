// File: headers.js
// Description: Provides functions for working with header data.

const {pool} = require("../services/database/mysqlPool");


// return information about the specific header
async function getHeader(headerId, viewAll) {

  try {

    let sql = "";

    // get the specified header
    if (viewAll) {
      sql = "SELECT * " +
      "FROM Headers " +
      "WHERE headerId = ?;";
    } else {
      sql = "SELECT * " +
      "FROM Headers " +
      "WHERE headerId = ? " +
      "AND approved = 1;";
    }

    const finalResults = await pool.query(sql, headerId);

    // check to see if we were able to find the header
    if (!finalResults[0].length) {
      return {headerId: 0};
    }

    // get all of the icons used by the header
    if (viewAll) {
      sql = "SELECT DISTINCT Icons.iconType, Icons.typeName " +
      "FROM `Headers` " +
      "LEFT JOIN Cards on Cards.headerId = Headers.headerId " +
      "LEFT JOIN Items on Cards.cardId = Items.cardId " +
      "LEFT JOIN Icons on Items.iconType = Icons.iconType " +
      "WHERE Headers.headerId = ? AND Icons.iconType IS NOT NULL " +
      "ORDER BY iconType ASC;";
    } else {
      sql = "SELECT DISTINCT Icons.iconType, Icons.typeName " +
      "FROM `Headers` " +
      "LEFT JOIN " +
      "(SELECT * FROM Cards WHERE approved = 1) C " +
      "on C.headerId = Headers.headerId " +
      "LEFT JOIN " +
      "(SELECT * FROM Items WHERE approved = 1) I " +
      "on C.cardId = I.cardId " +
      "LEFT JOIN Icons on I.iconType = Icons.iconType " +
      "WHERE Headers.headerId = ? AND Icons.iconType IS NOT NULL " +
      "ORDER BY iconType ASC;";
    }

    const results = await pool.query(sql, headerId);

    finalResults[0][0].icons = results[0];

    return finalResults[0][0];

  } catch (err) {
    console.error("Error searching for header");
    throw Error(err);
  }

}
exports.getHeader = getHeader;


// create a header
async function createHeader(pageId, orderIndex, title, userId) {

  try {

    // make sure the header does not already exist
    let sql = "SELECT * " +
    "FROM Headers " +
    "WHERE pageId = ? " +
    "AND title = ?;";
    let results = await pool.query(sql, [pageId, title]);

    if (results[0].length) {
      return {error: 1};
    }

    // make sure the page exists
    sql = "SELECT * " +
    "FROM Pages " +
    "WHERE pageId = ?;";
    results = await pool.query(sql, pageId);

    if (!results[0].length) {
      return {error: 2};
    }

    // create the new header
    sql = "INSERT INTO Headers (pageId, orderIndex, title, userId, approved) " +
    "VALUES (?, ?, ?, ?, 0);";
    results = await pool.query(sql, [pageId, orderIndex, title, userId]);

    const finalResults = {
      insertId: results[0].insertId
    };

    return finalResults;

  } catch (err) {
    console.error("Error creating header");
    throw Error(err);
  }

}
exports.createHeader = createHeader;


// delete a header
async function deleteHeader(headerId) {

  try {

    // checks to see if there is an edited version of the header to delete
    let sql = "SELECT * " +
    "FROM Temp_Headers " +
    "WHERE tempHeaderId = ?;";

    let results = await pool.query(sql, headerId);

    // prioritize deleting the edited version
    // a second delete will remove the real one
    if (results[0].length) {
      sql = "DELETE " +
        "FROM Temp_Headers " +
        "WHERE tempHeaderId = ?;";

      results = await pool.query(sql, headerId);

      const finalResults = {
        affectedRows: results[0].affectedRows
      };

      return finalResults;
    }

    // check to see if the header exists
    sql = "SELECT * " +
    "FROM Headers " +
    "WHERE headerId = ?;";

    results = await pool.query(sql, headerId);

    if (!results[0].length) {
      return {error: 1};
    }

    // delete the header
    sql = "DELETE " +
      "FROM Headers " +
      "WHERE headerId = ?;";

    results = await pool.query(sql, headerId);

    const finalResults = {
      affectedRows: results[0].affectedRows
    };

    return finalResults;

  } catch (err) {
    console.error("Error deleting header");
    throw Error(err);
  }

}
exports.deleteHeader = deleteHeader;


// update a header
async function updateHeader(headerId, orderIndex, title, userId) {

  try {

    const sqlArray = [];

    // make sure that the header exists
    let sql = "SELECT * " +
    "FROM Headers " +
    "WHERE headerId = ?;";
    let results = await pool.query(sql, headerId);

    if (!results[0].length) {
      return {error: 1};
    }

    const approved = results[0][0].approved;

    // See if we already have an unpublished header.
    // Either create a new one or update the existing one.
    sql = "SELECT * " +
    "FROM Temp_Headers " +
    "WHERE tempHeaderId = ?;";
    results = await pool.query(sql, headerId);

    if (results[0].length) {

      sql = "UPDATE Temp_Headers " +
      "SET tempOrderIndex = ?, tempTitle = ?, tempUserId = ? " +
      "WHERE tempHeaderId = ?;";
      sqlArray.push(orderIndex);
      sqlArray.push(title);
      sqlArray.push(userId);
      sqlArray.push(headerId);

    } else if (approved === 0) {

      sql = "UPDATE Headers " +
      "SET orderIndex = ?, title = ?, userId = ? " +
      "WHERE headerId = ?;";
      sqlArray.push(orderIndex);
      sqlArray.push(title);
      sqlArray.push(userId);
      sqlArray.push(headerId);

    } else {

      sql = "INSERT INTO Temp_Headers (tempHeaderId, " +
      "tempOrderIndex, tempTitle, tempUserId) " +
      "VALUES (?, ?, ?, ?);";
      sqlArray.push(headerId);
      sqlArray.push(orderIndex);
      sqlArray.push(title);
      sqlArray.push(userId);

    }

    // perform the update query
    results = await pool.query(sql, sqlArray);

    const finalResults = {
      headerId: headerId
    };

    return finalResults;

  } catch (err) {
    console.error("Error updating header");
    throw Error(err);
  }

}
exports.updateHeader = updateHeader;


async function publishHeader(headerId) {

  try {

    // make sure that the header exists
    let sql = "SELECT * " +
    "FROM Headers " +
    "WHERE headerId = ?;";
    let results = await pool.query(sql, headerId);

    if (!results[0].length) {
      return {error: 1};
    }

    const title = results[0][0].title;
    const pageId = results[0][0].pageId;

    // make sure no other headers share the same name
    sql = "SELECT * " +
    "FROM Headers " +
    "WHERE pageId = ? " +
    "AND title = ? " +
    "AND headerId != ? " +
    "AND approved = 1;";
    results = await pool.query(sql, [pageId, title, headerId]);

    if (results[0].length) {
      return {error: 2};
    }

    // check if there is new header data
    sql = "SELECT * " +
    "FROM Temp_Headers " +
    "WHERE tempHeaderId = ?;";
    results = await pool.query(sql, headerId);

    const tempHeader = results[0][0];

    // if there is new header data, replace the old data
    // otherwise simply update the approved value
    if (tempHeader) {

      // update the published header
      sql = "UPDATE Headers " +
      "SET orderIndex = ?, title = ?, userId = ?, created = ?, approved = 1 " +
      "WHERE headerId = ?;";

      const tempArray = [tempHeader.tempOrderIndex, tempHeader.tempTitle,
        tempHeader.tempUserId, tempHeader.tempCreated, headerId];

      results = await pool.query(sql, tempArray);

      // delete the old temp header
      sql = "DELETE FROM Temp_Headers " +
      "WHERE tempHeaderId = ?;";
      results = await pool.query(sql, headerId);

    } else {
      sql = "UPDATE Headers " +
      "SET approved = 1 " +
      "WHERE headerId = ?;";
      results = await pool.query(sql, headerId);
    }

    const finalResults = {
      headerId: headerId
    };

    return finalResults;

  } catch (err) {
    console.error("Error publishing header");
    throw Error(err);
  }

}
exports.publishHeader = publishHeader;