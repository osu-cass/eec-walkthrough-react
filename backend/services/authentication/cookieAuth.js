// File: cookieAuth.js
// Description: provides functions that handle the authentication process

const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const COOKIE_EXPIRES_MS = 8 * 60 * 60 * 1000; // cookies expire in 8 hours
const JWT_EXPIRES_HR = "8h"; // JWT expires in 8 hours
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// generate a JWT for a specific user
function generateAuthToken(userId) {
  const payload = {
    sub: userId
  };
  const token = jwt.sign(payload, JWT_SECRET_KEY, {expiresIn: JWT_EXPIRES_HR});
  return token;
}
exports.generateAuthToken = generateAuthToken;

// Set cookies for authentication
function setAuthCookie(res, token, userId, role) {
  res.setHeader("Set-Cookie", [
    cookie.serialize("userId", userId, {
      path: "/",
      sameSite: true,
      expires: new Date(Date.now() + COOKIE_EXPIRES_MS),
      maxAge: COOKIE_EXPIRES_MS / 1000,
    }),
    cookie.serialize("role", role, {
      path: "/",
      sameSite: true,
      expires: new Date(Date.now() + COOKIE_EXPIRES_MS),
      maxAge: COOKIE_EXPIRES_MS / 1000,
    }),
    cookie.serialize("auth", token, {
      path: "/",
      httpOnly: true,
      sameSite: true,
      expires: new Date(Date.now() + COOKIE_EXPIRES_MS),
      maxAge: COOKIE_EXPIRES_MS / 1000,
    })
  ]);
}
exports.setAuthCookie = setAuthCookie;
