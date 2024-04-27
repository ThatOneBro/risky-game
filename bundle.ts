/**
 * NOTE: This file is currently unused but is here in case we may want to use it in the future...
 */

import { cpSync, rmdirSync, unlinkSync } from 'node:fs';
import path from 'node:path';

declare global {
  var Bun: typeof import('bun');
}

rmdirSync('./dist', { recursive: true });

const entrypoints = ['./src/main.ts'];

const result = await Bun.build({
  entrypoints,
  outdir: './dist',
  minify: true,
});

const mainArtifactPath = result.outputs?.[0]?.path;
if (!mainArtifactPath) {
  throw new Error('Something went wrong with the build -- no path for artifact');
}

const mainFile = Bun.file(mainArtifactPath);
const finalMainPath = mainArtifactPath.replace('main', `main-${Bun.hash(await mainFile.text()).toString(16)}`);
await Bun.write(finalMainPath, mainFile);
unlinkSync(mainArtifactPath);

const sourceIndexFile = Bun.file(new URL('./index.html', import.meta.url));
const sourceContents = await sourceIndexFile.text();

const finalSource = sourceContents.replaceAll(
  './src/main.ts',
  `/${path.relative(path.join(import.meta.dir, 'dist'), finalMainPath)}`
);

await Bun.write(new URL(`./dist/index-${Bun.hash(finalSource).toString(16)}.html`, import.meta.url), finalSource);
cpSync(path.resolve(import.meta.dir, 'public'), path.resolve(import.meta.dir, 'dist'), { recursive: true });
