// File: constants.js
// Description: constants that need to be easily referenced

export let APIURL;

if (process.env.NODE_ENV === "development") {
  APIURL = "/api";
} else {
  APIURL = `${process.env.REACT_APP_API_HOST}/api`;
}