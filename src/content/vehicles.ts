import "server-only";

import { mapSanityImage } from "./images";
import { resolveLocalizedField } from "./locale";
import { sanityFetch } from "./sanity-fetch";
import type {
  ContentLocale,
  ImageDto,
  LocalizedField,
  VehicleAvailability,
  VehicleDetailDto,
  VehicleSummaryDto,
} from "./types";

type VehicleDocument = {
  slug?: string;
  title?: LocalizedField<string>;
  make?: string;
  model?: string;
  year?: number;
  mileage?: number;
  transmission?: string;
  fuelType?: string;
  exteriorColour?: string;
  description?: LocalizedField<string>;
  features?: LocalizedField<string>;
  mainImage?: { asset?: { url?: string }; alt?: string };
  gallery?: { asset?: { url?: string }; alt?: string }[];
  availability?: VehicleAvailability;
  featured?: boolean;
  priceLkr?: number;
};

const VEHICLE_FIELDS = `{
  "slug": slug.current,
  title,
  make,
  model,
  year,
  mileage,
  transmission,
  fuelType,
  exteriorColour,
  description,
  features,
  availability,
  featured,
  priceLkr,
  mainImage {
    alt,
    asset->{url}
  },
  gallery[] {
    alt,
    asset->{url}
  }
}`;

const VEHICLE_LIST_QUERY = `*[_type == "vehicle" && defined(slug.current)] | order(_updatedAt desc)${VEHICLE_FIELDS}`;

/** One Sanity request per build worker so catalogue, featured, detail, and slugs stay aligned. */
let vehicleRowsPromise: Promise<VehicleDocument[] | null> | null = null;

function fetchVehicleRows(): Promise<VehicleDocument[] | null> {
  if (!vehicleRowsPromise) {
    vehicleRowsPromise = sanityFetch<VehicleDocument[] | null>(VEHICLE_LIST_QUERY);
  }
  return vehicleRowsPromise;
}

function mapVehicleSummary(
  row: VehicleDocument,
  locale: ContentLocale,
): VehicleSummaryDto | null {
  if (!row.slug || !row.make || !row.model || row.year == null) {
    return null;
  }
  const title = resolveLocalizedField(row.title, locale);
  if (!title) {
    return null;
  }

  return {
    slug: row.slug,
    title,
    make: row.make,
    model: row.model,
    year: row.year,
    featured: Boolean(row.featured),
    availability: row.availability ?? "available",
    ...(row.transmission ? { transmission: row.transmission } : {}),
    ...(row.fuelType ? { fuelType: row.fuelType } : {}),
    ...(row.priceLkr != null ? { priceLkr: row.priceLkr } : {}),
    ...(mapSanityImage(row.mainImage)
      ? { mainImage: mapSanityImage(row.mainImage) }
      : {}),
  };
}

function mapVehicleDetail(
  doc: VehicleDocument,
  locale: ContentLocale,
): VehicleDetailDto | null {
  const summary = mapVehicleSummary(doc, locale);
  if (!summary) {
    return null;
  }

  const gallery: ImageDto[] = [];
  for (const image of doc.gallery ?? []) {
    const mapped = mapSanityImage(image);
    if (mapped) gallery.push(mapped);
  }

  const description = resolveLocalizedField(doc.description, locale);
  const features = resolveLocalizedField(doc.features, locale);

  return {
    ...summary,
    ...(doc.mileage != null ? { mileage: doc.mileage } : {}),
    ...(doc.transmission ? { transmission: doc.transmission } : {}),
    ...(doc.fuelType ? { fuelType: doc.fuelType } : {}),
    ...(doc.exteriorColour ? { exteriorColour: doc.exteriorColour } : {}),
    ...(description ? { description } : {}),
    ...(features ? { features } : {}),
    gallery,
  };
}

export async function getVehicles(
  locale: ContentLocale,
): Promise<VehicleSummaryDto[]> {
  const rows = await fetchVehicleRows();
  if (!rows?.length) {
    return [];
  }

  const vehicles: VehicleSummaryDto[] = [];
  for (const row of rows) {
    if (row.availability === "sold") continue;
    const mapped = mapVehicleSummary(row, locale);
    if (mapped) vehicles.push(mapped);
  }
  return vehicles;
}

export async function getFeaturedVehicles(
  locale: ContentLocale,
): Promise<VehicleSummaryDto[]> {
  const all = await getVehicles(locale);
  return all.filter((v) => v.featured);
}

export async function getVehicleBySlug(
  locale: ContentLocale,
  slug: string,
): Promise<VehicleDetailDto | null> {
  const rows = await fetchVehicleRows();
  const doc = rows?.find((row) => row.slug === slug);
  if (!doc) {
    return null;
  }
  return mapVehicleDetail(doc, locale);
}

export async function getVehicleSlugs(): Promise<string[]> {
  const rows = await fetchVehicleRows();
  return (
    rows
      ?.map((row) => row.slug)
      .filter((slug): slug is string => Boolean(slug)) ?? []
  );
}

export type { VehicleSummaryDto, VehicleDetailDto };