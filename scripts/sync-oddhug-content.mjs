import { createClient } from "@sanity/client";
import { createReadStream, readFileSync } from "node:fs";
import { resolve } from "node:path";

function loadEnvFile(path) {
  try {
    for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const separator = trimmed.indexOf("=");
      if (separator < 1) continue;
      const key = trimmed.slice(0, separator).trim();
      let value = trimmed.slice(separator + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      if (!process.env[key]) process.env[key] = value;
    }
  } catch {
    // Environment variables may already be provided by the shell or CI.
  }
}

loadEnvFile(resolve(".env.local"));

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN are required.");
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2025-01-01",
  useCdn: false,
});

const documents = readFileSync(resolve("sanity/seed.ndjson"), "utf8")
  .split(/\r?\n/)
  .filter(Boolean)
  .map((line) => JSON.parse(line));

const assetFiles = {
  "siteSettings.default": "hero-toy-scene.svg",
  "product.blobbo-weird-plush-friend": "blobbo-plush.svg",
  "product.grumpy-sprout-mini-monster": "grumpy-sprout.svg",
  "product.wonky-heart-gift-toy": "wonky-heart.svg",
  "product.custom-oddhug-character-project": "custom-monster.svg",
};

for (const document of documents) {
  const filename = assetFiles[document._id];
  if (!filename) continue;

  const asset = await client.assets.upload(
    "image",
    createReadStream(resolve("public/oddhug", filename)),
    { filename, contentType: "image/svg+xml" },
  );
  const image = { _type: "image", asset: { _type: "reference", _ref: asset._id } };
  if (document._type === "siteSettings") document.heroImage = image;
  if (document._type === "product") {
    document.image = image;
    document.gallery = [{ ...image, _key: "main", alt: document.name }];
  }
}

const contentTypes = [
  "siteSettings",
  "themeSettings",
  "category",
  "product",
  "application",
  "advantage",
  "faq",
  "blogPost",
];

await client.delete({ query: `*[_type in $types]`, params: { types: contentTypes } });

let transaction = client.transaction();
for (const document of documents) {
  transaction = transaction.createOrReplace(document);
}
await transaction.commit();

console.log(`Synced ${documents.length} OddHug documents to ${projectId}/${dataset}.`);
