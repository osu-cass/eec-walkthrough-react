// File: curators.js
// Description: handles routing for curators

const express = require("express");
const app = express();
const {validationResult} = require("express-validator");
const {
  getPageCurators,
  getCurators,
  changeCurator,
  changePrevCurator
} = require("../models/curators");
const {
  getPageCuratorsVal,
  putCuratorVal,
  putPrevCuratorVal
} = require("../services/validation/requestValidation");
const {
  requireAuth,
  roleCheck
} = require("../services/authentication/cookieAuth");

// get all curators/curated pages
app.get("/all", async (req, res) => {

  try {
    console.log("Grab all curators/curated pages");

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    // get page curator
    const results = await getCurators();
    res.status(200).send(results);

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});

// get page curators
app.get("/page/:pageId", getPageCuratorsVal.validation, async (req, res) => {

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
    const results = await getPageCurators(pageId);
    res.status(200).send(results);

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});

// put previous page curator
app.put("/previous", requireAuth, putPrevCuratorVal.validation, async (req, res) => {

  try {
    console.log("Insert/update previous page curator");

    const pageIds = req.body.pageIds;
    const pageNames = req.body.pageNames;
    const userId = req.body.userId;
    const active = req.body.active;

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    // make sure the user is allowed to perform this action
    if (!await roleCheck(3, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to insert/update page curator."});
      return;
    }

    // put page curator
    const results = await changePrevCurator(pageIds, pageNames, userId, active);

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

// put page curator
app.put("/:pageId", requireAuth, putCuratorVal.validation, async (req, res) => {

  try {
    console.log("Insert/update page curator");

    const pageId = req.params.pageId;
    const pageName = req.body.pageName;
    const userId = req.body.userId;
    const active = req.body.active;

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    // make sure the user is allowed to perform this action
    if (!await roleCheck(3, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to insert/update page curator."});
      return;
    }

    // put page curator
    const results = await changeCurator(pageId, pageName, userId, active);

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