import "server-only";

import { createClient, type SanityClient } from "@sanity/client";
import { getSanityConfig } from "./config";

let client: SanityClient | undefined;

export function getSanityClient(): SanityClient {
  if (!client) {
    const { projectId, dataset, apiVersion } = getSanityConfig();
    client = createClient({
      projectId,
      dataset,
      apiVersion,
      // API (not CDN) at build time so publish → rebuild sees new vehicles immediately.
      useCdn: process.env.SANITY_USE_CDN === "true",
    });
  }
  return client;
}