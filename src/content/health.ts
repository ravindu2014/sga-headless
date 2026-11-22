import "server-only";

import { getSanityConfig } from "./config";
import { getSanityClient } from "./client";
import type { ContentLayerStatus } from "./types";

/** Lightweight connectivity check for build-time fetches (no GROQ in pages). */
export async function getContentLayerStatus(): Promise<ContentLayerStatus> {
  const config = getSanityConfig();
  let reachable = false;

  try {
    await getSanityClient().fetch<{ _id: string }[]>("*[0...1]{_id}");
    reachable = true;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[content] Sanity unreachable:", error);
    }
  }

  return {
    ...config,
    reachable,
  };
}