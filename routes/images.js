const express = require("express");
const https = require("https");
const http = require("http");
const { URL } = require("url");
const app = express.Router();

const ALLOWED_PROTOCOLS = ["http:", "https:"];
const MAX_BYTES = 15 * 1024 * 1024;

app.get("/proxy", async (req, res) => {
    const raw = req.query.url;
    if (!raw) return res.status(400).send({ error: "Missing url parameter" });

    // Try to parse the URL
    let parsed;
    try {
    parsed = new URL(raw);
    } catch {
        return res.status(400).send({ error: "Invalid URL" });
    }

    // Reject disallowed protocols
    if (!ALLOWED_PROTOCOLS.includes(parsed.protocol)) {
        return res.status(400).send({ error: "Disallowed protocol" });
    }

    // Reject private/loopback hostnames (SSRF guard)
    const hostname = parsed.hostname.toLowerCase();
    if (hostname === "localhost" || hostname.startsWith("192.168.") ||
        hostname.startsWith("10.") || hostname.startsWith("172.") ||
        hostname === "127.0.0.1" || hostname === "::1") {
            return res.status(400).send({ error: "Private addresses not allowed" });
    }

    // Proxy the image
    const client = parsed.protocol === "https:" ? https : http;
    client.get(raw, (upstream) => {
        const contentType = upstream.headers["content-type"] || "";
        if (!contentType.startsWith("image/")) {
            upstream.destroy();
            return res.status(400).send({ error: "Not an image" });
        }

        // Set the response headers
        res.setHeader("Content-Type", contentType);
        res.setHeader("Cache-Control", "public, max-age=86400");

        let bytes = 0;
        upstream.on("data", (chunk) => {
            bytes += chunk.length;
            if (bytes > MAX_BYTES) {
            upstream.destroy();
            res.end();
            }
        });

        upstream.pipe(res);
    }).on("error", () => res.status(502).send({ error: "Failed to fetch image" }));
});

module.exports = app;