import { createClient } from "next-sanity";
import { hasSanityConfig, sanityApiVersion, sanityDataset, sanityProjectId } from "./env";

export function getSanityWriteClient() {
  if (!hasSanityConfig() || !process.env.SANITY_API_WRITE_TOKEN) {
    throw new Error("Missing Sanity write configuration. Set SANITY_API_WRITE_TOKEN.");
  }

  return createClient({
    projectId: sanityProjectId,
    dataset: sanityDataset,
    apiVersion: sanityApiVersion,
    useCdn: false,
    token: process.env.SANITY_API_WRITE_TOKEN,
  });
}
