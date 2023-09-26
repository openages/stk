import { resolve } from 'path'

import { defineConfig } from '@rspack/cli'

const is_prod = process.env.NODE_ENV === 'production'

module.exports = defineConfig({
	entry: './src/index.ts',
	output: {
		clean: is_prod,
		library: {
			type: 'commonjs'
		}
	},
	resolve: {
		alias: {
			'@': resolve(`${process.cwd()}/src`)
		}
	},
	devtool: false,
	externals: ['react', 'fast-equals', 'ahooks', 'mobx', 'lodash-es'],
	watchOptions: {
		ignored: /node_modules/
	},
	optimization: {
		// minimize: false
	},
	experiments: {
		incrementalRebuild: true
	},
	builtins: {
		decorator: {}
	}
})
