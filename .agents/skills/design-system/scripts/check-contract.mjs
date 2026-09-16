#!/usr/bin/env node
import { createHash } from "node:crypto";
import { existsSync, readFileSync, realpathSync, statSync, writeFileSync } from "node:fs";
import { basename, dirname, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

export const HEADINGS = [
  "When to use",
  "When not to use",
  "Public API",
  "Behaviour and states",
  "Accessibility",
];

export const FORMATS = {
  component: HEADINGS,
  layout: ["When to use", "When not to use", "Public API", "Composition", "Accessibility"],
  pattern: ["When to use", "When not to use", "Structure", "Composition", "Verification"],
};

export function checkContract(markdown, { resolveLink = () => true, kind = "component" } = {}) {
  if (!Object.hasOwn(FORMATS, kind)) return [`unknown contract kind: ${kind}`];
  markdown = markdown.replaceAll("\r\n", "\n");
  const parsed = frontmatter(markdown);
  const problems = [...parsed.problems];
  markdown = withoutCode(parsed.body);

  const sections = splitSections(markdown);
  const headings = FORMATS[kind];
  if (sections.map((s) => s.heading).join("\n") !== headings.join("\n")) {
    problems.push(`H2 headings must be exactly, in order: ${headings.join(", ")}`);
  }
  for (const { heading, body } of sections) {
    if (body.trim() === "") problems.push(`section is empty: ${heading}`);
  }

  const whenToUse = sections.find((s) => s.heading === "When to use");
  if (whenToUse && !/\b(all|any)\b/i.test(whenToUse.body)) {
    problems.push("When to use must state whether all or any of its conditions must hold");
  }

  const composition = sections.find((s) => s.heading === "Composition");
  if (composition && !["Required", "Recommendations", "Exceptions"].every(
    (heading) => new RegExp(`^### ${heading}$`, "m").test(composition.body),
  )) {
    problems.push("Composition must contain the H3 subsections Required, Recommendations and Exceptions");
  }

  const accessibility = sections.find((s) => s.heading === "Accessibility");
  if (
    accessibility &&
    !(/^### Provided by the component$/m.test(accessibility.body) && /^### Required of consumers$/m.test(accessibility.body))
  ) {
    problems.push("Accessibility must contain the H3 subsections Provided by the component and Required of consumers");
  }

  for (const target of localLinks(withoutCode(`${parsed.metadata.description ?? ""}\n${markdown}`))) {
    if (!resolveLink(target)) problems.push(`relative link does not resolve: ${target}`);
  }
  return problems;
}

function splitSections(markdown) {
  const sections = [];
  let current = null;
  for (const line of markdown.split("\n")) {
    const h2 = line.match(/^## (.+)$/);
    if (h2) {
      current = { heading: h2[1].trim(), body: "" };
      sections.push(current);
    } else if (current) {
      current.body += line + "\n";
    }
  }
  return sections;
}

function localLinks(markdown) {
  const targets = [];
  for (const match of markdown.matchAll(/\[[^\]]*\]\(\s*(?:<([^>]+)>|([^\s)]+))(?:\s+"[^"]*")?\s*\)/g)) {
    const target = match[1] ?? match[2];
    if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(target)) continue;
    targets.push(target);
  }
  return targets;
}

function withoutCode(markdown) {
  let fence;
  return markdown.split("\n").map((line) => {
    const marker = line.match(/^\s*(`{3,}|~{3,})/);
    if (!fence && marker) { fence = marker[1]; return ""; }
    if (fence) {
      if (new RegExp(`^\\s*${fence[0]}{${fence.length},}\\s*$`).test(line)) fence = undefined;
      return "";
    }
    return line;
  }).join("\n");
}

const PATH_FIELDS = ["sources", "tests", "examples"];
const validId = (id) => typeof id === "string" && /^[a-zA-Z0-9][a-zA-Z0-9_-]*$/.test(id) && id !== "none";
const validPath = (path) => typeof path === "string" && path.length > 0
  && !/^(?:\/|[a-z][a-z0-9+.-]*:)/i.test(path)
  && !/[\\*?\[\]{}#\r\n]/.test(path)
  && path.split("/").every((part) => part && part !== "." && part !== "..");

function identityProblems({ id, status }) {
  return [
    ...(!validId(id) ? [`invalid contract id: ${id ?? "missing"}`] : []),
    ...(!["discoverable", "hidden", "deprecated"].includes(status) ? [`invalid status: ${status ?? "missing"}`] : []),
  ];
}

export function frontmatter(markdown) {
  markdown = markdown.replaceAll("\r\n", "\n");
  const match = markdown.match(/^---\n([\s\S]*?)\n---(?:\n|$)/);
  if (!match) return { metadata: {}, body: markdown, problems: ["missing frontmatter"] };
  const metadata = {};
  const problems = [];
  let field;
  // ponytail: flat YAML with two-space description blocks; use a YAML library if nested metadata is needed.
  const scalar = (value) => {
    if (value.startsWith('"')) return JSON.parse(value);
    if (value.startsWith("'")) {
      if (!/^'(?:[^']|'')*'$/.test(value)) throw new Error("invalid quoted string");
      return value.slice(1, -1).replaceAll("''", "'");
    }
    if (/^[!&*>{[|@`]|: | #/.test(value)) throw new Error("unsupported YAML scalar");
    return value;
  };
  const lines = match[1].split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim() || /^\s*#/.test(line)) continue;
    try {
      const item = line.match(/^  - (.+)$/);
      if (item && PATH_FIELDS.includes(field) && Array.isArray(metadata[field])) {
        metadata[field].push(scalar(item[1].trim()));
        continue;
      }
      const property = line.match(/^(id|description|status|sources|sourcesHash|tests|examples):(?:\s+(.*))?$/);
      if (!property) throw new Error("expected a supported field or two-space block list item");
      field = property[1];
      if (Object.hasOwn(metadata, field)) throw new Error(`duplicate frontmatter field: ${field}`);
      const value = property[2]?.trim() ?? "";
      if (field === "description" && [">-", "|-"].includes(value)) {
        const block = [];
        while (i + 1 < lines.length && (!lines[i + 1].trim() || lines[i + 1].startsWith("  "))) {
          block.push(lines[++i].slice(2));
        }
        while (block.at(-1) === "") block.pop();
        metadata[field] = block.map((line, index) => {
          if (index === block.length - 1) return line;
          const next = block[index + 1];
          const ordinary = line && !/^\s/.test(line);
          const nextOrdinary = next && !/^\s/.test(next);
          const separator = value === ">-" && ordinary
            ? (nextOrdinary ? " " : next === "" ? "" : "\n") : "\n";
          return line + separator;
        }).join("");
        continue;
      }
      if (field === "description" && /^(?:null|~|true|false|\[\]|[-+]?\d+(?:\.\d+)?)$/i.test(value)) {
        metadata[field] = null;
        continue;
      }
      metadata[field] = PATH_FIELDS.includes(field) && (value === "" || value === "[]") ? [] : scalar(value);
    } catch (error) { problems.push(`frontmatter: ${error.message}`); field = undefined; }
  }
  problems.push(...identityProblems(metadata));
  if (typeof metadata.description !== "string" || !metadata.description.trim()) {
    problems.push("description must be a nonempty string");
  }
  if (metadata.sourcesHash !== undefined && !/^[a-f0-9]{64}$/.test(metadata.sourcesHash)) {
    problems.push("sourcesHash must be a lowercase SHA-256 hex digest");
  }
  for (const key of PATH_FIELDS) {
    if (key !== "sources" && !Object.hasOwn(metadata, key)) continue;
    if (!Array.isArray(metadata[key])) problems.push(`${key} must be a list of paths`);
    else for (const path of metadata[key]) {
      if (!validPath(path)) problems.push(`invalid ${key} path: ${path}`);
    }
  }
  return { metadata, body: markdown.slice(match[0].length), problems };
}

function linkPath(dir, target) {
  return resolve(dir, decodeURIComponent(target.split("#")[0]));
}

function resolvesLink(file, target) {
  const [path, fragment] = target.split("#");
  const full = path ? linkPath(dirname(file), path) : file;
  if (!existsSync(full) || !statSync(full).isFile()) return false;
  if (!fragment) return true;
  const markdown = withoutCode(readFileSync(full, "utf8"));
  const anchors = [...markdown.matchAll(/<a id="([^"]+)"><\/a>/g)].map((m) => m[1]);
  for (const [, title] of markdown.matchAll(/^#{1,6} (.+)$/gm)) {
    anchors.push(title.toLowerCase().replace(/[^\p{L}\p{N}_ -]/gu, "").replaceAll(" ", "-"));
  }
  return anchors.includes(decodeURIComponent(fragment));
}

function projectRoot(file) {
  let dir = dirname(file);
  while (!existsSync(resolve(dir, "DESIGN.md"))) {
    if (dirname(dir) === dir) return undefined;
    dir = dirname(dir);
  }
  return dir;
}

function inventoryEntries(markdown) {
  const entries = [];
  let current;
  let field;
  for (const line of markdown.split("\n")) {
    const id = line.match(/^- \*\*(.*)\*\*\s*$/);
    if (id) {
      current = { name: id[1] };
      entries.push(current);
      field = undefined;
    } else if (/^\S/.test(line)) {
      current = undefined;
    } else if (current) {
      const property = line.match(/^  - (ID|Status|Description|Contract):\s*(.*)$/);
      if (property) {
        field = property[1];
        current[field] = property[2];
      } else if (/^  - /.test(line)) {
        field = undefined;
      } else if (field && line.trim()) {
        current[field] += ` ${line.trim()}`;
      }
    }
  }
  return entries;
}

export function checkContractFile(path, { inventoryPath, inventoryPaths = [], kind = "component", updateSourcesHash = false } = {}) {
  const file = resolve(path);
  const markdown = readFileSync(file, "utf8");
  const resolveLink = (target) => resolvesLink(file, target);
  const problems = checkContract(markdown, { kind, resolveLink });
  const root = projectRoot(file);
  if (!root) problems.push("cannot locate project root: missing DESIGN.md");
  else {
    if (!realpathSync(file).startsWith(realpathSync(root) + sep)) problems.push("contract file resolves outside project root");
    const location = relative(root, file).split(sep).join("/");
    const expected = `design-system/${kind}s/`;
    if (!location.startsWith(expected)) problems.push(`contract must be located in ${expected}`);
    const { metadata } = frontmatter(markdown);
    for (const field of PATH_FIELDS) for (const target of Array.isArray(metadata[field]) ? metadata[field] : []) {
      if (!validPath(target)) continue;
      const full = resolve(root, target);
      if (!existsSync(full) || !statSync(full).isFile() || !realpathSync(full).startsWith(realpathSync(root) + sep)) {
        problems.push(`${field} file does not resolve: ${target}`);
      }
    }
  }
  const indexes = [...new Set([...inventoryPaths, ...(inventoryPath ? [inventoryPath] : [])].map((p) => resolve(p)))];
  const ids = new Set();
  const paths = new Set();
  const addId = (id) => {
    if (ids.has(id)) problems.push(`duplicate inventory id: ${id}`);
    ids.add(id);
  };
  for (const index of indexes) {
    const text = readFileSync(index, "utf8");
    for (const entry of inventoryEntries(withoutCode(text))) {
      const context = `${index}: ${entry.name}`;
      for (const key of ["ID", "Status"]) if (entry[key] !== undefined) problems.push(`${context}: ${key} belongs in contract frontmatter`);
      if (!entry.Description?.trim()) problems.push(`${context}: missing Description`);
      const links = localLinks(entry.Contract ?? "");
      if (links.length !== 1) { problems.push(`${context}: Contract must contain one local Markdown link`); continue; }
      const target = linkPath(dirname(index), links[0]);
      if (!resolvesLink(index, links[0])) problems.push(`${context}: contract link does not resolve: ${links[0]}`);
      else {
        const result = frontmatter(readFileSync(target, "utf8"));
        problems.push(...result.problems.map((p) => `${context}: ${p}`));
        addId(result.metadata.id);
        if (result.metadata.status !== "discoverable") problems.push(`${context}: only discoverable contracts belong in indexes`);
        const group = basename(index) === "PATTERNS.md" ? "patterns" : basename(index) === "LAYOUTS.md" ? "layouts" : "components";
        const targetRoot = projectRoot(target);
        if (targetRoot && !relative(targetRoot, target).split(sep).join("/").startsWith(`design-system/${group}/`)) {
          problems.push(`${context}: indexed contract must be in design-system/${group}/`);
        }
      }
      if (paths.has(target)) problems.push(`duplicate inventory contract: ${target}`);
      paths.add(target);
    }
  }
  const { metadata } = frontmatter(markdown);
  if (indexes.length && metadata.status === "discoverable" && !paths.has(file)) problems.push("inventory has no entry for this contract");
  if (problems.length === 0 && metadata.sources.length > 0) {
    const sha256 = (value) => createHash("sha256").update(value).digest("hex");
    const sources = [...new Set(metadata.sources)].sort().map((path) => [path, sha256(readFileSync(resolve(root, path)))]);
    const hash = sha256(JSON.stringify(sources));
    if (updateSourcesHash) {
      const newline = markdown.includes("\r\n") ? "\r\n" : "\n";
      const updated = markdown.replace(/^---\r?\n[\s\S]*?\r?\n---(?=\r?\n|$)/, (block) =>
        metadata.sourcesHash === undefined
          ? block.replace(/^---\r?\n/, `---${newline}sourcesHash: ${hash}${newline}`)
          : block.replace(/^sourcesHash:[^\r\n]*/m, `sourcesHash: ${hash}`));
      if (updated !== markdown) writeFileSync(file, updated);
    } else if (metadata.sourcesHash !== hash) {
      problems.push(`contract review required: sourcesHash ${metadata.sourcesHash === undefined ? "is missing" : "does not match sources"}; after review, run --update-sources-hash`);
    }
  }
  return problems;
}

if (process.argv[1] && existsSync(process.argv[1]) && realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url))) {
  const args = process.argv.slice(2);
  const inventoryPaths = [];
  const files = [];
  let kind = "component";
  let updateSourcesHash = false;
  try {
    for (let i = 0; i < args.length; i++) {
      const arg = args[i];
      if (arg === "--inventory" || arg === "--kind") {
        const value = args[++i];
        if (!value || value.startsWith("--")) throw new Error(`${arg} requires a value`);
        if (arg === "--inventory") inventoryPaths.push(value);
        else kind = value;
      } else if (arg === "--update-sources-hash") {
        updateSourcesHash = true;
      } else if (arg.startsWith("--")) {
        throw new Error(`unknown option: ${arg}`);
      } else files.push(arg);
    }
    if (!Object.hasOwn(FORMATS, kind)) throw new Error(`unknown contract kind: ${kind}`);
    if (!files.length) throw new Error("no contract files supplied");
  } catch (error) {
    console.error(error.message);
    console.error("usage: check-contract [--inventory <index.md>]... [--kind component|layout|pattern] [--update-sources-hash] <contract.md> [...]");
    process.exit(2);
  }
  let failed = false;
  for (const file of files) {
    let problems;
    try {
      problems = checkContractFile(file, { inventoryPaths, kind, updateSourcesHash });
    } catch (error) {
      problems = [error.message];
    }
    if (problems.length === 0) console.log(`ok  ${file}`);
    else {
      failed = true;
      console.log(`FAIL ${file}`);
      for (const problem of problems) console.log(`  - ${problem}`);
    }
  }
  process.exit(failed ? 1 : 0);
}
