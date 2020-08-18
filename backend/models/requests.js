// File: requests.js
// Description: Provides functions for working with requests

const {pool} = require("../services/database/mysqlPool");


// return a list of all requests
async function getRequests() {

  try {

    // get all external published links
    let sql = "SELECT Requests.*, username " +
    "FROM Requests " +
    "LEFT JOIN Users on Requests.userId = Users.userId " +
    "WHERE status = 1 " +
    "ORDER BY created ASC;";

    const results = await pool.query(sql, []);

    const finalResults = {
      requests: results[0]
    };

    return finalResults;

  } catch (err) {
    console.error("Error searching for requests");
    throw Error(err);
  }

}
exports.getRequests = getRequests;


// return all data for a single request
async function getRequest(requestId) {

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
        sql = "SELECT * " +
        "FROM Pages " +
        "WHERE approved = 0 " +
        "AND pageId = ?;";
        results = await pool.query(sql, objects[i].objectId);

        if (!results[0].length) {
          sql = "SELECT * " +
          "FROM Temp_Pages " +
          "WHERE tempPageId = ?;";
          results = await pool.query(sql, objects[i].objectId);

          // save the object and see if there is an old version
          if (results[0].length) {
            const page = results[0][0];
            page.objectType = 1;

            sql = "SELECT * " +
            "FROM Pages " +
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
        sql = "SELECT * " +
        "FROM Headers " +
        "WHERE approved = 0 " +
        "AND headerId = ?;";
        results = await pool.query(sql, objects[i].objectId);

        if (!results[0].length) {
          sql = "SELECT * " +
          "FROM Temp_Headers " +
          "WHERE tempHeaderId = ?;";
          results = await pool.query(sql, objects[i].objectId);

          // save the object and see if there is an old version
          if (results[0].length) {
            const header = results[0][0];
            header.objectType = 2;

            sql = "SELECT * " +
            "FROM Headers " +
            "WHERE approved = 1 " +
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
        sql = "SELECT * " +
        "FROM Cards " +
        "WHERE approved = 0 " +
        "AND cardId = ?;";
        results = await pool.query(sql, objects[i].objectId);

        if (!results[0].length) {
          sql = "SELECT * " +
          "FROM Temp_Cards " +
          "WHERE tempCardId = ?;";
          results = await pool.query(sql, objects[i].objectId);

          // get the items, see if there is an old version, and save the object
          if (results[0].length) {

            const card = results[0][0];
            card.objectType = 2;

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
            sql = "SELECT * " +
            "FROM Cards " +
            "WHERE approved = 1 " +
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
              results = await pool.query(sql, objects[i].objectId);

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
            card.objectType = 2;

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

    finalResults.objects = fullObjects;

    return finalResults;

  } catch (err) {
    console.error("Error searching for request");
    throw Error(err);
  }

}
exports.getRequest = getRequest;