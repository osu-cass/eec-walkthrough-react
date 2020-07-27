// File: publishedMode.js
// Description: uses local storage to track the current published/unpublished move mode

import {getProfile} from "./cookieAuth";

// Gets the current published mode value.
// If the user roles is less than admin, always return unpublished mode.
export function getPublished() {

  const role = getProfile().role;
  if (role < 4) {
    return 0;
  }
  const mode = window.localStorage.getItem("publishedMode");
  if (mode) {
    return parseInt(mode);
  } else {
    return 0;
  }

}

// sets the published mode value
export function setPublished(publishedValue) {
  window.localStorage.setItem("publishedMode", publishedValue.toString(10));
}