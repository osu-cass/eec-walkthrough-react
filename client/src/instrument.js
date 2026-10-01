// File: instrument.js
// Description: initializes Sentry error monitoring for the React client.
// This file must be imported before any other module in index.js.

import * as Sentry from "@sentry/react";

// configuration is served by the file server at request time rather than being
// compiled into the bundle, so the DSN can be set with an environment variable
// and picked up by restarting the app
const runtimeConfig = (typeof window !== "undefined" && window.__RUNTIME_CONFIG__) || {};

const dsn = runtimeConfig.SENTRY_DSN;

// Sentry stays disabled unless a DSN is configured, so development builds and
// static deployments report nothing by default
if (dsn) {
  Sentry.init({
    dsn,
    environment: runtimeConfig.SENTRY_ENVIRONMENT || process.env.NODE_ENV,
    // tracesSampleRate is intentionally omitted, so no tracing integration is
    // loaded and no sentry-trace/baggage headers are added to API requests

    // do not attach user IP addresses to events
    sendDefaultPii: false
  });
}
