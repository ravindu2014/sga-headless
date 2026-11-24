import "server-only";

import { getSanityClient } from "./client";

export async function sanityFetch<T>(
  query: string,
  params?: Record<string, unknown>,
): Promise<T | null> {
  try {
    return await getSanityClient().fetch<T>(query, params ?? {});
  } catch (error) {
    const verbose =
      process.env.NODE_ENV === "development" ||
      process.env.CI === "true" ||
      process.env.npm_lifecycle_event === "build";
    if (verbose) {
      console.warn("[content] Sanity fetch failed:", error);
    }
    return null;
  }
}