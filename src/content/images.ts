import type { ImageDto } from "./types";

type SanityImage = {
  asset?: { url?: string };
  alt?: string;
};

export function mapSanityImage(image?: SanityImage | null): ImageDto | undefined {
  if (!image?.asset?.url) {
    return undefined;
  }
  return {
    url: image.asset.url,
    ...(image.alt ? { alt: image.alt } : {}),
  };
}