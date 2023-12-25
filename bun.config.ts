/// <reference types="bun-types" />

const modules = ['common', 'dnd', 'emittery', 'mobx', 'react', 'storage']

Bun.build({
	entrypoints: modules.map(item => `./src/${item}/index.ts`),
	outdir: './dist',
	target: 'browser',
	external: ['react', 'fast-equals', 'ahooks', 'mobx', 'lodash-es'],
	minify: true,
	splitting: true,
	format: 'esm',
	naming: '[dir]/[name].[ext]'
})
