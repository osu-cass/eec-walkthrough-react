// File: upload-sourcemaps.js
// Description: uploads production browser source maps when Sentry build credentials are available.

const {spawnSync} = require("child_process");
const path = require("path");
const {SentryCli} = require("@sentry/cli");

const requiredVariables = ["SENTRY_AUTH_TOKEN", "SENTRY_ORG", "SENTRY_PROJECT"];
const missingVariables = requiredVariables.filter((name) => !process.env[name]);

if (missingVariables.length > 0) {
  console.log(`Skipping Sentry source map upload; missing ${missingVariables.join(", ")}`);
  process.exit(0);
}

const buildDirectory = path.resolve(__dirname, "../build");
const cliPath = SentryCli.getPath();

function runSentryCli(args) {
  const result = spawnSync(cliPath, args, {
    env: process.env,
    stdio: "inherit"
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    process.exit(result.status || 1);
  }
}

runSentryCli(["sourcemaps", "inject", buildDirectory]);
runSentryCli([
  "sourcemaps",
  "upload",
  "--org", process.env.SENTRY_ORG,
  "--project", process.env.SENTRY_PROJECT,
  buildDirectory
]);
