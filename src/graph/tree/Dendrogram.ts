import { mix } from '@antv/util'

import { dendrogam, layout, Tree } from './layout'

import type { Node, Options } from './types'

class Index extends Tree {
	execute() {
		return layout(this.rootNode, this.options, dendrogam)
	}
}

export default (root: Node, options: Options) => {
	return new Index(root, mix({} as any, {}, options)).execute()
}
