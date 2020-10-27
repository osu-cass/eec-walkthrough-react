// File: requests.js
// Description: Provides functions for working with requests

const {pool} = require("../services/database/mysqlPool");
const {publishPage} = require("./pages");
const {publishHeader} = require("./headers");
const {publishCard} = require("./cards");
const { request } = require("express");


// return a list of all requests
async function getRequests(status, sort, order, cursor) {
  try {

    const ASC = 1;
    const RESULTS_PER_PAGE = 25;
    const sqlArray = [];
    let requests;
    const nextCursor = {
      primary: "null",
      secondary: "null"
    };

    // get all requests (initial sql query)
    let sql = "SELECT Requests.*, UNIX_TIMESTAMP(Requests.created) AS unixTime, username " +
    "FROM Requests " +
    "LEFT JOIN Users on Requests.userId = Users.userId " +
    "WHERE TRUE ";

    // see what type of requests we should get
    if (status) {
      sql += "AND status = ? ";
      sqlArray.push(status);
    } else {
      sql += "AND status != 4 ";
    }

    // only use the cursor if it isn't the initial search request
    if (cursor.primary !== "null") {

      let orderChar = "<";
      if (order === ASC) {
        orderChar = ">";
      }

      // We set our primary cursor to the last valid time if it is the value
      // that we are sorting by.
      //
      // Instances where the primary cursor value could have duplicate values
      // are handled by also sorting by item ID.

      switch (sort) {
        case 0:
          sql += `AND (IFNULL(UNIX_TIMESTAMP(Requests.created), 0) ${orderChar}= ? AND ` +
            `(IFNULL(UNIX_TIMESTAMP(Requests.created), 0) ${orderChar} ? OR requestId >= ? )) `;
          break;
        case 1:
          sql += `AND (title ${orderChar}= ? AND ` +
            `(title ${orderChar} ? OR requestId >= ? )) `;
          break;
        case 2:
          sql += `AND (username ${orderChar}= ? AND ` +
            `(username ${orderChar} ? OR requestId >= ? )) `;
          break;
        case 3:
          sql += `AND (status ${orderChar}= ? AND ` +
            `(status ${orderChar} ? OR requestId >= ? )) `;
          break;
        default:
          sql += `AND (IFNULL(UNIX_TIMESTAMP(Requests.created), 0) ${orderChar}= ? AND ` +
            `(IFNULL(UNIX_TIMESTAMP(Requests.created), 0) ${orderChar} ? OR requestId >= ? )) `;
      }
      sqlArray.push(cursor.primary);
      sqlArray.push(cursor.primary);
      sqlArray.push(cursor.secondary);

    }

    // get the results in the order we are sorting by
    switch (sort) {
      case 0:
        sql += "ORDER BY unixTime ";
        break;
      case 1:
        sql += "ORDER BY title ";
        break;
      case 2:
        sql += "ORDER BY username ";
        break;
      case 3:
        sql += "ORDER BY status ";
        break;
      default:
        sql += "ORDER BY unixTime ";
    }

    // order by ascending or descending
    if (order === ASC) {
      sql += "ASC, requestId ASC LIMIT ?;";
    } else {
      sql += "DESC, requestId ASC LIMIT ?;";
    }

    // get the number of results per page (plus the next cursor)
    sqlArray.push(RESULTS_PER_PAGE + 1);

    // perform the query
    const results = await pool.query(sql, sqlArray);

    // get the next cursor and return the correct number of requests
    if (results[0].length < RESULTS_PER_PAGE + 1) {

      // if we have returned the last of the data then we return
      // a null next cursor
      requests = results[0];
      nextCursor.primary = "null";
      nextCursor.secondary = "null";

    } else {

      // Our next cursor will store a primary and secondary value.
      // The primary value is the main value we are sorting by.
      // The secondary value is the request ID and it is used to sort when we
      // have results with matching primary values.
      requests = results[0].slice(0, -1);
      const nextRequest = results[0][RESULTS_PER_PAGE];

      switch (sort) {
        case 0:
          nextCursor.primary = String(nextRequest.unixTime);
          if (nextCursor.primary === "undefined") {
            nextCursor.primary = "0";
          }
          break;
        case 1:
          nextCursor.primary = String(nextRequest.title);
          break;
        case 2:
          nextCursor.primary = String(nextRequest.username);
          break;
        case 3:
          nextCursor.primary = String(nextRequest.status);
          break;
        default:
          nextCursor.primary = String(nextRequest.unixTime);
          if (nextCursor.primary === "undefined") {
            nextCursor.primary = "0";
          }
      }
      nextCursor.secondary = String(nextRequest.requestId);

    }

    return {
      requests: requests,
      nextCursor: nextCursor
    };

  } catch (err) {
    console.error("Error searching for requests");
    throw Error(err);
  }

}
exports.getRequests = getRequests;


// return all data for a single request
async function getRequest(requestId, userId) {

  try {

    // get the specified request
    let sql = "SELECT Requests.*, username " +
    "FROM Requests " +
    "LEFT JOIN Users on Requests.userId = Users.userId " +
    "WHERE requestId = ? " +
    "ORDER BY created ASC;";

    let results = await pool.query(sql, requestId);
    const finalResults = results[0][0];

    // check to see if we were able to find the request
    if (!results[0].length) {
      return {requestId: 0};
    }

    // get all of the comments for the request
    sql = "SELECT RC.*, username " +
    "FROM Request_Comments AS RC " +
    "LEFT JOIN Users on RC.userId = Users.userId " +
    "WHERE requestId = ? " +
    "ORDER BY RC.created ASC;";
    results = await pool.query(sql, requestId);

    finalResults.comments = results[0];

    // get all object for the request
    sql = "SELECT * " +
    "FROM Request_Objects " +
    "WHERE requestId = ? " +
    "ORDER BY requestObjectId ASC;";
    results = await pool.query(sql, requestId);
    const objects = results[0];
    const fullObjects = [];

    for (let i = 0; i < objects.length; i++) {

      // get a page object
      if (objects[i].objectType === 1) {
        sql = "SELECT Pages.*, pluralName AS categoryName " +
        "FROM Pages " +
        "LEFT JOIN Categories on pageType = categoryId " +
        "WHERE approved = 0 " +
        "AND pageId = ?;";
        results = await pool.query(sql, objects[i].objectId);

        if (!results[0].length) {
          sql = "SELECT tempPageId AS pageId, tempPageType AS pageType, tempName AS name, " +
          "tempTitle AS title, tempDescription AS description, tempImageUrl AS imageUrl, " +
          "tempInternal AS internal, tempUserId AS userId, tempCreated AS created, " +
          "pluralName AS categoryName " +
          "FROM Temp_Pages " +
          "LEFT JOIN Categories on tempPageType = categoryId " +
          "WHERE tempPageId = ?;";
          results = await pool.query(sql, objects[i].objectId);

          // save the object and see if there is an old version
          if (results[0].length) {
            const page = results[0][0];
            page.objectType = 1;

            sql = "SELECT Pages.*, pluralName AS categoryName " +
            "FROM Pages " +
            "LEFT JOIN Categories on pageType = categoryId " +
            "WHERE approved = 1 " +
            "AND pageId = ?;";
            results = await pool.query(sql, objects[i].objectId);

            if (results[0].length) {
              page.oldVersion = results[0][0];
            }

            fullObjects.push(page);
          }

        } else {
          // save the object
          results[0][0].objectType = 1;
          fullObjects.push(results[0][0]);
        }
        continue;
      }

      // get a header object
      if (objects[i].objectType === 2) {
        sql = "SELECT Headers.*, Pages.pageId, Pages.name AS pageName, Pages.pageType, Categories.pluralName AS categoryName " +
        "FROM Headers " +
        "LEFT JOIN Pages on Pages.pageId = Headers.pageId " +
        "LEFT JOIN Categories on Pages.pageType = Categories.categoryId " +
        "WHERE Headers.approved = 0 " +
        "AND headerId = ?;";
        results = await pool.query(sql, objects[i].objectId);

        if (!results[0].length) {
          sql = "SELECT tempHeaderId AS headerId, tempTitle AS title, tempInternal AS internal, " +
          "tempOrderIndex AS orderIndex, tempUserId AS userId, tempCreated AS created, " +
          "Pages.pageId, Pages.name AS pageName, Pages.pageType, Categories.pluralName AS categoryName " +
          "FROM Temp_Headers " +
          "LEFT JOIN Headers on Headers.headerId = Temp_Headers.tempHeaderId " +
          "LEFT JOIN Pages on Pages.pageId = Headers.pageId " +
          "LEFT JOIN Categories on Pages.pageType = Categories.categoryId " +
          "WHERE tempHeaderId = ?;";
          results = await pool.query(sql, objects[i].objectId);

          // save the object and see if there is an old version
          if (results[0].length) {
            const header = results[0][0];
            header.objectType = 2;

            sql = "SELECT Headers.*, Pages.pageId, Pages.name AS pageName, Pages.pageType, Categories.pluralName AS categoryName " +
            "FROM Headers " +
            "LEFT JOIN Pages on Pages.pageId = Headers.pageId " +
            "LEFT JOIN Categories on Pages.pageType = Categories.categoryId " +
            "WHERE Headers.approved = 1 " +
            "AND headerId = ?;";
            results = await pool.query(sql, objects[i].objectId);

            if (results[0].length) {
              header.oldVersion = results[0][0];
            }

            fullObjects.push(header);
          }

        } else {
          // save the object
          results[0][0].objectType = 2;
          fullObjects.push(results[0][0]);
        }
        continue;
      }

      // get a card object
      if (objects[i].objectType === 3) {
        sql = "SELECT Cards.*, Headers.title AS headerName, Pages.pageId, " +
        "Pages.name AS pageName, Pages.pageType, Categories.pluralName AS categoryName " +
        "FROM Cards " +
        "LEFT JOIN Headers on Headers.headerId = Cards.headerId " +
        "LEFT JOIN Pages on Pages.pageId = Headers.pageId " +
        "LEFT JOIN Categories on Pages.pageType = Categories.categoryId " +
        "WHERE Cards.approved = 0 " +
        "AND cardId = ?;";
        results = await pool.query(sql, objects[i].objectId);

        if (!results[0].length) {

          sql = "SELECT tempCardId AS cardId, tempCardType AS cardType, tempTitle AS title, " +
          "tempOrderIndex AS orderIndex, tempUserId AS userId, tempCreated AS created, " +
          "Headers.title AS headerName, Pages.pageId, Pages.name AS pageName, Pages.pageType, Categories.pluralName AS categoryName " +
          "FROM Temp_Cards " +
          "LEFT JOIN Cards on Cards.cardId = Temp_Cards.tempCardId " +
          "LEFT JOIN Headers on Headers.headerId = Cards.headerId " +
          "LEFT JOIN Pages on Pages.pageId = Headers.pageId " +
          "LEFT JOIN Categories on Pages.pageType = Categories.categoryId " +
          "WHERE tempCardId = ?;";
          results = await pool.query(sql, objects[i].objectId);

          // get the items, see if there is an old version, and save the object
          if (results[0].length) {

            const card = results[0][0];
            card.objectType = 3;

            // get all of the items
            sql = "SELECT DISTINCT itemId, cardId, indentation, orderIndex, " +
            "Items.iconType, typeName, typeKeyword, contentText, " +
            "contentUrl, contentLabel, contentMode, internal, " +
            "created, approved, color " +
            "FROM Items " +
            "LEFT JOIN Icons on Items.iconType = Icons.iconType " +
            "WHERE cardId = ? " +
            "AND approved = 0 " +
            "ORDER BY orderIndex ASC, itemId ASC";
            results = await pool.query(sql, objects[i].objectId);

            if (results[0].length) {
              card.items = results[0];
            }

            // see if there is an old version
            sql = "SELECT Cards.*, Headers.title AS headerName, Pages.pageId, " +
            "Pages.name AS pageName, Pages.pageType, Categories.pluralName AS categoryName " +
            "FROM Cards " +
            "LEFT JOIN Headers on Headers.headerId = Cards.headerId " +
            "LEFT JOIN Pages on Pages.pageId = Headers.pageId " +
            "LEFT JOIN Categories on Pages.pageType = Categories.categoryId " +
            "WHERE Cards.approved = 1 " +
            "AND cardId = ?;";
            results = await pool.query(sql, objects[i].objectId);

            if (results[0].length) {
              card.oldVersion = results[0][0];

              // get all of the old version items
              sql = "SELECT DISTINCT itemId, cardId, indentation, orderIndex, " +
              "Items.iconType, typeName, typeKeyword, contentText, " +
              "contentUrl, contentLabel, contentMode, internal, " +
              "created, approved, color " +
              "FROM Items " +
              "LEFT JOIN Icons on Items.iconType = Icons.iconType " +
              "WHERE cardId = ? " +
              "AND approved = 1 " +
              "ORDER BY orderIndex ASC, itemId ASC";
              results = await pool.query(sql, [objects[i].objectId]);

              if (results[0].length) {
                card.oldVersion.items = results[0];
              }
            }

            fullObjects.push(card);
          }

        } else {

          // get the items and save the object
          if (results[0].length) {

            const card = results[0][0];
            card.objectType = 3;

            // get all of the items
            sql = "SELECT DISTINCT itemId, cardId, indentation, orderIndex, " +
            "Items.iconType, typeName, typeKeyword, contentText, " +
            "contentUrl, contentLabel, contentMode, internal, " +
            "created, approved, color " +
            "FROM Items " +
            "LEFT JOIN Icons on Items.iconType = Icons.iconType " +
            "WHERE cardId = ? " +
            "AND approved = 0 " +
            "ORDER BY orderIndex ASC, itemId ASC";
            results = await pool.query(sql, objects[i].objectId);

            if (results[0].length) {
              card.items = results[0];
              fullObjects.push(card);
            }
          }

        }
      }

    }

    // delete all notifications related to this request for the current user
    sql = "DELETE FROM Notifications " +
    "WHERE requestId = ? AND userId = ?;";
    await pool.query(sql, [requestId, userId]);

    finalResults.objects = fullObjects;

    return finalResults;

  } catch (err) {
    console.error("Error searching for request");
    throw Error(err);
  }

}
exports.getRequest = getRequest;


// return all data for a group of selected objects (pages, headers, cards)
async function getSelection(objects) {

  try {

    const newObjects = [];

    for (let i = 0; i < objects.length; i++) {

      const object = {};

      // if we are looking at a page...
      if (objects[i].objectType === 1) {
        object.objectType = "Page";
        object.key = objects[i].objectId + "P";

        // get the objects name
        const sql = "SELECT name " +
        "FROM Pages " +
        "WHERE pageId = ? " +
        "AND approved = 0;";
        const results = await pool.query(sql, objects[i].objectId);

        // Check to see if we were able to find the object.
        // If we were, then we add it to the array.
        // If we were not able to find it, then search in the temp objects.
        if (!results[0].length) {

          const sql = "SELECT tempName AS name " +
          "FROM Temp_Pages " +
          "WHERE tempPageId = ?;";
          const results = await pool.query(sql, objects[i].objectId);

          if (results[0].length) {
            object.objectName = results[0][0].name;
            newObjects.push(object);
          }

        } else {
          object.objectName = results[0][0].name;
          newObjects.push(object);
        }
        continue;
      }

      // if we are looking at a header...
      if (objects[i].objectType === 2) {
        object.objectType = "Header";
        object.key = objects[i].objectId + "H";

        // get the objects name
        const sql = "SELECT title AS name " +
        "FROM Headers " +
        "WHERE headerId = ? " +
        "AND approved = 0;";
        const results = await pool.query(sql, objects[i].objectId);

        // Check to see if we were able to find the object.
        // If we were, then we add it to the array.
        // If we were not able to find it, then search in the temp objects.
        if (!results[0].length) {

          const sql = "SELECT tempTitle AS name " +
          "FROM Temp_Headers " +
          "WHERE tempHeaderId = ?;";
          const results = await pool.query(sql, objects[i].objectId);

          if (results[0].length) {
            object.objectName = results[0][0].name;
            newObjects.push(object);
          }

        } else {
          object.objectName = results[0][0].name;
          newObjects.push(object);
        }
        continue;
      }

      // If we are looking at a card...
      if (objects[i].objectType === 3) {
        object.objectType = "Card";
        object.key = objects[i].objectId + "C";

        // get the objects name
        const sql = "SELECT title AS name " +
        "FROM Cards " +
        "WHERE cardId = ? " +
        "AND approved = 0;";
        const results = await pool.query(sql, objects[i].objectId);

        // Check to see if we were able to find the object.
        // If we were, then we add it to the array.
        // If we were not able to find it, then search in the temp objects.
        if (!results[0].length) {

          const sql = "SELECT tempTitle AS name " +
          "FROM Temp_Cards " +
          "WHERE tempCardId = ?;";
          const results = await pool.query(sql, objects[i].objectId);

          if (results[0].length) {
            object.objectName = results[0][0].name;
            newObjects.push(object);
          }

        } else {
          object.objectName = results[0][0].name;
          newObjects.push(object);
        }
      }

    }

    const finalResults = {
      objects: newObjects
    };

    return finalResults;

  } catch (err) {
    console.error("Error searching for request");
    throw Error(err);
  }

}
exports.getSelection = getSelection;


// create a request
async function createRequest(title, description, objects, userId) {

  try {

    const idArray = [];
    let filteredObjects = [];
    const finalObjects = [];

    // make sure all objects in the array are valid
    for (let i = 0; i < objects.length; i++) {
      if ((objects[i].objectType !== 1 && objects[i].objectType !== 2 &&
          objects[i].objectType !== 3) || !Number.isInteger(parseInt(objects[i].objectId, 10))) {
        return {error: 1};
      } else {
        const object = {
          objectType: objects[i].objectType,
          objectId: Math.abs(parseInt(objects[i].objectId, 10))
        };
        filteredObjects.push(object);
      }
    }

    // filter out duplicate objects
    for (let i = 0; i < filteredObjects.length; i++) {
      idArray.push(filteredObjects[i].objectType + "_" + filteredObjects[i].objectId);
    }
    filteredObjects = filteredObjects.filter((value, index) => idArray.indexOf(value.objectType + "_" + value.objectId) === index);

    // check the objects against the database to ensure that they are valid
    for (let i = 0; i < filteredObjects.length; i++) {

      // if we are looking at a page...
      if (filteredObjects[i].objectType === 1) {

        // see if the object exists
        const sql = "SELECT * " +
        "FROM Pages " +
        "WHERE pageId = ? " +
        "AND approved = 0;";
        const results = await pool.query(sql, filteredObjects[i].objectId);

        if (!results[0].length) {

          const sql = "SELECT * " +
          "FROM Temp_Pages " +
          "WHERE tempPageId = ?;";
          const results = await pool.query(sql, filteredObjects[i].objectId);

          if (results[0].length) {
            finalObjects.push(filteredObjects[i]);
          }

        } else {
          finalObjects.push(filteredObjects[i]);
        }
        continue;
      }

      // if we are looking at a header...
      if (filteredObjects[i].objectType === 2) {

        // see if the object exists
        const sql = "SELECT * " +
        "FROM Headers " +
        "WHERE headerId = ? " +
        "AND approved = 0;";
        const results = await pool.query(sql, filteredObjects[i].objectId);

        if (!results[0].length) {

          const sql = "SELECT * " +
          "FROM Temp_Headers " +
          "WHERE tempHeaderId = ?;";
          const results = await pool.query(sql, filteredObjects[i].objectId);

          if (results[0].length) {
            finalObjects.push(filteredObjects[i]);
          }

        } else {
          finalObjects.push(filteredObjects[i]);
        }
        continue;
      }

      // if we are looking at a card...
      if (filteredObjects[i].objectType === 3) {

        // see if the object exists
        const sql = "SELECT * " +
        "FROM Cards " +
        "WHERE cardId = ? " +
        "AND approved = 0;";
        const results = await pool.query(sql, filteredObjects[i].objectId);

        if (!results[0].length) {

          const sql = "SELECT * " +
          "FROM Temp_Cards " +
          "WHERE tempCardId = ?;";
          const results = await pool.query(sql, filteredObjects[i].objectId);

          if (results[0].length) {
            finalObjects.push(filteredObjects[i]);
          }

        } else {
          finalObjects.push(filteredObjects[i]);
        }
        continue;
      }

    }

    // we must have at least one valid object to continue
    if (!finalObjects.length) {
      return {error: 1};
    }

    // create the new request
    let sql = "INSERT INTO Requests (title, description, status, userId) " +
    "VALUES (?, ?, 1, ?);";
    let results = await pool.query(sql, [title, description, userId]);

    const insertId = results[0].insertId;

    // add all of the objects to the new request
    for (let i = 0; i < finalObjects.length; i++) {
      sql = "INSERT INTO Request_Objects (requestId, objectId, objectType) " +
      "VALUES (?, ?, ?);";
      results = await pool.query(sql, [insertId, finalObjects[i].objectId, finalObjects[i].objectType]);
    }

    // send a notification to each editor about the new request
    sql = "SELECT userId " +
    "FROM Users " +
    "WHERE role = 3;";
    results = await pool.query(sql, []);

    const editors = results[0];
    const message = `A new request named "${title}" was created`;

    for (let i = 0; i < editors.length; i++) {
      sql = "INSERT INTO Notifications (requestId, userId, text, type) " +
      "VALUES (?, ?, ?, 2);";
      await pool.query(sql, [insertId, editors[i].userId, message]);
    }

    const finalResults = {
      insertId: insertId
    };

    return finalResults;

  } catch (err) {
    console.error("Error creating request");
    throw Error(err);
  }

}
exports.createRequest = createRequest;


// create a comment
async function createComment(requestId, comment, status, targetId, userId) {

  try {

    // make sure the request exists
    let sql = "SELECT * " +
    "FROM Requests " +
    "WHERE requestId = ? " +
    "AND status != 4;";
    let results = await pool.query(sql, requestId);

    if (!results[0].length) {
      return {error: 1};
    }

    const requestStatus = results[0][0].status;

    // if the current comment is a review, make sure we are currently accepting it
    if (requestStatus !== 1 && status === 2) {
      return {error: 2};
    }

    if (requestStatus !== 2 && status === 3) {
      return {error: 3};
    }

    // have reviews update the status of the request
    if (status === 2) {

      sql = "UPDATE Requests " +
      "SET status = 2 " +
      "WHERE requestId = ?;";
      results = await pool.query(sql, requestId);

    } else if (status === 3) {

      sql = "UPDATE Requests " +
      "SET status = 3 " +
      "WHERE requestId = ?;";
      results = await pool.query(sql, requestId);

    }

    // create the comment
    sql = "INSERT INTO Request_Comments (requestId, comment, review, targetId, userId) " +
    "VALUES (?, ?, ?, ?, ?);";
    results = await pool.query(sql, [requestId, comment, status, targetId, userId]);

    const finalResults = {
      insertId: results[0].insertId
    };

    // notify all relevant users about this new comment
    sql = "(SELECT DISTINCT userId " +
    "FROM Request_Comments " +
    "WHERE requestId = ? " +
    "AND userId != ?) " +
    "UNION " +
    "(SELECT DISTINCT userId " +
    "FROM Requests " +
    "WHERE requestId = ? " +
    "AND userId != ?);";
    results = await pool.query(sql, [requestId, userId, requestId, userId]);

    const usersToNotify = results[0];

    // get the current request name
    sql = "SELECT title " +
    "FROM Requests " +
    "WHERE requestId = ?;";
    results = await pool.query(sql, [requestId]);
    const requestName = results[0][0].title;

    // get the current username
    sql = "SELECT username " +
    "FROM Users " +
    "WHERE userId = ?;";
    results = await pool.query(sql, [userId]);
    const username = results[0][0].username;

    // generate a notification message
    const message = `${username} left a comment on the "${requestName}" request`;

    // create the notifications
    for (let i = 0; i < usersToNotify.length; i++) {
      sql = "INSERT INTO Notifications (requestId, userId, text, type) " +
      "VALUES (?, ?, ?, 1);";
      await pool.query(sql, [requestId, usersToNotify[i].userId, message]);
    }

    return finalResults;

  } catch (err) {
    console.error("Error creating comment");
    throw Error(err);
  }

}
exports.createComment = createComment;


// delete a comment
async function deleteComment(commentId, userId) {

  try {

    // check to see if the comment exists
    let sql = "SELECT * " +
      "FROM Request_Comments " +
      "WHERE commentId = ?;";
    let results = await pool.query(sql, commentId);

    if (!results[0].length) {
      return {error: 1};
    }

    const requestId = results[0][0].requestId;
    const commentStatus = results[0][0].review;
    const commenterId = results[0][0].userId;

    // don't allow the deletion of review comments
    if (commentStatus === 2 || commentStatus === 3) {
      return {error: 2};
    }

    // make sure the request is still open
    sql = "SELECT * " +
      "FROM Requests " +
      "WHERE status != 4 " +
      "AND requestId = ?;";
    results = await pool.query(sql, requestId);

    if (!results[0].length) {
      return {error: 3};
    }

    // make sure the current user ID matches the user who created the comment
    if (commenterId !== userId) {
      return {error: 4};
    }

    // delete the comment
    sql = "DELETE " +
      "FROM Request_Comments " +
      "WHERE commentId = ?;";
    results = await pool.query(sql, commentId);

    const finalResults = {
      affectedRows: results[0].affectedRows
    };

    return finalResults;

  } catch (err) {
    console.error("Error deleting comment");
    throw Error(err);
  }

}
exports.deleteComment = deleteComment;


async function updateComment(commentId, commentText, userId) {

  try {

    // check to see if the comment exists
    let sql = "SELECT * " +
      "FROM Request_Comments " +
      "WHERE commentId = ?;";
    let results = await pool.query(sql, commentId);

    if (!results[0].length) {
      return {error: 1};
    }

    const requestId = results[0][0].requestId;
    const commenterId = results[0][0].userId;

    // make sure the request is still open
    sql = "SELECT * " +
      "FROM Requests " +
      "WHERE status != 4 " +
      "AND requestId = ?;";
    results = await pool.query(sql, requestId);

    if (!results[0].length) {
      return {error: 2};
    }

    // make sure the current user ID matches the user who created the comment
    if (commenterId !== userId) {
      return {error: 3};
    }

    // update the comment
    sql = "UPDATE Request_Comments " +
      "SET comment = ? " +
      "WHERE commentId = ?;";
    results = await pool.query(sql, [commentText, commentId]);

    const finalResults = {
      affectedRows: results[0].affectedRows
    };

    return finalResults;

  } catch (err) {
    console.error("Error updating comment");
    throw Error(err);
  }

}
exports.updateComment = updateComment;


// delete a request
async function deleteRequest(requestId, userId, admin) {

  try {

    // check to see if the request exists
    let sql = "SELECT * " +
      "FROM Requests " +
      "WHERE requestId = ?;";
    let results = await pool.query(sql, requestId);

    if (!results[0].length) {
      return {error: 1};
    }

    // if the current user is not an admin,
    // make sure their user ID matches the user who created the request
    if (!admin) {
      if (results[0][0].userId !== userId) {
        return {error: 2};
      }
    }

    // delete the request (but save the request history)
    sql = "UPDATE Requests " +
      "SET status = 4 " +
      "WHERE requestId = ?;";
    results = await pool.query(sql, requestId);

    const finalResults = {
      affectedRows: results[0].affectedRows
    };

    return finalResults;

  } catch (err) {
    console.error("Error closing request");
    throw Error(err);
  }

}
exports.deleteRequest = deleteRequest;


// approve a publish request
async function approveRequest(requestId) {

  try {

    let objectsApproved = 0;

    // check to see if the request exists and has objects
    let sql = "SELECT * " +
      "FROM Request_Objects " +
      "WHERE requestId = ?;";
    let results = await pool.query(sql, requestId);

    if (!results[0].length) {
      return {error: 1};
    }

    const objects = results[0];

    // see if each object exists and is ready to publish
    for (let i = 0; i < objects.length; i++) {

      // if we are looking at a page...
      if (objects[i].objectType === 1) {

        const sql = "SELECT * " +
        "FROM Pages " +
        "WHERE pageId = ? " +
        "AND approved = 0;";
        const results = await pool.query(sql, objects[i].objectId);

        if (!results[0].length) {

          const sql = "SELECT * " +
          "FROM Temp_Pages " +
          "WHERE tempPageId = ?;";
          const results = await pool.query(sql, objects[i].objectId);

          if (results[0].length) {
            publishPage(objects[i].objectId);
            objectsApproved++;
          }

        } else {
          publishPage(objects[i].objectId);
          objectsApproved++;
        }
        continue;
      }

      // if we are looking at a header...
      if (objects[i].objectType === 2) {

        const sql = "SELECT * " +
        "FROM Headers " +
        "WHERE headerId = ? " +
        "AND approved = 0;";
        const results = await pool.query(sql, objects[i].objectId);

        if (!results[0].length) {

          const sql = "SELECT * " +
          "FROM Temp_Headers " +
          "WHERE tempHeaderId = ?;";
          const results = await pool.query(sql, objects[i].objectId);

          if (results[0].length) {
            publishHeader(objects[i].objectId);
            objectsApproved++;
          }

        } else {
          publishHeader(objects[i].objectId);
          objectsApproved++;
        }
        continue;
      }

      // If we are looking at a card...
      if (objects[i].objectType === 3) {

        const sql = "SELECT * " +
        "FROM Cards " +
        "WHERE cardId = ? " +
        "AND approved = 0;";
        const results = await pool.query(sql, objects[i].objectId);

        if (!results[0].length) {

          const sql = "SELECT * " +
          "FROM Temp_Cards " +
          "WHERE tempCardId = ?;";
          const results = await pool.query(sql, objects[i].objectId);

          if (results[0].length) {
            publishCard(objects[i].objectId);
            objectsApproved++;
          }

        } else {
          publishCard(objects[i].objectId);
          objectsApproved++;
        }

      }

    }

    // close the publish request
    sql = "UPDATE Requests " +
    "SET status = 4 " +
    "WHERE requestId = ?;";
    results = await pool.query(sql, requestId);

    const finalResults = {
      objectsApproved: objectsApproved
    };

    return finalResults;

  } catch (err) {
    console.error("Error approving request");
    throw Error(err);
  }

}
exports.approveRequest = approveRequest;