// File: instrument.js
// Description: initializes Sentry error monitoring for the API server.
// This file must be required before any other application module so that the
// SDK can instrument express, http, and mysql2 as they are loaded.

// dotenv is loaded here as well as in app.js so that SENTRY_DSN is available
// before Sentry.init() runs
require("dotenv").config({silent: process.env.NODE_ENV === "production"});

const Sentry = require("@sentry/node");

const dsn = process.env.SENTRY_DSN;

// request headers that can carry the auth_ck JWT or other credentials
const SENSITIVE_HEADERS = ["cookie", "set-cookie", "authorization", "proxy-authorization"];

// sendDefaultPii: false does not remove cookies or authorization headers from
// express error events, so strip them here before anything leaves the server
function scrubRequestData(event) {
  // console.error notices that carry no error object are status messages such
  // as the 404 and 400 handlers, which would otherwise be reported on every
  // unmatched request
  if (shouldDropConsoleNotice(event) || isExpectedAuthFailure(event)) {
    return null;
  }

  if (event.request) {
    delete event.request.cookies;
    delete event.request.data;

    if (event.request.headers) {
      for (const header of Object.keys(event.request.headers)) {
        if (SENSITIVE_HEADERS.includes(header.toLowerCase())) {
          delete event.request.headers[header];
        }
      }
    }

    // query strings may carry tokens, so keep only the path
    delete event.request.query_string;
    if (typeof event.request.url === "string") {
      event.request.url = event.request.url.split("?")[0];
    }
  }

  if (event.user) {
    delete event.user.ip_address;
  }

  return event;
}

// Console arguments can contain credentials before the request scrubber runs.
// In particular, cookieAuth logs parsed cookies while authenticating requests.
// Keep console.error event capture, but never retain console calls as breadcrumbs
// that could be attached to a later event.
function dropConsoleBreadcrumb(breadcrumb) {
  return breadcrumb.category === "console" ? null : breadcrumb;
}

// almost every route handler catches its own errors and reports them with
// console.error rather than passing them to express, so those errors never
// reach setupExpressErrorHandler. capturing console.error is what makes the
// integration see them, at the cost of also seeing the notices logged for
// conditions that are expected rather than faults
function shouldDropConsoleNotice(event) {
  return event.logger === "console" && !event.exception;
}

// a rejected login is routine rather than a defect: every request that arrives
// without an auth cookie, and every session that has passed its eight hour
// expiry, produces one of these and is answered with a 401. AssertionError is
// included because assert() is used only by cookieAuth, which asserts that the
// expected cookies are present before reading them
const EXPECTED_ERROR_TYPES = [
  "AssertionError",
  "JsonWebTokenError",
  "TokenExpiredError",
  "NotBeforeError"
];

function isExpectedAuthFailure(event) {
  const values = event.exception && event.exception.values;

  return Array.isArray(values) && values.some((value) => EXPECTED_ERROR_TYPES.includes(value.type));
}

// Sentry stays disabled unless a DSN is configured, so development and CI
// environments report nothing by default
if (dsn) {
  Sentry.init({
    dsn,
    environment: process.env.SENTRY_ENVIRONMENT || process.env.NODE_ENV || "development",
    // the routes log their caught errors instead of rethrowing them, so this
    // is the integration that actually reports them
    integrations: [Sentry.captureConsoleIntegration({levels: ["error"]})],
    // tracesSampleRate is intentionally omitted, which disables tracing and
    // profiling entirely; setting it to 0 would still sample every request and
    // send client reports for the discarded transactions

    // do not attach user IP addresses or request bodies to events
    sendDefaultPii: false,
    beforeSend: scrubRequestData,
    beforeBreadcrumb: dropConsoleBreadcrumb
  });
  console.log("Sentry error monitoring enabled");
} else {
  console.log("Sentry error monitoring disabled (SENTRY_DSN is not set)");
}

module.exports = Sentry;
