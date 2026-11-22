const DEFAULT_PROJECT_ID = "n2zalqm8";
const DEFAULT_DATASET = "production";
const DEFAULT_API_VERSION = "2024-11-01";

export type SanityConfig = {
  projectId: string;
  dataset: string;
  apiVersion: string;
};

export function getSanityConfig(): SanityConfig {
  return {
    projectId: process.env.SANITY_PROJECT_ID?.trim() || DEFAULT_PROJECT_ID,
    dataset: process.env.SANITY_DATASET?.trim() || DEFAULT_DATASET,
    apiVersion: process.env.SANITY_API_VERSION?.trim() || DEFAULT_API_VERSION,
  };
}