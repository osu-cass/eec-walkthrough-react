// File: cookieAuth.js
// Description: uses cookies to keep track of user info

import cookie from "cookie";
import validator from "validator";

// Parses cookies and checks whether the user is logged in.
//
// Returns an object containing the username, user ID, and the role of the user.
// On error returns a logged out user.
export function getProfile() {
  try {

    // parse cookie
    const cookieObj = cookie.parse(`${document.cookie}`);

    // ensures the parsed cookies are a JS objects
    if (cookieObj !== Object(cookieObj)) {
      throw new Error("Cookies are not a valid JS object");
    }

    // ensure that the user cookies exist
    if (!cookieObj.userId_ck || !cookieObj.role_ck || !cookieObj.username_ck) {
      throw new Error("User cookies not set");
    }

    // ensure that the user ID and role are non-negative integers
    if (!validator.isInt(cookieObj.userId_ck + "") ||
        !validator.isInt(cookieObj.role_ck + "")) {
      throw new Error("Negative user ID or role");
    }

    // return an object containing the user data
    return {
      username: cookieObj.username_ck,
      userId: validator.toInt(cookieObj.userId_ck),
      role: validator.toInt(cookieObj.role_ck)
    };

  } catch (err) {

    // return a logged out user on error
    console.error(err);
    return {
      username: "",
      userId: 0,
      role: 0
    };

  }
}

// checks if the current user is logged in
export function loggedIn() {

  const profile = getProfile();
  const userId = profile.userId;

  return !!userId;

}

// clear user cookies
export function logout() {

  document.cookie = "userId_ck=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "username_ck=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "role_ck=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

}