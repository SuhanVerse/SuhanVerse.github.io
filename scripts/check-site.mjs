import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
const file = resolve("src/index.html");
const html = readFileSync(file, "utf8");
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
const errors = [];
if (new Set(ids).size !== ids.length) errors.push("Duplicate element IDs");
for (const [, value] of html.matchAll(/(?:href|src|srcset)="([^"]+)"/g)) {
  if (value.startsWith("#") && value.length > 1 && !ids.includes(value.slice(1))) errors.push(`Missing anchor: ${value}`);
  if (value.startsWith("./") && !existsSync(resolve(dirname(file), value))) errors.push(`Missing asset: ${value}`);
}
if (errors.length) { console.error(errors.join("\n")); process.exitCode = 1; }
else console.log("Section links, local assets, and element IDs checked.");
