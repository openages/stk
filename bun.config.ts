/// <reference types="bun-types" />

const modules = ['common', 'dnd', 'emittery', 'mobx', 'react', 'storage', 'creep']

Bun.build({
	entrypoints: modules.map(item => `./src/${item}/index.ts`),
	outdir: './dist',
	target: 'browser',
	external: ['react', 'react-dom', 'fast-equals', 'ahooks', 'mobx', 'lodash-es', 'scheduler'],
	minify: true,
	splitting: true,
	format: 'esm',
	naming: '[dir]/[name].[ext]'
})
