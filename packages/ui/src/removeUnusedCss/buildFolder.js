import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

export async function listAllFilesIn(folder) {
  const entries = await readdir(folder, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(folder, entry.name);
    if (entry.isDirectory()) {
      const filesInside = await listAllFilesIn(fullPath);
      files.push(...filesInside);
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

export function openBuildFolder(outDir, base) {
  const alreadyRead = new Map();

  function urlToFile(url) {
    const urlWithoutQuery = url.split(/[?#]/)[0];
    const pathOnly = decodeURIComponent(urlWithoutQuery);
    return path.join(outDir, pathOnly.slice(base.length));
  }

  function fileToUrl(file) {
    const relative = path.relative(outDir, file).split(path.sep).join("/");
    return base + relative;
  }

  async function readText(file) {
    if (!alreadyRead.has(file)) {
      const text = await readFile(file, "utf8").catch(() => "");
      alreadyRead.set(file, text);
    }
    return alreadyRead.get(file);
  }

  return { outDir, urlToFile, fileToUrl, readText };
}
