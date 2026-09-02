// File: instrument.test.js
// Description: tests that the client reads its Sentry settings from the
// configuration the file server supplies at request time

import * as Sentry from "@sentry/react";

afterEach(() => {
  delete window.__RUNTIME_CONFIG__;
  jest.resetModules();
});

// the disabled cases run first: Sentry.getClient() reads global state that
// survives jest.resetModules(), so initializing earlier would leak into them

test("stays disabled when no runtime configuration is present", async () => {
  await import("./instrument");

  expect(Sentry.getClient()).toBeUndefined();
});

test("stays disabled when the runtime configuration has an empty DSN", async () => {
  window.__RUNTIME_CONFIG__ = {SENTRY_DSN: "", SENTRY_ENVIRONMENT: "production"};

  await import("./instrument");

  expect(Sentry.getClient()).toBeUndefined();
});

test("initializes from the runtime configuration DSN", async () => {
  window.__RUNTIME_CONFIG__ = {
    SENTRY_DSN: "https://examplekey@o55555.ingest.us.sentry.io/424242",
    SENTRY_ENVIRONMENT: "staging"
  };

  await import("./instrument");
  const options = Sentry.getClient().getOptions();

  expect(options.dsn).toContain("o55555.ingest.us.sentry.io");
  expect(options.environment).toBe("staging");
  expect(options.sendDefaultPii).toBe(false);
});

// the API is reached cross origin with credentials included and the server
// sends no CORS headers, so any header the SDK added would fail preflight
test("adds no tracing headers to API requests", async () => {
  const requests = [];
  global.fetch = jest.fn((url, options) => {
    requests.push(options && options.headers);
    return Promise.resolve({ok: true, status: 200});
  });

  await fetch("https://api.example.com/api/users", {credentials: "include"});

  const headers = Object.keys(requests[0] || {}).map((name) => name.toLowerCase());
  expect(headers).not.toContain("sentry-trace");
  expect(headers).not.toContain("baggage");
});
