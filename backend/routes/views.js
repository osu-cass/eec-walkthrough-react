// File: views.js
// Description: handles routing views

const express = require("express");
const app = express();
const {validationResult} = require("express-validator");
const {
  getUserID,
  requireAuth,
  roleCheck
} = require("../services/authentication/cookieAuth");
const {
  postViewVal
} = require("../services/validation/requestValidation");
const {
  getViews,
  createView
} = require("../models/views");


// get information about all of the views for a given page
app.get("/page/:pageId", getUserID, async (req, res) => {

  try {

    const pageId = req.params.pageId;
    const userId = req.auth.userId;
    console.log("Get all views for page", pageId);

    // get view data
    const results = await getViews(pageId, userId);
    res.status(200).send(results);

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// create a new view
app.post("/page/:pageId", requireAuth, postViewVal.validation, async (req, res) => {

  try {

    const pageId = req.params.pageId;
    const headers = req.body.headers;
    const publicView = req.body.publicView;
    const viewName = req.body.viewName;
    const userId = req.auth.userId;
    console.log("Create a view for page", pageId);

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    // make sure the user is allowed to perform this action
    if (parseInt(publicView, 10)) {
      if (!await roleCheck(4, req.auth.userId)) {
        res.status(401).send({error: "Unauthorized user attempting to create public view."});
        return;
      }
    }

    // create view data
    const results = await createView(pageId, headers, publicView, viewName, userId);

    if (results.insertId) {
      res.status(201).send(results);
    } else {

      if (results.error === 1) {
        res.status(403).send({error: "Page does not exist."});
      } else if (results.error === 2) {
          res.status(403).send({error: "Invalid header data."});
      } else {
        res.status(500).send({error: "An internal server error occurred. Please try again later."});
      }

    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


module.exports = app;
