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
async function createHeader(pageId, title, userId) {

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
    sql = "INSERT INTO Headers (pageId, title, userId, orderIndex, approved) " +
    "VALUES (?, ?, ?, 0, 0);";
    results = await pool.query(sql, [pageId, title, userId]);
    const headerId = results[0].insertId;

    // update the order index of the new header
    sql = "UPDATE Headers " +
    "SET orderIndex = ? " +
    "WHERE headerId = ?;";
    sql = await pool.query(sql, [headerId, headerId]);

    const finalResults = {
      insertId: headerId
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
async function updateHeader(headerId, title, userId) {

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
      "SET tempTitle = ?, tempUserId = ? " +
      "WHERE tempHeaderId = ?;";
      sqlArray.push(title);
      sqlArray.push(userId);
      sqlArray.push(headerId);

    } else if (approved === 0) {

      sql = "UPDATE Headers " +
      "SET title = ?, userId = ? " +
      "WHERE headerId = ?;";
      sqlArray.push(title);
      sqlArray.push(userId);
      sqlArray.push(headerId);

    } else {

      sql = "INSERT INTO Temp_Headers (tempHeaderId, " +
      "tempTitle, tempUserId) " +
      "VALUES (?, ?, ?);";
      sqlArray.push(headerId);
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
      "SET title = ?, userId = ?, created = ?, approved = 1 " +
      "WHERE headerId = ?;";

      const tempArray = [tempHeader.tempTitle,
        tempHeader.tempUserId, tempHeader.tempCreated, headerId];

      // make sure no other headers share the same title
      const checkSql = "SELECT * " +
      "FROM Headers " +
      "WHERE pageId = ? " +
      "AND title = ? " +
      "AND headerId != ? " +
      "AND approved = 1;";
      results = await pool.query(checkSql, [pageId, tempHeader.tempTitle, headerId]);

      if (results[0].length) {
        return {error: 2};
      }

      // publish
      results = await pool.query(sql, tempArray);

      // delete the old temp header
      sql = "DELETE FROM Temp_Headers " +
      "WHERE tempHeaderId = ?;";
      results = await pool.query(sql, headerId);

    } else {

      sql = "UPDATE Headers " +
      "SET approved = 1 " +
      "WHERE headerId = ?;";

      // make sure no other headers share the same title
      const checkSql = "SELECT * " +
      "FROM Headers " +
      "WHERE pageId = ? " +
      "AND title = ? " +
      "AND headerId != ? " +
      "AND approved = 1;";
      results = await pool.query(checkSql, [pageId, title, headerId]);

      if (results[0].length) {
        return {error: 2};
      }

      // publish
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


async function unpublishHeader(headerId) {

  try {

    // make sure that the header exists
    let sql = "SELECT * " +
    "FROM Headers " +
    "WHERE headerId = ?;";
    let results = await pool.query(sql, headerId);

    if (!results[0].length) {
      return {error: 1};
    }

    // set the header to unpublished
    sql = "UPDATE Headers " +
    "SET approved = 0 " +
    "WHERE headerId = ?;";
    results = await pool.query(sql, headerId);

    // delete any old temp headers
    sql = "DELETE FROM Temp_Headers " +
    "WHERE tempHeaderId = ?;";
    results = await pool.query(sql, headerId);

    const finalResults = {
      headerId: headerId
    };

    return finalResults;

  } catch (err) {
    console.error("Error unpublishing header");
    throw Error(err);
  }

}
exports.unpublishHeader = unpublishHeader;


// move a header
async function moveHeader(headerId, direction) {

  try {

    // make sure that the header exists
    let sql = "SELECT * " +
    "FROM Headers " +
    "WHERE headerId = ? " +
    "AND approved = true";
    let results = await pool.query(sql, headerId);

    if (!results[0].length) {
      return {error: 1};
    }

    const pageId = results[0][0].pageId;

    // get all of the header under the current page
    sql = "SELECT * " +
    "FROM Headers " +
    "WHERE pageId = ? " +
    "AND approved = true " +
    "ORDER BY orderIndex ASC, headerId ASC";
    results = await pool.query(sql, pageId);

    const headers = results[0];
    let headerIndex = -1;
    let otherHeaderIndex = -1;

    // find the index of this header
    for (let i = 0; i < headers.length; i++) {
      if (headers[i].headerId === parseInt(headerId, 10)) {
        headerIndex = i;
        break;
      }
    }

    // if we cannot find the index, then we can't find the header
    if (headerIndex === -1) {
      return {error: 1};
    }

    // check if we are trying to move up or down and make sure header exists
    // in the specific direction
    if (direction) {
      if (headerIndex !== 0) {
        otherHeaderIndex = headerIndex - 1;
      }
    } else {
      if (headerIndex + 1 < headers.length) {
        otherHeaderIndex = headerIndex + 1;
      }
    }

    // if we cannot find the other index, then we can't find the other header
    if (otherHeaderIndex === -1) {
      return {error: 2};
    }

    // swap the headers order indexes
    sql = "UPDATE Headers " +
    "SET orderIndex = IF(headerId=?, ?, ?) " +
    "WHERE headerId IN (?, ?);";
    const sqlArray = [];
    sqlArray.push(headerId);
    sqlArray.push(headers[otherHeaderIndex].orderIndex);
    sqlArray.push(headers[headerIndex].orderIndex);
    sqlArray.push(headerId);
    sqlArray.push(headers[otherHeaderIndex].headerId);
    results = await pool.query(sql, sqlArray);

    const finalResults = {
      headerId: headerId
    };

    return finalResults;

  } catch (err) {
    console.error("Error moving header");
    throw Error(err);
  }

}
exports.moveHeader = moveHeader;