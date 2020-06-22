// File: items.js
// Description: Provides functions for working with user data.

const {pool} = require("../services/database/mysqlPool");


// return information about the specific item
async function getItem(itemId, viewAll) {

  try {

    let sql = "";

    // get the specified item
    if (viewAll) {
      sql = "SELECT DISTINCT itemId, cardId, parentId, orderIndex, " +
      "Items.iconType, typeName, typeKeyword, contentText, " +
      "contentUrl, contentLabel " +
      "FROM Items " +
      "LEFT JOIN Icons on Items.iconType = Icons.iconType " +
      "WHERE itemId = ?;";
    } else {
      sql = "SELECT DISTINCT itemId, cardId, parentId, orderIndex, " +
      "Items.iconType, typeName, typeKeyword, contentText, " +
      "contentUrl, contentLabel " +
      "FROM Items " +
      "LEFT JOIN Icons on Items.iconType = Icons.iconType " +
      "WHERE itemId = ? " +
      "AND approved = 1;";
    }

    const results = await pool.query(sql, itemId);

    // check to see if we were able to find the item
    if (!results[0].length) {
      return {itemId: 0};
    }

    return results[0][0];

  } catch (err) {
    console.error("Error searching for item");
    throw Error(err);
  }

}
exports.getItem = getItem;


// create an item
async function createItem(cardId, parentId, orderIndex, iconType, contentText, contentUrl, contentLabel) {

  try {

    // make sure the card exists
    let sql = "SELECT * " +
    "FROM Cards " +
    "WHERE cardId = ?;";
    let results = await pool.query(sql, cardId);

    if (!results[0].length) {
      return {error: 1};
    }

    // make sure the parent item exists
    if (parentId) {

      sql = "SELECT * " +
      "FROM Items " +
      "WHERE itemId = ?;";
      results = await pool.query(sql, parentId);

      if (!results[0].length) {
        return {error: 2};
      }

    }

    // make sure the icon is valid
    if (iconType) {

      sql = "SELECT * " +
      "FROM Icons " +
      "WHERE iconType = ?;";

      results = await pool.query(sql, iconType);

      if (!results[0].length) {
        return {error: 3};
      }

    }

    // create the new item
    sql = "INSERT INTO Items (cardId, parentId, orderIndex, iconType, contentText, contentUrl, contentLabel, approved) " +
    "VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0);";
    results = await pool.query(sql, [cardId, parentId, orderIndex, iconType, contentText, contentUrl, contentLabel]);

    const finalResults = {
      insertId: results[0].insertId
    };

    return finalResults;

  } catch (err) {
    console.error("Error creating item");
    throw Error(err);
  }

}
exports.createItem = createItem;


// delete an item
async function deleteItem(itemId) {

  try {

    // check to see if the item exists
    let sql = "SELECT * " +
      "FROM Items " +
      "WHERE itemId = ?;";

    let results = await pool.query(sql, itemId);

    if (!results[0].length) {
      return {error: 1};
    }

    // delete the item
    sql = "DELETE " +
      "FROM Items " +
      "WHERE itemId = ?;";

    results = await pool.query(sql, itemId);

    const finalResults = {
      affectedRows: results[0].affectedRows
    };

    return finalResults;

  } catch (err) {
    console.error("Error deleting item");
    throw Error(err);
  }

}
exports.deleteItem = deleteItem;


// update an item
async function updateItem(itemId, cardId, parentId, orderIndex, iconType, contentText, contentUrl, contentLabel, approved) {

  try {

    const sqlArray = [];

    // make sure that the item exists
    let sql = "SELECT * " +
    "FROM Items " +
    "WHERE itemId = ?;";
    let results = await pool.query(sql, itemId);

    if (!results[0].length) {
      return {error: 1};
    }

    // construct a sql query based on the fields given
    sql = "UPDATE Items SET ";

    if (typeof cardId !== "undefined") {

      // confirm that the parent card exists
      const checkSql = "SELECT * " +
      "FROM Cards " +
      "WHERE cardId = ?;";

      results = await pool.query(checkSql, cardId);

      if (!results[0].length) {
        return {error: 2};
      }

      sql += "cardId = ?,";
      sqlArray.push(cardId);

    }

    if (typeof parentId !== "undefined") {

      // confirm that the parent item exists
      if (parentId) {
        const checkSql = "SELECT * " +
        "FROM Items " +
        "WHERE itemId = ?;";

        results = await pool.query(checkSql, parentId);

        if (!results[0].length) {
          return {error: 3};
        }
      }

      sql += "parentId = ?,";
      sqlArray.push(parentId);

    }

    if (typeof orderIndex !== "undefined") {
      sql += "orderIndex = ?,";
      sqlArray.push(orderIndex);
    }

    if (typeof iconType !== "undefined") {
      sql += "iconType = ?,";
      sqlArray.push(iconType);
    }

    if (typeof contentText !== "undefined") {
      sql += "contentText = ?,";
      sqlArray.push(contentText);
    }

    if (typeof contentUrl !== "undefined") {
      sql += "contentUrl = ?,";
      sqlArray.push(contentUrl);
    }

    if (typeof contentLabel !== "undefined") {
      sql += "contentLabel = ?,";
      sqlArray.push(contentLabel);
    }

    if (typeof approved !== "undefined") {
      sql += "approved = ?,";
      sqlArray.push(approved);
    }

    // add the last line of the SQL query
    sql = sql.replace(/.$/, " WHERE itemId = ?;");
    sqlArray.push(itemId);

    // make sure the icon is valid
    if (iconType) {

      const sql2 = "SELECT * " +
      "FROM Icons " +
      "WHERE iconType = ?;";

      results = await pool.query(sql2, iconType);

      if (!results[0].length) {
        return {error: 4};
      }

    }

    // make sure that we are updating at least one field
    if (sqlArray.length <= 1) {
      return {error: 5};
    }

    // perform the update query
    results = await pool.query(sql, sqlArray);

    const finalResults = {
      changedRows: results[0].changedRows
    };

    return finalResults;

  } catch (err) {
    console.error("Error updating item");
    throw Error(err);
  }

}
exports.updateItem = updateItem;


// update an item's timestamp
async function updateItemTime(itemId, deadLink) {

  try {

    // make sure that the item exists
    let sql = "SELECT * " +
    "FROM Items " +
    "WHERE itemId = ?;";
    let results = await pool.query(sql, itemId);

    if (!results[0].length) {
      return {error: 1};
    }

    // create the SQL query
    if (deadLink) {
      sql = "UPDATE Items " +
      "SET created = null " +
      "WHERE itemId = ?;";
    } else {
      sql = "UPDATE Items " +
      "SET created = now() " +
      "WHERE itemId = ?;";
    }

    // perform the update query
    results = await pool.query(sql, itemId);

    // get the generated timestamp
    sql = "SELECT created " +
    "FROM Items " +
    "WHERE itemId = ?;";

    results = await pool.query(sql, itemId);

    const timestamp = results[0][0].created + "";

    const finalResults = {
      timestamp: timestamp
    };

    return finalResults;

  } catch (err) {
    console.error("Error updating item's timestamp");
    throw Error(err);
  }

}
exports.updateItemTime = updateItemTime;