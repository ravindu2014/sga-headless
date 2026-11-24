import {
  SIGNATURE_HEADER_NAME,
  isValidSignature,
} from "@sanity/webhook";

export interface Env {
  SANITY_WEBHOOK_SECRET: string;
  GITHUB_DISPATCH_TOKEN: string;
  GITHUB_REPO: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);

    if (request.method === "GET" && (pathname === "/" || pathname === "/health")) {
      return new Response("ok", { status: 200 });
    }

    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    if (!env.SANITY_WEBHOOK_SECRET || !env.GITHUB_DISPATCH_TOKEN || !env.GITHUB_REPO) {
      return new Response("Relay not configured", { status: 503 });
    }

    const body = await request.text();
    const signature = request.headers.get(SIGNATURE_HEADER_NAME);

    if (
      !signature ||
      !(await isValidSignature(body, signature, env.SANITY_WEBHOOK_SECRET))
    ) {
      return new Response("Invalid signature", { status: 401 });
    }

    const dispatchRes = await fetch(
      `https://api.github.com/repos/${env.GITHUB_REPO}/dispatches`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.GITHUB_DISPATCH_TOKEN}`,
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
          "User-Agent": "sga-headless-sanity-rebuild",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event_type: "sanity-publish",
          client_payload: {
            dataset: request.headers.get("sanity-dataset") ?? "production",
            documentId: request.headers.get("sanity-document-id") ?? null,
            operation: request.headers.get("sanity-operation") ?? null,
          },
        }),
      },
    );

    if (!dispatchRes.ok) {
      const detail = await dispatchRes.text();
      console.error("GitHub dispatch failed", dispatchRes.status, detail);
      return new Response("GitHub dispatch failed", { status: 502 });
    }

    return new Response(JSON.stringify({ ok: true, event: "sanity-publish" }), {
      status: 202,
      headers: { "Content-Type": "application/json" },
    });
  },
} satisfies ExportedHandler<Env>;