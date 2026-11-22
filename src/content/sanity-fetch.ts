import "server-only";

import { getSanityClient } from "./client";

export async function sanityFetch<T>(
  query: string,
  params?: Record<string, unknown>,
): Promise<T | null> {
  try {
    return await getSanityClient().fetch<T>(query, params ?? {});
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[content] Sanity fetch failed:", error);
    }
    return null;
  }
}