// File: info.js
// Description: handles routing for info

const express = require("express");
const app = express.Router();
const {
  getInfo
} = require("../models/info");
const {
  requireAuth
} = require("../services/authentication/cookieAuth");


// get all of the info objects
app.get("/", requireAuth, async (req, res) => {

  try {

    const userId = req.auth.userId;
    console.log("View info");

    // get all info
    const results = await getInfo();
    res.status(200).send(results);

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


module.exports = app;