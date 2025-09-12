/**
 * @file scripts/fix-headers.js
 * @author
 *   David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Header fixer for JSDoc blocks at the top of source files.
 * - Ensures exactly one consistent header at the very top
 * - Preserves all @author lines
 * - Preserves @created and @description
 * - Normalizes @client (one clear line), repositions "use client"; consistently
 * - Updates @updated (optional, Apple-style date: Fri Sep 12 2025)
 * - Detects and merges a “secondary” header found below the first (even if "use client"; is between)
 * - Works across .ts/.tsx/.js/.jsx under ./src by default
 * - Optional Prettier run afterwards
 *
 * Usage:
 *   node scripts/fix-headers.js
 *
 * Notes:
 * - Designed to be idempotent. Re-running should make no further changes.
 * - Keep CONFIG simple; the script tries to be self-explanatory in output.
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

/**
 * @typedef {Object} Config
 * @property {string} rootDir              Root directory to scan (default: ./src)
 * @property {string[]} extensions         File extensions to process
 * @property {boolean} updateUpdatedDate   If true, @updated is set to today's date
 * @property {string} staticUpdatedDate    If updateUpdatedDate=false, use this date instead
 * @property {boolean} runPrettier         If true, runs Prettier on ./src after changes
 * @property {boolean} dryRun              If true, prints actions but doesn't write files
 * @property {string} licenseLine          Fallback license line if none found
 * @property {string} normalizedClientTag  Standardized @client line to use if any @client is present
 * @property {number} scanSecondaryHeaderLines  How far to scan for a second header (lines from top)
 */

/** @type {Config} */
const CONFIG = {
    rootDir: path.join(process.cwd(), "src"),
    extensions: [".ts", ".tsx", ".js", ".jsx"],

    updateUpdatedDate: true,
    staticUpdatedDate: "Fri Sep 12 2025",

    runPrettier: true,
    dryRun: false,

    licenseLine: "@license MIT",
    normalizedClientTag: "@client This component requires client-side JavaScript",

    scanSecondaryHeaderLines: 60,
};

/**
 * Format a Date to "Fri Sep 12 2025" (Apple-style).
 * @param {Date} [date]
 */
function appleDate(date = new Date()) {
    return date
        .toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "2-digit",
            year: "numeric",
            timeZone: "America/New_York",
        })
        .replaceAll(",", "");
}

const TODAY = appleDate();

/**
 * Strip all consecutive header blocks at the very top of the file.
 * Returns { headerRegion, body }.
 * @param {string} content
 */
function stripTopHeaderRegion(content) {
    const oneHeader = /^\s*\/\*\*[\s\S]*?\*\/\s*/;
    let idx = 0;
    let region = "";

    while (true) {
        const chunk = content.slice(idx);
        const m = chunk.match(oneHeader);
        if (!m || m.index !== 0) break;
        region += m[0];
        idx += m[0].length;
    }
    return { headerRegion: region, body: content.slice(idx) };
}

/**
 * Parse a single JSDoc block into structured info.
 * @param {string|null} block
 */
function parseHeaderInfoFromBlock(block) {
    if (!block) {
        return {
            authors: [],
            license: null,
            created: null,
            description: "",
            hasClient: false,
        };
    }

    const inner = block
        .replace(/\/\*\*|\*\//g, "")
        .split("\n")
        .map((l) => l.replace(/^\s*\*\s?/, ""))
        .join("\n");

    // Collect authors (unique, keep order)
    const authorMatches = inner.match(/@author[^\n\r]*/g) || [];
    const authors = [];
    const seen = new Set();
    for (const line of authorMatches) {
        const t = line.trim();
        if (!seen.has(t)) {
            seen.add(t);
            authors.push(t);
        }
    }

    // First @license or fallback
    const licMatch = inner.match(/@license\s+[^\n\r]*/);
    const license = licMatch ? licMatch[0].trim() : null;

    // First @created
    const createdMatch = inner.match(/@created\s+([^\n\r]+)/);
    const created = createdMatch ? createdMatch[1].trim() : null;

    // First @description block
    let description = "";
    const descMatch = inner.match(/@description\s*([\s\S]*?)(?=\n\s*@|$)/);
    if (descMatch) {
        description = descMatch[1]
            .split("\n")
            .map((l) => l.replace(/^\s*\*\s?/, "").trimEnd())
            .join("\n")
            .trim();
    }

    // Any @client?
    const hasClient = /@client\b/i.test(inner);

    return { authors, license, created, description, hasClient };
}

/**
 * Merge two header infos, preferring primary values but keeping uniqueness and completeness.
 * @param {*} base
 * @param {*} extra
 */
function mergeHeaderInfo(base, extra) {
    const merged = { ...base };

    // Authors: unique union
    const auth = new Set([...(base.authors || []), ...(extra.authors || [])]);
    merged.authors = Array.from(auth);

    if (!merged.license && extra.license) merged.license = extra.license;
    if (!merged.created && extra.created) merged.created = extra.created;
    if (!merged.description && extra.description) merged.description = extra.description;

    merged.hasClient = Boolean(base.hasClient || extra.hasClient);
    return merged;
}

/**
 * Build the final single header from structured info.
 * @param {string} absPath
 * @param {*} info
 */
function buildHeader(absPath, info) {
    const relPath = absPath.replace(process.cwd() + path.sep, "").split(path.sep).join("/");
    const created = info.created || TODAY;
    const updated = CONFIG.updateUpdatedDate ? TODAY : CONFIG.staticUpdatedDate;
    const authors = info.authors.length ? info.authors : ["@author David (https://dvh.sh)"];
    const license = info.license || CONFIG.licenseLine;
    const descLines = (info.description || "").split("\n");

    const lines = [
        "/**",
        ` * @file ${relPath}`,
        ...authors.map((a) => ` * ${a}`),
        ` * ${license}`,
        " *",
        ` * @created ${created}`,
        ` * @updated ${updated}`,
        " *",
        " * @description",
        ...descLines.map((l) => ` * ${l}`.trimRight()),
    ];

    if (info.hasClient) {
        lines.push(` * ${CONFIG.normalizedClientTag}`);
    }

    lines.push(" */");
    return lines.join("\n");
}

/**
 * If a second header exists within the first N lines, return it with its index range in the body.
 * @param {string} body
 * @param {number} maxLines
 */
function findSecondaryHeader(body, maxLines) {
    const lines = body.split("\n");
    const snippet = lines.slice(0, Math.min(lines.length, maxLines)).join("\n");
    const m = snippet.match(/\/\*\*[\s\S]*?\*\//);
    if (!m) return null;

    const start = snippet.indexOf(m[0]); // relative to snippet
    return { block: m[0], start, end: start + m[0].length };
}

/**
 * Normalize "use client";:
 * - Remove duplicates near the top of the file
 * - Return cleaned body and whether we still need to add one
 * @param {string} body
 * @param {boolean} wantsClient
 */
function normalizeUseClient(body, wantsClient) {
    const lines = body.split("\n");
    let found = false;
    const cleaned = lines.map((l, i) => {
        if (i < 12 && /^\s*"use client";\s*$/.test(l)) {
            found = true;
            return "";
        }
        return l;
    });
    return { cleanedBody: cleaned.join("\n"), clientNeeded: Boolean(wantsClient || found) };
}

/**
 * Process one file:
 * - Remove stacked headers at top
 * - Merge with any secondary header nearby
 * - Normalize client directive and rebuild a single header
 * @param {string} filePath
 */
function processFile(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    if (!CONFIG.extensions.includes(ext)) return { processed: false, changed: false };

    const original = fs.readFileSync(filePath, "utf8");

    // Top stacked headers
    const { headerRegion, body: afterTop } = stripTopHeaderRegion(original);
    let info = parseHeaderInfoFromBlock(headerRegion);

    // Secondary header nearby (even if "use client"; sits between)
    let bodyWithoutSecondary = afterTop;
    const secondary = findSecondaryHeader(afterTop, CONFIG.scanSecondaryHeaderLines);
    if (secondary) {
        const extra = parseHeaderInfoFromBlock(secondary.block);
        info = mergeHeaderInfo(info, extra);
        bodyWithoutSecondary = afterTop.slice(0, secondary.start) + afterTop.slice(secondary.end);
    }

    // Normalize and position "use client";
    const { cleanedBody, clientNeeded } = normalizeUseClient(bodyWithoutSecondary, info.hasClient);
    info.hasClient = clientNeeded;

    // Build final result
    const newHeader = buildHeader(filePath, info);
    const final = info.hasClient ? `${newHeader}\n"use client";\n\n${cleanedBody}` : `${newHeader}\n${cleanedBody}`;

    const changed = final !== original;

    if (changed) {
        if (CONFIG.dryRun) {
            console.log(`• Would fix: ${path.relative(process.cwd(), filePath)}`);
        } else {
            fs.writeFileSync(filePath, final, "utf8");
            console.log(`• Fixed: ${path.relative(process.cwd(), filePath)}`);
        }
    }

    return { processed: true, changed };
}

/**
 * Recursively walk a directory.
 * @param {string} dir
 * @param {(filePath: string)=>void} cb
 */
function walk(dir, cb) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            walk(full, cb);
        } else {
            cb(full);
        }
    }
}

/**
 * Optionally run Prettier on ./src after changes.
 */
function runPrettier() {
    if (!CONFIG.runPrettier || CONFIG.dryRun) return;
    try {
        console.log("• Prettier: formatting ./src ...");
        execSync("npx prettier ./src --write", { stdio: "inherit" });
    } catch (e) {
        console.error("! Prettier failed:", e.message);
    }
}

/**
 * Main entry — friendly output, self-documenting behavior.
 */
function main() {
    console.log("— Fix Headers —");
    console.log(`Root:      ${CONFIG.rootDir}`);
    console.log(`Ext:       ${CONFIG.extensions.join(", ")}`);
    console.log(`@updated:  ${CONFIG.updateUpdatedDate ? TODAY : CONFIG.staticUpdatedDate}`);
    console.log(`Prettier:  ${CONFIG.runPrettier ? "on" : "off"}`);
    console.log(`Mode:      ${CONFIG.dryRun ? "dry-run" : "write"}`);
    console.log("");

    if (!fs.existsSync(CONFIG.rootDir)) {
        console.error(`! Root not found: ${CONFIG.rootDir}`);
        process.exit(1);
    }

    let processed = 0;
    let changed = 0;

    walk(CONFIG.rootDir, (file) => {
        const { processed: p, changed: c } = processFile(file);
        if (p) processed++;
        if (c) changed++;
    });

    console.log("");
    console.log(`Done. Processed: ${processed}, Changed: ${changed}${CONFIG.dryRun ? " (dry)" : ""}.`);

    runPrettier();
}

main();
