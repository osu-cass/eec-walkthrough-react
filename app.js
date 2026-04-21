// File: app.js
// Description: handles server functions and setup

// setup database connection and routing
require("dotenv").config({silent: process.env.NODE_ENV === "production"});

const express = require("express");
const path = require("path");
const fileApp = express();
const {pool} = require("./services/database/mysqlPool");
const app = require("./routes/index");
const http = require("http");

console.log("Server JavaScript start");
console.log("Running in", process.env.NODE_ENV, "mode");

const apiPort = process.env.API_PORT || 1111;
const filePort = process.env.FILE_PORT || 2222;

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

// function getConnectSources() {
//   const sources = ["'self'"];
//   const apiHost = process.env.REACT_APP_API_HOST;

//   if (!apiHost) {
//     return sources;
//   }

//   try {
//     const apiOrigin = new URL(apiHost).origin;
//     if (!sources.includes(apiOrigin)) {
//       sources.push(apiOrigin);
//     }
//   } catch (err) {
//     console.warn("Invalid REACT_APP_API_HOST for CSP connect-src:", apiHost);
//   }

//   return sources;
// }

// const fileContentSecurityPolicy = [
//   "default-src 'self'",
//   "script-src 'self' https://code.jquery.com https://cdnjs.cloudflare.com https://stackpath.bootstrapcdn.com https://cdn.jsdelivr.net",
//   "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://stackpath.bootstrapcdn.com https://cdn.jsdelivr.net https://use.fontawesome.com https://maxcdn.bootstrapcdn.com",
//   "font-src 'self' data: https://fonts.gstatic.com https://use.fontawesome.com https://maxcdn.bootstrapcdn.com",
//   "img-src 'self' data: blob:",
//   `connect-src ${getConnectSources().join(" ")}`,
//   "object-src 'none'",
//   "base-uri 'self'",
//   "form-action 'self'",
//   "frame-ancestors 'none'",
//   "frame-src 'none'",
//   "manifest-src 'self'",
//   "media-src 'self'",
//   "worker-src 'self' blob:",
//   "upgrade-insecure-requests"
// ].join("; ");

// serve static files while in production mode
if (process.env.NODE_ENV === "production") {
  fileApp.use((req, res, next) => {
    res.setHeader("X-Frame-Options", "DENY");
    // res.setHeader("Content-Security-Policy", fileContentSecurityPolicy);
    next();
  });

  fileApp.use(express.static(path.join(__dirname + "/client/", "build")));
  fileApp.use(express.static(path.join(__dirname + "/client/", "files")));

  fileApp.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/", "build", "index.html"));
  });

  fileApp.listen(filePort, () => {
    console.log("File server is listening on port", filePort, "\n");
  });
}

// listen for incoming requests
testConnection(pool, 1, () => {
  http.createServer(app).listen(apiPort, () => {
    console.log("API server is listening on port", apiPort, "\n");
  });
});


module.exports = app;
