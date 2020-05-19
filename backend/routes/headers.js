// File: headers.js
// Description: handles routing for headers

const express = require('express');
const app = express.Router();
const {
  getHeader,
} = require('../models/headers');


// get information about a single header
app.get("/:headerId", async (req, res) => {

  try {

    const headerId = req.params.headerId;
    console.log("Get header", headerId);

    // get header data
    const results = await getHeader(headerId);

    if (results.headerId === 0) {
      res.status(404).send({error: "Header not found."});
    } else {
      res.status(200).send(results);
    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// create a header


module.exports = app;
