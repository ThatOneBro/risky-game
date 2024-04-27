declare global {
  var Bun: typeof import('bun');
}

await Bun.build({
  entrypoints: ['./src/main.ts'],
  outdir: './dist',
  minify: true,
});

export type {};
