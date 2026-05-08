// services/database/backfillIntegrity.js
// Run once: node services/database/backfillIntegrity.js
// Calculates the subresource integrity hash for all CSP-allowed URLs
// in the Items and History_Items tables and stores it in the integrity column

require("dotenv").config();
const https = require("https");
const http  = require("http");
const crypto = require("crypto");
const { pool } = require("./mysqlPool");

const CSP_ALLOWED_EXTENSIONS = /^http.*\.(png|jpg|jpeg|gif|webp|svg|pdf)$/i;
const options = {
    headers: {
        "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
        "Accept": "*/*",
        "Accept-Language": "en-US,en;q=0.9",
        "Connection": "keep-alive"
    }
};  


async function fetchAndHash(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : http;
    const req = client.get(url, options, (res) => {
      if (res.statusCode !== 200) {
        console.log(`${url} — Status ${res.statusCode}`);
        res.resume();
        return resolve(null); // skip non-200 responses
      }

      // calculate the SHA-384 hash of the response body
      const hash = crypto.createHash("sha384");
      res.on("data", (chunk) => hash.update(chunk));

      // return the hash as a string prefixed with "sha384-"
      res.on("end", () => resolve(`sha384-${hash.digest("base64")}`));
      res.on("error", reject);
    });
    req.on("error", reject);
    req.setTimeout(10000, () => { req.destroy(); resolve(null); });
  });
}

/**
 * @param {string} tableName
 * @param {string} idColumn
 * @param {string} idLabel  human-readable label for logs
 */
async function backfillTable(tableName, idColumn, idLabel) {
  const [rows] = await pool.query(
    `SELECT ${idColumn}, contentUrl FROM ${tableName} WHERE contentUrl != '' AND integrity = '';`
  );

  console.log(`Found ${rows.length} ${tableName} rows to process.`);

  for (const row of rows) {
    const id = row[idColumn];
    const { contentUrl } = row;

    if (!CSP_ALLOWED_EXTENSIONS.test(contentUrl)) {
      continue; // skip non-CSP-allowed URLs
    }

    try {
      const integrity = await fetchAndHash(contentUrl);
      if (integrity) {
        await pool.query(
          `UPDATE ${tableName} SET integrity = ? WHERE ${idColumn} = ?;`,
          [integrity, id]
        );
        console.log(`✓ ${tableName} ${idLabel} ${id}: ${integrity}`);
      } else {
        console.warn(`✗ ${tableName} ${idLabel} ${id}: skipped (non-200 or timeout)`);
      }
    } catch (err) {
      console.error(`✗ ${tableName} ${idLabel} ${id}: error — ${err.message}`);
    }
  }
}

async function run() {
  await backfillTable("Items", "itemId", "itemId");
  await backfillTable("History_Items", "historyId", "historyId");

  await pool.end();
  console.log("Done.");
}

run().catch((err) => { console.error(err); process.exit(1); });
