// File: app.js
// Description: handles server functions and setup

// setup database connection and routing
require("dotenv").config({silent: process.env.NODE_ENV === "production"});


const express = require('express');
const path = require('path');
const app = express();



const {pool} = require("./services/database/mysqlPool");
// const app = require("./routes/index");
const https = require("https");
const http = require("http");
const fs = require("fs");

console.log("Server JavaScript start");
console.log("Running in", process.env.NODE_ENV, "mode");

const port = process.env.PORT || 1111;

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

const directoryName = __dirname + "/client/";
console.log(directoryName);

app.use(express.static(path.join(directoryName, "build")));

app.get('/', function(req, res) {
  res.sendFile(path.join(directoryName, "build", "index.html"));
});

app.listen(2222);

/*
// listen for incoming requests
testConnection(pool, 1, () => {

  // for production we use https, for development we use http
  if (process.env.NODE_ENV === "production") {
    https.createServer(options, app).listen(port, () => {
      console.log("Server is listening on port", port, "\n");
    });
  } else {
    http.createServer(app).listen(port, () => {
      console.log("Server is listening on port", port, "\n");
    });
  }
});
*/

// module.exports = app;
