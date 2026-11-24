#!/usr/bin/env node
/**
 * Operator helper: fire repository_dispatch sanity-publish (same as the Worker).
 * Usage:
 *   GITHUB_DISPATCH_TOKEN=ghp_… node scripts/github-repository-dispatch.mjs
 *   GITHUB_REPO=owner/repo (default ravindu2014/sga-headless)
 *   DRY_RUN=1 — print payload only
 */
const repo = process.env.GITHUB_REPO ?? "ravindu2014/sga-headless";
const token = process.env.GITHUB_DISPATCH_TOKEN;
const dryRun = process.env.DRY_RUN === "1" || process.env.DRY_RUN === "true";

const payload = {
  event_type: "sanity-publish",
  client_payload: {
    source: "scripts/github-repository-dispatch.mjs",
    at: new Date().toISOString(),
  },
};

if (dryRun || !token) {
  console.log(
    JSON.stringify(
      {
        dryRun: true,
        repo,
        url: `https://api.github.com/repos/${repo}/dispatches`,
        payload,
        hint: token
          ? "Unset DRY_RUN to send"
          : "Set GITHUB_DISPATCH_TOKEN (classic PAT: repo scope; or fine-grained: Actions R/W)",
      },
      null,
      2,
    ),
  );
  process.exit(token ? 0 : 1);
}

const res = await fetch(`https://api.github.com/repos/${repo}/dispatches`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "sga-headless-dispatch-script",
    "Content-Type": "application/json",
  },
  body: JSON.stringify(payload),
});

if (!res.ok) {
  console.error("Dispatch failed", res.status, await res.text());
  process.exit(1);
}

console.log(`Triggered sanity-publish on ${repo} (${res.status})`);