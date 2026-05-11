const https = require("https");
const http = require("http");
const crypto = require("crypto");

const EXTERNAL_MEDIA_EXTENSIONS = /^https?:\/\/.*\.(png|jpg|jpeg|gif|webp|svg|pdf)(\?.*)?$/i;

const FETCH_HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
  "Accept": "*/*",
  "Accept-Language": "en-US,en;q=0.9",
  "Connection": "keep-alive"
};

// Fetch an external URL and return its SHA-384 SRI hash, or "" if not applicable/fetchable
async function computeIntegrity(url) {
  if (!url || !EXTERNAL_MEDIA_EXTENSIONS.test(url)) return "";
  return new Promise((resolve) => {
    const client = url.startsWith("https") ? https : http;
    const req = client.get(url, {headers: FETCH_HEADERS}, (res) => {
      if (res.statusCode !== 200) {
        console.warn(`computeIntegrity: non-200 (${res.statusCode}) for ${url}`);
        res.resume();
        return resolve("");
      }
      const hash = crypto.createHash("sha384");
      res.on("data", (chunk) => hash.update(chunk));
      res.on("end", () => resolve(`sha384-${hash.digest("base64")}`));
      res.on("error", () => resolve(""));
    });
    req.on("error", (err) => {
      console.warn(`computeIntegrity: fetch error for ${url} — ${err.message}`);
      resolve("");
    });
    req.setTimeout(15000, () => { req.destroy(); resolve(""); });
  });
}

module.exports = computeIntegrity;