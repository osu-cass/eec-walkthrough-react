// File: publicMode.js
// Description: uses local storage to track the current internal/public viewing mode

import {getProfile} from "./cookieAuth";

// Gets the current public mode value.
// If the user roles is less than editor, always return public mode.
export function getPublic() {

  const role = getProfile().role;
  if (role < 2) {
    return 0;
  }
  const mode = window.localStorage.getItem("publicMode");
  if (mode) {
    return parseInt(mode);
  } else {
    return 0;
  }

}

// sets the public mode value
export function setPublic(publicValue) {
  window.localStorage.setItem("publicMode", publicValue.toString(10));
}