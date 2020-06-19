// File: pageMode.js
// Description: uses local storage to track the current page mode

import {getProfile} from "./cookieAuth";

// Gets the current page mode value.
// If the user roles is less than editor, always return view mode.
export function getMode() {

  const role = getProfile().role;
  if (role < 2) {
    return 0;
  }
  const mode = window.localStorage.getItem("pageMode");
  if (mode) {
    return parseInt(mode);
  } else {
    return 0;
  }

}

// sets the page mode value
export function setMode(mode) {
  window.localStorage.setItem("pageMode", mode.toString(10));
}