import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import OpenAI from "openai";
import { menuItems } from "../src/data/menu";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const outputDir = path.join(rootDir, "public", "menu", "dishes");
const metadataPath = path.join(rootDir, "public", "menu", "dish-image-metadata.json");

const readArg = (name: string) => {
  const prefix = `--${name}=`;
  return process.argv.find((arg) => arg.startsWith(prefix))?.slice(prefix.length);
};

const hasFlag = (name: string) => process.argv.includes(`--${name}`);

async function loadLocalEnv() {
  for (const fileName of [".env.local", ".env"]) {
    const filePath = path.join(rootDir, fileName);
    try {
      const text = await fs.readFile(filePath, "utf8");
      for (const line of text.split(/\r?\n/)) {
        const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
        if (!match || process.env[match[1]]) continue;
        const rawValue = match[2].replace(/^['"]|['"]$/g, "");
        process.env[match[1]] = rawValue;
      }
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    }
  }
}

const model = readArg("model") ?? process.env.OPENAI_IMAGE_MODEL ?? "gpt-image-2";
const size = readArg("size") ?? "1024x1024";
const quality = readArg("quality") ?? "medium";
const limit = Number(readArg("limit") ?? menuItems.length);
const category = readArg("category");
const onlyIds = readArg("ids")
  ?.split(",")
  .map((id) => id.trim())
  .filter(Boolean);
const concurrency = Math.max(1, Number(readArg("concurrency") ?? 2));
const retries = Math.max(0, Number(readArg("retries") ?? 3));
const skipExisting = !hasFlag("force");
const dryRun = hasFlag("dry-run");

await loadLocalEnv();

const apiKey = process.env.OPENAI_API_KEY;

const selectedItems = menuItems
  .filter((item) => (category ? item.categoryId === category : true))
  .filter((item) => (onlyIds ? onlyIds.includes(item.id) : true))
  .slice(0, Number.isFinite(limit) ? limit : menuItems.length);

if (selectedItems.length === 0) {
  console.log("No dishes matched the requested filters.");
  process.exit(0);
}

if (dryRun) {
  console.log(
    JSON.stringify(
      selectedItems.map((item) => ({
        id: item.id,
        name: item.name,
        category: item.categoryId,
        output: path.join(outputDir, `${item.id}.jpg`),
        prompt: item.imagePrompt,
      })),
      null,
      2,
    ),
  );
  process.exit(0);
}

if (!apiKey) {
  console.error(
    "OPENAI_API_KEY is not set. No dish images were generated; the UI will keep using built-in placeholders.",
  );
  process.exit(1);
}

const client = new OpenAI({ apiKey });

await fs.mkdir(outputDir, { recursive: true });

const metadata = {
  generatedAt: new Date().toISOString(),
  model,
  size,
  quality,
  sourceDocs: [
    "https://developers.openai.com/api/docs/guides/image-generation",
    "https://developers.openai.com/api/docs/models/gpt-image-2",
  ],
  items: [] as Array<{
    id: string;
    name: string;
    file: string;
    prompt: string;
    revisedPrompt?: string;
    skipped?: boolean;
    error?: string;
  }>,
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function generateOne(item: (typeof selectedItems)[number]) {
  const file = path.join(outputDir, `${item.id}.jpg`);
  const publicFile = `/menu/dishes/${item.id}.jpg`;

  if (skipExisting) {
    try {
      await fs.access(file);
      console.log(`Skipping existing ${item.name}`);
      metadata.items.push({
        id: item.id,
        name: item.name,
        file: publicFile,
        prompt: item.imagePrompt,
        skipped: true,
      });
      return;
    } catch {
      // Generate when the file is not already present.
    }
  }

  console.log(`Generating ${item.name} -> ${path.relative(rootDir, file)}`);

  let response;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      response = await client.images.generate({
        model,
        prompt: item.imagePrompt,
        size,
        quality,
        output_format: "jpeg",
        n: 1,
      } as any);
      break;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      const isLastAttempt = attempt === retries;
      if (isLastAttempt) {
        console.warn(`Failed ${item.name}: ${message}`);
        metadata.items.push({
          id: item.id,
          name: item.name,
          file: publicFile,
          prompt: item.imagePrompt,
          error: message,
        });
        return;
      }

      const delay = 1500 * 2 ** attempt;
      console.warn(`Retrying ${item.name} after error: ${message}`);
      await sleep(delay);
    }
  }

  const imageBase64 = response?.data?.[0]?.b64_json;

  if (!imageBase64) {
    console.warn(`No image payload returned for ${item.name}. Skipping.`);
    return;
  }

  await fs.writeFile(file, Buffer.from(imageBase64, "base64"));

  metadata.items.push({
    id: item.id,
    name: item.name,
    file: publicFile,
    prompt: item.imagePrompt,
    revisedPrompt: response.data?.[0]?.revised_prompt,
  });
}

for (let index = 0; index < selectedItems.length; index += concurrency) {
  const batch = selectedItems.slice(index, index + concurrency);
  await Promise.all(batch.map((item) => generateOne(item)));
}

await fs.writeFile(metadataPath, `${JSON.stringify(metadata, null, 2)}\n`);
console.log(`Wrote ${metadata.items.length} images and metadata to ${path.relative(rootDir, metadataPath)}.`);
