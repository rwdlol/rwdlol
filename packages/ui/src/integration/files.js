import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

export async function listFilesIn(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await listFilesIn(fullPath)));
    else files.push(fullPath);
  }
  return files;
}

export function createBuildFolder(outDir, base) {
  const cache = new Map();

  const urlToFile = (url) => {
    const pathOnly = decodeURIComponent(url.split(/[?#]/)[0]);
    return path.join(outDir, pathOnly.slice(base.length));
  };

  const fileToUrl = (file) => {
    const relative = path.relative(outDir, file).split(path.sep).join('/');
    return base + relative;
  };

  const read = async (file) => {
    if (!cache.has(file)) {
      const text = await readFile(file, 'utf8').catch(() => '');
      cache.set(file, text);
    }
    return cache.get(file);
  };

  return { outDir, urlToFile, fileToUrl, read };
}
