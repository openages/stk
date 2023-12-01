/// <reference types="bun-types" />

Bun.build({
	entrypoints: ['./src/index.ts'],
	outdir: './dist',
	target: 'browser',
	external: ['react', 'fast-equals', 'ahooks', 'mobx', 'lodash-es'],
	minify: true
})
