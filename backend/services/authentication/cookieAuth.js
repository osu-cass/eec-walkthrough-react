// File: cookieAuth.js
// Description: provides functions that handle user authentication

const {pool} = require("../database/mysqlPool");
const cookie = require("cookie");
const assert = require("assert");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const COOKIE_EXPIRES_MS = 8 * 60 * 60 * 1000; // cookies expire in 8 hours
const JWT_EXPIRES_HR = "8h"; // JWT expires in 8 hours
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const MIN_ID = 1;
const MAX_ID = 4294967295;

// check the user role to ensure they meet the required permission level
async function roleCheck(minRole, userId) {
  try {

    // query the user role to make sure the user is currently
    // allowed to perform this action
    const sql = "SELECT role " +
    "FROM Users " +
    "WHERE userId = ?;";

    const results = await pool.query(sql, userId);

    assert(results[0][0].role >= minRole, "Insufficient role for this action");

    return true;

  } catch (err) {
    console.error("Error checking user role:", err);
    return false;
  }
}
exports.roleCheck = roleCheck;


// Middleware function that extracts the current user ID.
// If the user does not have a designated ID then the ID is assumed to be 0.
function getUserID(req, res, next) {
  req.auth = {};
  try {

    const cookieObj = cookie.parse(`${req.headers.cookie}`);

    // ensure that all of expected cookies are present
    assert(cookieObj === Object(cookieObj), "No cookie provided with request");
    assert(cookieObj.role_ck, "No role cookie provided with request");
    assert(cookieObj.userId_ck, "No user ID cookie provided with request");
    assert(cookieObj.auth_ck, "No auth cookie provided with request");

    // get the JWT from the cookie
    const token = cookieObj.auth_ck;

    // use the JWT service to verify the JWT
    // this function call throws an error if the JWT is invalid
    const payload = jwt.verify(token, JWT_SECRET_KEY);

    // check to make sure the user ID is valid
    assert(validator.isInt(payload.sub + "", {min: MIN_ID, max: MAX_ID}));

    // if verified, add an extra property to the request object
    req.auth = {
      userId: payload.sub
    };

    // if there were no issues we route to the next middleware
    next();

  } catch (err) {
    console.error("User does not have valid credentials");
    req.auth = {
      userId: 0
    };
  }
}
exports.getUserID = getUserID;

// Middleware function that checks if the user is authorized to perform
// a given action.
//
// If the user is unauthorized then they will receive a 401 error and the next
// function will be ignored.
function requireAuth(req, res, next) {
  try {

    req.auth = {};
    const cookieObj = cookie.parse(`${req.headers.cookie}`);

    // ensure that all of expected cookies are present
    assert(cookieObj === Object(cookieObj), "No cookie provided with request");
    assert(cookieObj.role_ck, "No role cookie provided with request");
    assert(cookieObj.userId_ck, "No user ID cookie provided with request");
    assert(cookieObj.auth_ck, "No auth cookie provided with request");

    // get the JWT from the cookie
    const token = cookieObj.auth_ck;

    // use the JWT service to verify the JWT
    // this function call throws an error if the JWT is invalid
    const payload = jwt.verify(token, JWT_SECRET_KEY);

    // check to make sure the user ID is valid
    assert(validator.isInt(payload.sub + "", {min: MIN_ID, max: MAX_ID}));

    // if verified, add an extra property to the request object
    req.auth = {
      userId: payload.sub
    };

    // if there were no issues we route to the next middleware
    next();

  } catch (err) {
    console.error("Authentication error:", err);
    res.status(401).send({error: "Missing or invalid credentials."});
  }
}
exports.requireAuth = requireAuth;


// generate a JWT for a specific user
function generateAuthToken(userId) {
  const payload = {
    sub: userId
  };
  const token = jwt.sign(payload, JWT_SECRET_KEY, {expiresIn: JWT_EXPIRES_HR});
  return token;
}
exports.generateAuthToken = generateAuthToken;


// Set user cookies for general data and authentication
function setAuthCookie(res, token, username, userId, role) {
  res.setHeader("Set-Cookie", [
    cookie.serialize("username_ck", username, {
      path: "/",
      sameSite: true,
      expires: new Date(Date.now() + COOKIE_EXPIRES_MS),
      maxAge: COOKIE_EXPIRES_MS / 1000,
    }),
    cookie.serialize("userId_ck", userId, {
      path: "/",
      sameSite: true,
      expires: new Date(Date.now() + COOKIE_EXPIRES_MS),
      maxAge: COOKIE_EXPIRES_MS / 1000,
    }),
    cookie.serialize("role_ck", role, {
      path: "/",
      sameSite: true,
      expires: new Date(Date.now() + COOKIE_EXPIRES_MS),
      maxAge: COOKIE_EXPIRES_MS / 1000,
    }),
    cookie.serialize("auth_ck", token, {
      path: "/",
      httpOnly: true,
      sameSite: true,
      expires: new Date(Date.now() + COOKIE_EXPIRES_MS),
      maxAge: COOKIE_EXPIRES_MS / 1000,
    })
  ]);
}
exports.setAuthCookie = setAuthCookie;
