// File: app.js
// Description: handles server functions and setup

// initialize Sentry before anything else so that it can instrument the modules
// required below
require("./instrument");

// setup database connection and routing
require("dotenv").config({silent: process.env.NODE_ENV === "production"});

const express = require("express");
const path = require("path");
const fileApp = express();
const {pool} = require("./services/database/mysqlPool");
const getSecret = require("./services/utils/getSecret");
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

function addConnectOrigin(sources, value, label) {
  if (!value) {
    return;
  }

  try {
    const origin = new URL(value).origin;
    if (!sources.includes(origin)) {
      sources.push(origin);
    }
  } catch (err) {
    console.warn(`Invalid ${label} for CSP connect-src:`, value);
  }
}

function getConnectSources() {
  const sources = ["'self'"];

  addConnectOrigin(sources, process.env.REACT_APP_API_HOST, "REACT_APP_API_HOST");
  // the browser SDK posts events directly to the Sentry ingest host
  addConnectOrigin(sources, getSecret("SENTRY_CLIENT_DSN"), "SENTRY_CLIENT_DSN");

  return sources;
}

const imgSrcAllowedHosts = [
  "7brd83qn9we1178e338tvik7-wpengine.netdna-ssl.com",
  "assets.lutron.com",
  "betterbricks.com",
  "betterbuildingssolutioncenter.energy.gov",
  "blog.klm.com",
  "bspcertification.org",
  "c2e2.unepccc.org",
  "cascadeenergy.com",
  "cdn.houstonpublicmedia.org",
  "cdn.hswstatic.com",
  "cdn4.explainthatstuff.com",
  "cleaverbrooks.com",
  "continentalfan.com",
  "d251cvb8f7e7p0.cloudfront.net",
  "eec.oregonstate.edu",
  "energy350.com",
  "energyeducation.ca",
  "filesblog.bizvibe.com",
  "flowandcontrol.com",
  "huggingface.co",
  "i.imgur.com",
  "iac.university",
  "image.shutterstock.com",
  "image.slidesharecdn.com",
  "img.freepik.com",
  "info.ornl.gov",
  "invenoeng.com",
  "j.gifs.com",
  "letsenhance.io",
  "live.staticflickr.com",
  "miro.medium.com",
  "moseys.com",
  "nitrogen-generators.com",
  "thumbs.dreamstime.com",
  "upload.wikimedia.org",
  "walkthrough.eec.oregonstate.edu",
  "web.archive.org",
  "www.bchydro.com",
  "www.caasafety.com.au",
  "www.canr.msu.edu",
  "www.compressedairchallenge.org",
  "www.eaton.com",
  "www.electricalclassroom.com",
  "www.energy.gov",
  "www.energystar.gov",
  "www.engineeringtoolbox.com",
  "www.flowserve.com",
  "www.homershams.co.nz",
  "www.hurstboiler.com",
  "www.leviton.com",
  "www.lutron.com",
  "www.manexconsulting.com",
  "www.nrel.gov",
  "www.ocpower.org",
  "www.osha.gov",
  "www.plant-maintenance.com",
  "www.researchgate.net",
  "www.royalindustrialdoors.net",
  "www.simerics.com",
  "www.umav.org",
  "www.unido.org",
  "www.wcrouse.com",
  "www3.epa.gov"
].map((h) => `https://${h}`);

const fileContentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' https://code.jquery.com https://cdnjs.cloudflare.com https://stackpath.bootstrapcdn.com https://cdn.jsdelivr.net",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://stackpath.bootstrapcdn.com https://cdn.jsdelivr.net https://use.fontawesome.com https://maxcdn.bootstrapcdn.com",
  "font-src 'self' data: https://fonts.gstatic.com https://use.fontawesome.com https://maxcdn.bootstrapcdn.com",
  `img-src 'self' data: blob: ${imgSrcAllowedHosts.join(" ")}`,
  `connect-src ${getConnectSources().join(" ")}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "frame-src 'none'",
  "manifest-src 'self'",
  "media-src 'self'",
  "worker-src 'self' blob:",
  "upgrade-insecure-requests"
].join("; ");

// serve static files while in production mode
fileApp.use((req, res, next) => {
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Content-Security-Policy", fileContentSecurityPolicy);
  next();
});

// configuration handed to the browser at request time so that client settings
// can be changed by restarting the app instead of rebuilding the bundle.
// only the values listed here are exposed; process.env is never sent as a whole
const runtimeConfig = {
  SENTRY_DSN: getSecret("SENTRY_CLIENT_DSN") || "",
  SENTRY_ENVIRONMENT: getSecret("SENTRY_ENVIRONMENT") || process.env.NODE_ENV || ""
};

// this must be registered before the static handlers so that it takes
// precedence over the placeholder file copied into the build
fileApp.get("/runtime-config.js", (req, res) => {
  res.type("application/javascript");
  res.setHeader("Cache-Control", "no-store");
  res.send(`window.__RUNTIME_CONFIG__ = ${JSON.stringify(runtimeConfig)};`);
});

if (process.env.NODE_ENV === "production") {
  fileApp.use(express.static(path.join(__dirname + "/client/", "build")));
  fileApp.use(express.static(path.join(__dirname + "/client/", "files")));

  fileApp.get("/{*splat}", (req, res) => {
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
