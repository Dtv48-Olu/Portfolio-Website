#!/usr/bin/env node

/**
 * sync-projects.js
 *
 * Generates data/projects.json by combining:
 * 1. Manually curated projects (data/manual-projects.json)
 * 2. GitHub repositories fetched via the REST API
 *
 * Usage:
 *   GITHUB_TOKEN=<token> npm run sync-projects
 *
 * Requirements:
 *   - Node 18+
 *   - data/manual-projects.json (optional but recommended)
 */

const fs = require("fs");
const path = require("path");
const https = require("https");

const GITHUB_USERNAME = "Dtv48-Olu";
const OUTPUT_PATH = path.join(__dirname, "..", "data", "projects.json");
const MANUAL_PATH = path.join(__dirname, "..", "data", "manual-projects.json");

const TOPICS_INCLUDE = ["portfolio", "featured"]; // repos with these topics are prioritized
const MAX_AUTO_PROJECTS = 20;

const STATUS_MAP = {
    archived: "planned",
    template: "planned",
};

/**
 * Helper to read JSON file if present.
 */
function readJsonIfExists(filePath, fallback = []) {
    try {
        if (fs.existsSync(filePath)) {
            return JSON.parse(fs.readFileSync(filePath, "utf-8"));
        }
    } catch (err) {
        console.error(`Failed to read ${filePath}:`, err.message);
    }
    return fallback;
}

/**
 * Simple HTTP GET wrapper for GitHub REST API.
 */
function githubRequest(endpoint, token) {
    const options = {
        hostname: "api.github.com",
        path: endpoint,
        method: "GET",
        headers: {
            "User-Agent": "portfolio-sync-script",
            Accept: "application/vnd.github+json",
        },
    };

    if (token) {
        options.headers.Authorization = `Bearer ${token}`;
    }

    return new Promise((resolve, reject) => {
        https
            .request(options, (res) => {
                let data = "";
                res.on("data", (chunk) => (data += chunk));
                res.on("end", () => {
                    if (
                        res.statusCode &&
                        res.statusCode >= 200 &&
                        res.statusCode < 300
                    ) {
                        try {
                            resolve(JSON.parse(data));
                        } catch (err) {
                            reject(
                                new Error(
                                    `Failed to parse JSON from ${endpoint}: ${err.message}`,
                                ),
                            );
                        }
                    } else {
                        reject(
                            new Error(
                                `GitHub API error ${res.statusCode}: ${data}`,
                            ),
                        );
                    }
                });
            })
            .on("error", (err) => reject(err))
            .end();
    });
}

/**
 * Normalize repository data into project schema.
 */
function repoToProject(repo) {
    const techStack = [];
    if (repo.language) techStack.push(repo.language);
    if (repo.topics)
        techStack.push(...repo.topics.filter((t) => t && t.length <= 20));

    const status = repo.archived
        ? STATUS_MAP.archived
        : repo.is_template
          ? STATUS_MAP.template
          : "building";

    const progress = status === "shipped" ? 100 : status === "planned" ? 0 : 50;

    return {
        id: repo.name.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
        title: repo.name
            .replace(/[-_]/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase()),
        description:
            repo.description?.slice(0, 180) ||
            "Project synced from GitHub repository metadata.",
        status,
        progress,
        techStack: [...new Set(techStack)].slice(0, 6),
        links: {
            github: repo.html_url,
            demo: repo.homepage || "#",
            docs: "#",
        },
        repo: repo.name,
        stars: repo.stargazers_count ?? 0,
        manual: false,
    };
}

/**
 * Merge manual and auto projects, giving precedence to manual entries.
 */
function mergeProjects(manualProjects, autoProjects) {
    const map = new Map();
    let excludeList = [];

    // Find and extract exclusion list
    const excludeEntry = manualProjects.find((p) => p.id === "__exclude__");
    if (excludeEntry && excludeEntry.exclude) {
        excludeList = excludeEntry.exclude;
    }

    // Add manual projects (skip the exclude entry)
    manualProjects
        .filter((p) => p.id !== "__exclude__")
        .forEach((project) => map.set(project.id, project));

    // Add auto projects if not excluded and not already in map
    autoProjects.forEach((project) => {
        if (!map.has(project.id) && !excludeList.includes(project.id)) {
            map.set(project.id, project);
        }
    });

    // Sort: shipped -> building -> planned, then by stars desc for auto entries
    const statusOrder = { shipped: 0, building: 1, planned: 2 };
    return Array.from(map.values()).sort((a, b) => {
        const statusDiff =
            (statusOrder[a.status] ?? 3) - (statusOrder[b.status] ?? 3);
        if (statusDiff !== 0) return statusDiff;
        return (b.stars ?? 0) - (a.stars ?? 0);
    });
}

async function main() {
    const token =
        process.env.GITHUB_TOKEN || process.env.GH_TOKEN || process.env.TOKEN;
    if (!token) {
        console.warn("No GITHUB_TOKEN provided. GitHub sync will be skipped.");
    }

    const manualProjects = readJsonIfExists(MANUAL_PATH, []);
    let autoProjects = [];

    if (token) {
        try {
            const repos = await githubRequest(
                `/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
                token,
            );

            autoProjects = repos
                .filter((repo) => !repo.private && !repo.disabled && !repo.fork)
                .slice(0, MAX_AUTO_PROJECTS)
                .map(repoToProject);
        } catch (err) {
            console.error("Failed to fetch repositories:", err.message);
        }
    }

    const merged = mergeProjects(manualProjects, autoProjects);

    try {
        fs.writeFileSync(OUTPUT_PATH, JSON.stringify(merged, null, 2));
        console.log(`✅ Synced ${merged.length} projects to ${OUTPUT_PATH}`);
    } catch (err) {
        console.error("Failed to write projects.json:", err.message);
        process.exitCode = 1;
    }
}

main();
