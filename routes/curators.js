// File: curators.js
// Description: handles routing for curators

const express = require("express");
const app = express();
const {validationResult} = require("express-validator");
const {
  getPageCurator,
  insertCurator
} = require("../models/curators");
const {
  getCuratorVal,
  putCuratorVal
} = require("../services/validation/requestValidation");
const {
  requireAuth,
  roleCheck
} = require("../services/authentication/cookieAuth");

// get page curator
app.get("/:pageId", getCuratorVal.validation, async (req, res) => {

  try {
    console.log("Grab page curator");

    const pageId = req.params.pageId;

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    // get page curator
    const results = await getPageCurator(pageId);
    res.status(200).send(results);

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});

// put page curator
app.put("/:pageId", requireAuth, putCuratorVal.validation, async (req, res) => {

  try {
    console.log("Insert page curator");

    const pageId = req.params.pageId;
    const userId = req.body.userId;

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    // make sure the user is allowed to perform this action
    if (!await roleCheck(3, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to create page."});
      return;
    }

    // put page curator
    const results = await insertCurator(pageId, userId);

    if (results.success) {
      res.status(200).send(results);
    } else {
      res.status(500).send({error: "An internal server error occurred. Please try again later."});
    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


module.exports = app;