import { createClient } from "next-sanity";
import { hasSanityConfig, sanityApiVersion, sanityDataset, sanityProjectId } from "./env";

export function getSanityClient() {
  if (!hasSanityConfig()) {
    return null;
  }

  return createClient({
    projectId: sanityProjectId,
    dataset: sanityDataset,
    apiVersion: sanityApiVersion,
    useCdn: true,
    token: process.env.SANITY_API_READ_TOKEN,
  });
}
