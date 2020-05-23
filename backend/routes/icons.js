// File: icons.js
// Description: handles routing for icons

const express = require("express");
const app = express.Router();
const {
  getIcons,
} = require("../models/icons");

// get information about all pages and their related subjects/industries
app.get("/all", async (req, res) => {

  try {

    console.log("Get a list of all icons");

    // get a list of all pages and their related subjects/industries
    const results = await getIcons();

    if (results.length === 0) {
      res.status(404).send({error: "No icons found."});
    } else {
      res.status(200).send(results);
    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});

module.exports = app;
