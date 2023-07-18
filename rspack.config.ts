import { resolve } from 'path'

import { defineConfig } from '@rspack/cli'

module.exports = defineConfig({
      entry: './src/index.ts',
      output: {
            library: {
                  type:'commonjs'
            }
      },
	resolve: {
		alias: {
			'@': resolve(`${process.cwd()}/src`)
		}
	},
	devtool: false,
	externals: ['react', 'fast-equals'],
	watchOptions: {
		ignored: /node_modules/
	},
	cache: false,
	experiments: {
		incrementalRebuild: false
	},
	builtins: {
		decorator: {}
	}
})
