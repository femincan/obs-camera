await Bun.build({
  entrypoints: ['src/index.tsx'],
  outdir: 'dist',
  compile: {
    target: 'bun-darwin-arm64',
    outfile: 'server',
  },
  minify: true,
  sourcemap: false,
  bytecode: false,
});
