// File: constants.js
// Description: constants that need to be easily referenced

export let APIURL;

if (process.env.NODE_ENV === "development") {
  APIURL = "/api";
} else {
  APIURL = "https://walkthrough.eec.oregonstate.edu:1111/api";
}