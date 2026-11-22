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
      useCdn: true,
    });
  }
  return client;
}