// File: notifications.js
// Description: handles routing for notifications

const express = require("express");
const app = express.Router();
const {
  getNotifications,
  deleteNotification,
} = require("../models/notifications");
const {
  requireAuth
} = require("../services/authentication/cookieAuth");


// view all active notifications for a single user
app.get("/", requireAuth, async (req, res) => {

  try {

    const userId = req.auth.userId;

    // get all notifications for the current user
    const results = await getNotifications(userId);
    res.status(200).send(results);

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// delete a notification
app.delete("/:notificationId", requireAuth, async (req, res) => {

  try {

    const userId = req.auth.userId;
    const notificationId = parseInt(req.params.notificationId, 10);

    const results = await deleteNotification(notificationId, userId);
    if (results.affectedRows === 0) {
      res.status(404).send({error: "No notification found."});
    } else {
      res.status(200).send(results);
    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


module.exports = app;