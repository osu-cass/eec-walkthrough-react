// File: headers.js
// Description: Provides functions for working with header data.

const {pool} = require("../services/database/mysqlPool");


// create a header
async function createHeader(pageId, title, userId, internal) {

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
    sql = "INSERT INTO Headers (pageId, title, userId, internal, orderIndex, approved) " +
    "VALUES (?, ?, ?, ?, 0, 0);";
    results = await pool.query(sql, [pageId, title, userId, internal]);
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

    // check to see if the header exists
    let sql = "SELECT * " +
    "FROM Headers " +
    "WHERE headerId = ?;";

    let results = await pool.query(sql, headerId);

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


// delete a header's changes
async function deleteHeaderChanges(headerId) {

  try {

    // checks to see if there is an edited version of the header to delete
    let sql = "SELECT * " +
    "FROM Temp_Headers " +
    "WHERE tempHeaderId = ?;";

    let results = await pool.query(sql, headerId);

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

    // check to see if the header is in the headers table but not yet published
    sql = "SELECT * " +
    "FROM Headers " +
    "WHERE headerId = ? " +
    "AND approved = 0;";

    results = await pool.query(sql, headerId);

    if (!results[0].length) {
      return {error: 1};
    }

    // delete the header
    sql = "DELETE " +
      "FROM Headers " +
      "WHERE headerId = ? " +
      "AND approved = 0;";

    results = await pool.query(sql, headerId);

    const finalResults = {
      affectedRows: results[0].affectedRows
    };

    return finalResults;

  } catch (err) {
    console.error("Error deleting header changes");
    throw Error(err);
  }

}
exports.deleteHeaderChanges = deleteHeaderChanges;


// update a header
async function updateHeader(headerId, title, userId, internal) {

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
    const orderIndex = results[0][0].orderIndex;

    // See if we already have an unpublished header.
    // Either create a new one or update the existing one.
    sql = "SELECT * " +
    "FROM Temp_Headers " +
    "WHERE tempHeaderId = ?;";
    results = await pool.query(sql, headerId);

    if (results[0].length) {

      sql = "UPDATE Temp_Headers " +
      "SET tempTitle = ?, tempUserId = ?, tempInternal = ? " +
      "WHERE tempHeaderId = ?;";
      sqlArray.push(title);
      sqlArray.push(userId);
      sqlArray.push(internal);
      sqlArray.push(headerId);

    } else if (approved === 0) {

      sql = "UPDATE Headers " +
      "SET title = ?, userId = ?, internal = ? " +
      "WHERE headerId = ?;";
      sqlArray.push(title);
      sqlArray.push(userId);
      sqlArray.push(internal);
      sqlArray.push(headerId);

    } else {

      sql = "INSERT INTO Temp_Headers (tempHeaderId, " +
      "tempTitle, tempUserId, tempInternal, tempOrderIndex) " +
      "VALUES (?, ?, ?, ?, ?);";
      sqlArray.push(headerId);
      sqlArray.push(title);
      sqlArray.push(userId);
      sqlArray.push(internal);
      sqlArray.push(orderIndex);

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
    const internal = results[0][0].internal;

    // save the published data to history
    sql = "INSERT INTO History_Headers (headerId, title, internal) " +
    "VALUES (?, ?, ?);";
    await pool.query(sql, [headerId, title, internal]);

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
      "SET title = ?, userId = ?, created = CURRENT_TIMESTAMP, internal = ?, orderIndex = ?, approved = 1 " +
      "WHERE headerId = ?;";

      const tempArray = [tempHeader.tempTitle,
        tempHeader.tempUserId, tempHeader.tempInternal, tempHeader.tempOrderIndex, headerId];

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
      "SET approved = 1, created = CURRENT_TIMESTAMP " +
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


// move a published header
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

    // get all of the headers and temp headers under the current header
    sql = "SELECT * " +
    "FROM Headers " +
    "LEFT JOIN Temp_Headers " +
    "ON headerId = tempHeaderId " +
    "WHERE pageId = ? " +
    "ORDER BY orderIndex ASC, headerId ASC";
    results = await pool.query(sql, pageId);

    // create an array with all of the headers
    // each header has an id, type (normal / temp), and an order index
    const headerOrderArray = [];
    for (let i = 0; i < results[0].length; i++) {
      if (results[0][i].tempHeaderId > 0) {

        const headerObj = {
          id: results[0][i].headerId,
          type: "norm",
          order: results[0][i].orderIndex,
          show: "show"
        };

        const tempHeaderObj = {
          id: results[0][i].tempHeaderId,
          type: "temp",
          order: results[0][i].tempOrderIndex,
          show: "hidden"
        };

        headerOrderArray.push(headerObj);
        headerOrderArray.push(tempHeaderObj);

      } else {
        const headerObj = {
          id: results[0][i].headerId,
          type: "norm",
          order: results[0][i].orderIndex,
          show: "show"
        };
        headerOrderArray.push(headerObj);
      }
    }

    // sort the array of headers by order index
    headerOrderArray.sort((a, b) => a.order - b.order);

    // find and move the specified header
    for (let i = 0; i < headerOrderArray.length; i++) {
      if (parseInt(headerOrderArray[i].id, 10) === parseInt(headerId, 10) && headerOrderArray[i].type === "norm") {
        if (direction) {
          // try to move up and skip hidden headers
          for (let j = i; j > 0; j--) {
            const tempObj = headerOrderArray[j - 1];
            headerOrderArray[j - 1] = headerOrderArray[j];
            headerOrderArray[j] = tempObj;
            if (headerOrderArray[j].show !== "hidden") {
              break;
            }
          }
          break;
        } else {
          // try to move down and skip hidden headers
          for (let j = i; j < headerOrderArray.length - 1; j++) {
            const tempObj = headerOrderArray[j + 1];
            headerOrderArray[j + 1] = headerOrderArray[j];
            headerOrderArray[j] = tempObj;
            if (headerOrderArray[j].show !== "hidden") {
              break;
            }
          }
          break;
        }
      }
    }

    // apply new order values to the headers and split it into normal and temp headers
    const normArray = [];
    const tempArray = [];
    for (let i = 0; i < headerOrderArray.length; i++) {
      if (headerOrderArray[i].type === "temp") {
        tempArray.push(parseInt(headerOrderArray[i].id, 10));
        tempArray.push(i + 1);
      } else {
        normArray.push(parseInt(headerOrderArray[i].id, 10));
        normArray.push(i + 1);
      }
    }

    // push the ids to the end once more to match with the future query
    for (let i = 0; i < headerOrderArray.length; i++) {
      if (headerOrderArray[i].type === "temp") {
        tempArray.push(headerOrderArray[i].id);
      } else {
        normArray.push(headerOrderArray[i].id);
      }
    }

    // update the published headers
    if (normArray.length) {
      sql = "UPDATE Headers " +
      "SET orderIndex = CASE ";
      for (let i = 0; i < normArray.length / 3; i++) {
        sql += "WHEN headerId = ? THEN ? ";
      }
      sql += "ELSE 0 END WHERE headerId IN (";
      for (let i = 0; i < normArray.length / 3; i++) {
        sql += "?,";
      }
      sql = sql.replace(/.$/, ");");
      results = await pool.query(sql, normArray);
    }

    // update the unpublished headers
    if (tempArray.length) {
      sql = "UPDATE Temp_Headers " +
      "SET tempOrderIndex = CASE ";
      for (let i = 0; i < tempArray.length / 3; i++) {
        sql += "WHEN tempHeaderId = ? THEN ? ";
      }
      sql += "ELSE 0 END WHERE tempHeaderId IN (";
      for (let i = 0; i < tempArray.length / 3; i++) {
        sql += "?,";
      }
      sql = sql.replace(/.$/, ");");
      results = await pool.query(sql, tempArray);
    }

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


// move an unpublished header
async function moveTempHeader(headerId, direction) {

  try {

    // make sure that the header exists
    let sql = "SELECT * " +
    "FROM Headers " +
    "WHERE headerId = ? ";
    let results = await pool.query(sql, headerId);

    if (!results[0].length) {
      return {error: 1};
    }

    const pageId = results[0][0].pageId;

    let headerType = "norm";

    // see if this header is already approved
    if (results[0][0].approved) {

      // since it is approved, get the temp header version of the header
      const sql = "SELECT * " +
      "FROM Temp_Headers " +
      "WHERE tempHeaderId = ? ";
      results = await pool.query(sql, headerId);
      headerType = "temp";

      if (!results[0].length) {
        return {error: 1};
      }

    }

    // get all of the headers and temp headers under the current header
    sql = "SELECT * " +
    "FROM Headers " +
    "LEFT JOIN Temp_Headers " +
    "ON headerId = tempHeaderId " +
    "WHERE pageId = ? " +
    "ORDER BY orderIndex ASC, headerId ASC";
    results = await pool.query(sql, pageId);

    // create an array with all of the headers
    // each header has an id, type (normal / temp), and an order index
    const headerOrderArray = [];
    for (let i = 0; i < results[0].length; i++) {
      if (results[0][i].tempHeaderId > 0) {

        const headerObj = {
          id: results[0][i].headerId,
          type: "norm",
          order: results[0][i].orderIndex,
          show: "hidden"
        };

        const tempHeaderObj = {
          id: results[0][i].tempHeaderId,
          type: "temp",
          order: results[0][i].tempOrderIndex,
          show: "show"
        };

        headerOrderArray.push(headerObj);
        headerOrderArray.push(tempHeaderObj);

      } else {
        const headerObj = {
          id: results[0][i].headerId,
          type: "norm",
          order: results[0][i].orderIndex,
          show: "show"
        };
        headerOrderArray.push(headerObj);
      }
    }

    // sort the array of headers by order index
    headerOrderArray.sort((a, b) => a.order - b.order);

    // find and move the specified header
    for (let i = 0; i < headerOrderArray.length; i++) {
      if (parseInt(headerOrderArray[i].id, 10) === parseInt(headerId, 10) && headerOrderArray[i].type === headerType) {
        if (direction) {
          // try to move up and skip hidden headers
          for (let j = i; j > 0; j--) {
            const tempObj = headerOrderArray[j - 1];
            headerOrderArray[j - 1] = headerOrderArray[j];
            headerOrderArray[j] = tempObj;
            if (headerOrderArray[j].show !== "hidden") {
              break;
            }
          }
          break;
        } else {
          // try to move down and skip hidden headers
          for (let j = i; j < headerOrderArray.length - 1; j++) {
            const tempObj = headerOrderArray[j + 1];
            headerOrderArray[j + 1] = headerOrderArray[j];
            headerOrderArray[j] = tempObj;
            if (headerOrderArray[j].show !== "hidden") {
              break;
            }
          }
          break;
        }
      }
    }

    // apply new order values to the headers and split it into normal and temp headers
    const normArray = [];
    const tempArray = [];
    for (let i = 0; i < headerOrderArray.length; i++) {
      if (headerOrderArray[i].type === "temp") {
        tempArray.push(parseInt(headerOrderArray[i].id, 10));
        tempArray.push(i + 1);
      } else {
        normArray.push(parseInt(headerOrderArray[i].id, 10));
        normArray.push(i + 1);
      }
    }

    // push the ids to the end once more to match with the future query
    for (let i = 0; i < headerOrderArray.length; i++) {
      if (headerOrderArray[i].type === "temp") {
        tempArray.push(headerOrderArray[i].id);
      } else {
        normArray.push(headerOrderArray[i].id);
      }
    }

    // update the published headers
    if (normArray.length) {
      sql = "UPDATE Headers " +
      "SET orderIndex = CASE ";
      for (let i = 0; i < normArray.length / 3; i++) {
        sql += "WHEN headerId = ? THEN ? ";
      }
      sql += "ELSE 0 END WHERE headerId IN (";
      for (let i = 0; i < normArray.length / 3; i++) {
        sql += "?,";
      }
      sql = sql.replace(/.$/, ");");
      results = await pool.query(sql, normArray);
    }

    // update the unpublished headers
    if (tempArray.length) {
      sql = "UPDATE Temp_Headers " +
      "SET tempOrderIndex = CASE ";
      for (let i = 0; i < tempArray.length / 3; i++) {
        sql += "WHEN tempHeaderId = ? THEN ? ";
      }
      sql += "ELSE 0 END WHERE tempHeaderId IN (";
      for (let i = 0; i < tempArray.length / 3; i++) {
        sql += "?,";
      }
      sql = sql.replace(/.$/, ");");
      results = await pool.query(sql, tempArray);
    }

    const finalResults = {
      headerId: headerId
    };

    return finalResults;

  } catch (err) {
    console.error("Error moving header");
    throw Error(err);
  }

}
exports.moveTempHeader = moveTempHeader;