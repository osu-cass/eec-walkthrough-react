// File: notifications.js
// Description: Provides functions for working with notifications

const {pool} = require("../services/database/mysqlPool");


// returns all notifications for the given user
async function getNotifications(userId) {

  try {

    const sql = "SELECT * " +
    "FROM Notifications " +
    "WHERE userId = ?;";

    const results = await pool.query(sql, userId);

    const finalResults = {
      notifications: results[0]
    };

    return finalResults;

  } catch (err) {
    console.error("Error getting notifications");
    throw Error(err);
  }

}
exports.getNotifications = getNotifications;


// delete a notification by ID
async function deleteNotification(notificationId, userId) {

  try {

    const sql = "DELETE FROM Notifications " +
    "WHERE notificationId = ? AND userId = ?;";

    const results = await pool.query(sql, [notificationId, userId]);

    const finalResults = {
      affectedRows: results[0].affectedRows
    };

    return finalResults;

  } catch (err) {
    console.error("Error deleting notification");
    throw Error(err);
  }

}
exports.deleteNotification = deleteNotification;