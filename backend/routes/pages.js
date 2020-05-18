// File: pages.js
// Description: handles routing for pages

const express = require('express');
const app = express();
const {
  getIndustries
} = require('../models/pages');

// get information about industries and their related subjects
app.get("/industries/all", async (req, res) => {

  try {

    console.log("Get a list of all industries and their related subjects");

    // get industry data
    const results = await getIndustries();

    if (results.industries === []) {
      console.error("404: No matching industries found\n");
      res.status(404).send({error: "No industries found."});
    } else {
      console.log("200: Industries found\n");
      res.status(200).send(results);
    }

  } catch (err) {
    console.error("500: An internal server error occurred\n Error:", err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});

module.exports = app;
