// Runs after both Vite builds: renders App to HTML and puts it inside <div id="root"> in dist/index.html,
// so crawlers and link previewers get the full page text without running JavaScript.
import { readFile, rm, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const indexPath = path.join(root, "dist", "index.html");
const ssrDir = path.join(root, "dist-ssr");

const { render } = await import(pathToFileURL(path.join(ssrDir, "entry-server.js")).href);
const template = await readFile(indexPath, "utf8");

const placeholder = '<div id="root"></div>';
if (!template.includes(placeholder)) throw new Error(`${placeholder} not found in dist/index.html`);

await writeFile(indexPath, template.replace(placeholder, () => `<div id="root">${render()}</div>`));
await rm(ssrDir, { recursive: true, force: true });
console.log("Pre-rendered dist/index.html");
