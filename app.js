// File: app.js
// Description: handles server functions and setup

// setup database connection and routing
require("dotenv").config({silent: process.env.NODE_ENV === "production"});

const express = require('express');
const path = require('path');
const fileApp = express();
const {pool} = require("./services/database/mysqlPool");
app = require("./routes/index");
const https = require("https");
const http = require("http");
const fs = require("fs");

console.log("Server JavaScript start");
console.log("Running in", process.env.NODE_ENV, "mode");

const apiPort = process.env.API_PORT || 1111;
const filePort = process.env.FILE_PORT || 2222;


let options = {};

if (process.env.NODE_ENV === "production") {
  options = {
    key: fs.readFileSync("walkthrough.key"),
    cert: fs.readFileSync("walkthrough.cer")
  };
}

// confirm that connection was made to the database
async function testConnection(pool, attempt, callback) {
  try {
    await pool.query("SELECT userId FROM Users");
    console.log("Connected to database");
    callback();
  } catch (err) {
    if (attempt < 5) {
      console.log(`Attempt ${attempt}: Error connecting to database...\nRestarting...`);
      testConnection(pool, attempt + 1, callback);
    } else {
      console.log(`Final Attempt: Error connecting to database\n`, err);
    }
  }
}

// serve files
app.use(express.static(path.join(__dirname + "/client/", "build")));
app.use(express.static(path.join(__dirname + "/client/", "files")));

// listen for incoming requests
testConnection(pool, 1, () => {

  // for production we use https, for development we use http
  if (process.env.NODE_ENV === "production") {
    https.createServer(options, app).listen(apiPort, () => {
      console.log("API server is listening on port", apiPort, "\n");
    });
  } else {
    http.createServer(app).listen(apiPort, () => {
      console.log("API server is listening on port", apiPort, "\n");
    });
  }
});

/*
// serve static files while in production mode
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname + "/client/", "build")));
  app.use(express.static(path.join(__dirname + "/client/", "files")));

  app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname + "/client/", "build", "index.html"));
  });

  fileApp.listen(filePort, () => {
    console.log("File server is listening on port", filePort, "\n");
  });
}
*/


module.exports = app;
