// File: users.js
// Description: handles routing for users

const express = require("express");
const app = express();
const {validationResult} = require("express-validator");
const {
  postUserVal,
  patchUserVal,
  getUserVal,
  loginUserVal

} = require("../services/validation/requestValidation");

const {
  getUser,
  loginUser,
  createUser,
  updateUser
} = require("../models/users");


// get information about a single user
app.get("/:userId", getUserVal.validation, async (req, res) => {

  try {

    const userId = req.params.userId;
    console.log("Get user", userId);

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }

    // get user data
    const results = await getUser(userId);

    if (results.userId === 0) {
      res.status(404).send({error: "User not found."});
    } else {
      res.status(200).send(results);
    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// login a user
app.get("/login/:userName/:password", loginUserVal.validation, async (req, res) => {

  try {

    const userName = req.params.userName;
    const password = req.params.password;
    console.log("Check login for", userName);

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }

    // get user data
    const results = await loginUser(userName, password);

    if (results.userId === 0) {
      res.status(400).send({error: "Username or password is incorrect."});
    } else {
      res.status(200).send(results);
    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// create a user
app.post("/", postUserVal.validation, async (req, res) => {

  try {

    console.log("Create a new user");

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }

    const userName = req.body.userName;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    // create a user
    const results = await createUser(userName, password, firstName, lastName, email);

    if (results.insertId) {
      res.status(201).send(results);
    } else {

      if (results.error === 1) {
        res.status(403).send({error: "A user with that username already exists."});
      } else if (results.error === 2) {
        res.status(403).send({error: "A user with that email already exists."});
      } else {
        res.status(500).send({error: "An internal server error occurred. Please try again later."});
      }

    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// update a user
app.patch("/:userId", patchUserVal.validation, async (req, res) => {

  try {

    console.log("Update a user");

    const userId = req.params.userId;
    const userName = req.body.userName;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const role = req.body.role;

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }

    // update a user
    const results = await updateUser(userId, userName, password, firstName, lastName, email, role);

    if (results.changedRows >= 0) {
      res.status(200).send(results);
    } else {

      if (results.error === 1) {
        res.status(404).send({error: "User not found."});
      } else if (results.error === 2) {
        res.status(422).send({error: "Request doesn't include any fields to update."});
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
