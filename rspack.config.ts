// For dev (rspack show build error)

import { resolve } from 'path'

import { defineConfig } from '@rspack/cli'

const is_prod = process.env.NODE_ENV === 'production'

const name = 'graph'

module.exports = defineConfig({
	entry: {
		main: `./src/${name}/index.ts`
	},
	output: {
		clean: is_prod,
		path: resolve(__dirname, `dist/${name}`)
	},
	watchOptions: {
		ignored: /node_modules/
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		tsConfigPath: resolve(__dirname, 'tsconfig.json')
	},
	externals: [
		'react',
		'react-dom',
		'fast-equals',
		'ahooks',
		'mobx',
		'lodash-es',
		'scheduler',
		'@swc/helpers',
		'@antv/util'
	],
	experiments: {
		outputModule: true,
		rspackFuture: {}
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				type: 'javascript/auto',
				use: {
					loader: 'builtin:swc-loader',
					options: {
						sourceMap: !is_prod,
						isModule: true,
						jsc: {
							parser: {
								syntax: 'typescript',
								tsx: true,
								dynamicImport: true,
								exportDefaultFrom: true,
								exportNamespaceFrom: true,
								decorators: true
							},
							transform: {
								legacyDecorator: true,
								decoratorMetadata: true,
								react: {
									development: !is_prod,
									refresh: !is_prod,
									runtime: 'automatic',
									useBuiltins: true
								}
							},
							externalHelpers: true
						},
						env: {
							targets: 'chrome >= 120'
						}
					}
				}
			}
		]
	}
})
