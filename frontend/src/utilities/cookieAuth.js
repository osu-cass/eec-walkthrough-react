// File: cookieAuth.js
// Description: uses cookies to keep track of user info

import cookie from "cookie";
import validator from "validator";

// Parses cookies and checks whether the user is logged in.
//
// Returns an object containing the userId and the role of the user.
// On error returns a role of 0 with a user ID of 0.
export function getProfile() {
  try {

    // parse cookie
    const cookieObj = cookie.parse(`${document.cookie}`);

    // ensures the parsed cookies are a JS objects
    if (cookieObj !== Object(cookieObj)) {
      throw new Error("Cookies are not a valid JS object");
    }

    // ensure that the user ID and role cookies exist
    if (!cookieObj.userId || !cookieObj.role) {
      throw new Error("User ID or role cookie not set");
    }

    // ensure that the user ID and role are non-negative integers
    if (!validator.isInt(cookieObj.userId + "") ||
        !validator.isInt(cookieObj.role + "")) {
      throw new Error("Negative user ID or role");
    }

    // return an object containing userId and role in integers
    return {
      userId: validator.toInt(cookieObj.userId),
      role: validator.toInt(cookieObj.role)
    };

  } catch (err) {

    // return a logged out user on error
    console.error(err);
    return {
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

  document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

}