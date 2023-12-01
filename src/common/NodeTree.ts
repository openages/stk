import { get, flatMap, last, initial, find, reduceRight, flatten } from 'lodash-es'
import { makeAutoObservable, toJS } from 'mobx'

type RawNode = {
	id: string
	pid?: string
	prev_id?: string
	next_id?: string
	[key: string]: any
}

type RawNodes = Array<RawNode>
type TreeItem = RawNode & { children?: Tree }
type Tree = Array<TreeItem>
type TreeMap = Record<string, TreeItem>

type ArgsMove = {
	active_parent_index: Array<number>
	over_parent_index: Array<number>
	droppable: boolean
}

type ArgsPlace = {
	type: 'push' | 'insert'
	active_item: RawNode
	over_item?: RawNode
	target_level: RawNodes
	over_index?: number
}

export default class Index {
	tree = [] as Tree

	constructor() {
		makeAutoObservable(this, null, { autoBind: true })
	}

	public init(raw_nodes: RawNodes) {
		const raw_tree_map = this.getRawTreeMap(raw_nodes)
		const { tree, tree_map } = this.getTree(raw_nodes, raw_tree_map)

		this.tree = this.sortTree(tree, tree_map)
	}

	public insert(item: RawNode, focusing_index?: Array<number>) {
		const { target_level, cloned_item: over_item } = this.getDroppableItem(focusing_index)

		const { active_item, effect_items } = this.place({
			type: 'push',
			active_item: item,
			over_item,
			target_level
		})

		return { item: active_item, effect_items }
	}

	public remove(focusing_index: Array<number>) {
		const { cloned_item, effect_items } = this.take(focusing_index)

		let remove_items = [] as Tree

		if (cloned_item?.children?.length) {
			remove_items = this.getherItems(cloned_item.children)
		}

		return { id: cloned_item.id, remove_items, effect_items }
	}

	public update(focusing_index: Array<number>, data: Omit<RawNode, 'id'>) {
		const { item, target_level, target_index } = this.getItem(focusing_index)
		const target = { ...item, ...data }

		target_level[target_index] = target

		return target
	}

	public move(args: ArgsMove) {
		const { active_parent_index, over_parent_index, droppable } = args
		const effect_items = [] as RawNodes

		const { cloned_item: active_item } = this.getItem(active_parent_index)
		const { cloned_item: over_item, target_level } = droppable
			? this.getDroppableItem(over_parent_index)
			: this.getItem(over_parent_index)

		if (over_item.next_id === active_item.id && !droppable) {
			return { effect_items }
		}

		const swap = active_item.next_id === over_item.id && !droppable

		let execs = []

		const place = () => {
			const { effect_items } = this.place({
				type: droppable ? 'push' : 'insert',
				active_item,
				over_item,
				target_level,
				over_index: last(over_parent_index)
			})

			return effect_items
		}

		const take = () => {
			const { effect_items } = this.take(active_parent_index, swap)

			return effect_items
		}

		if (active_item.pid === over_item.pid) {
			if (last(active_parent_index) < last(over_parent_index)) {
				execs = [place, take]
			} else {
				execs = [take, place]
			}
		} else {
			if (active_parent_index.length > over_parent_index.length) {
				execs = [take, place]
			} else {
				execs = [place, take]
			}
		}

		const all_effect_items = flatten(execs.map(func => func()))

		return { effect_items: this.getUniqEffectItems(all_effect_items) }
	}

	public getItem(indexes: Array<number>) {
		let target_level = [] as Array<TreeItem>
		let target_index = 0
		let target_item = null as TreeItem

		const target_indexes = this.getIndexes(indexes)
		const level_indexes = initial(target_indexes)

		target_index = last(indexes)
		target_item = get(this.tree, target_indexes)

		if (!level_indexes.length) {
			target_level = this.tree
		} else {
			target_level = get(this.tree, level_indexes)
		}

		return {
			item: target_item,
			cloned_item: toJS(target_item),
			target_level,
			target_index
		}
	}

	private getDroppableItem(indexes: Array<number>) {
		if (!indexes.length) return { target_level: this.tree, cloned_item: null }

		let target_item = null as TreeItem
		let target_indexes = [] as Array<number | string>

		if (indexes.length === 1) {
			target_indexes = indexes
		} else {
			target_indexes = this.getIndexes(indexes)
		}

		target_item = get(this.tree, target_indexes)

		if (!target_item.children) {
			target_item.children = []
		}

		return { target_level: target_item.children, cloned_item: toJS(target_item) }
	}

	private getRawTreeMap(raw_nodes: RawNodes) {
		const tree_map = {} as TreeMap

		raw_nodes.map(item => {
			tree_map[item.id] = item
		})

		return tree_map
	}

	private getTree(raw_nodes: RawNodes, tree_map: TreeMap) {
		const tree = [] as Tree

		raw_nodes.forEach(item => {
			if (item.pid) {
				if (!tree_map[item.pid].children) {
					tree_map[item.pid].children = []
				}

				if (!tree_map[item.pid]?.children?.length) {
					tree_map[item.pid].children = [item]
				} else {
					tree_map[item.pid].children.push(item)
				}
			} else {
				tree.push(item)
			}
		})

		return { tree, tree_map }
	}

	private sortTree(tree: Tree, tree_map: TreeMap) {
		const target_tree = [] as Tree
		const start_node = find(tree, item => !item.prev_id)

		if (!start_node) return []

		let current = start_node.id

		while (current) {
			const item = tree_map[current]

			if (item?.children?.length) {
				item.children = this.sortTree(item.children, tree_map)
			}

			target_tree.push(item)

			current = item.next_id
		}

		return target_tree
	}

	private take(indexes: Array<number>, swap?: boolean) {
		const { cloned_item, target_level, target_index } = this.getItem(indexes)
		const effect_items = [] as Array<TreeItem>

		if (cloned_item.prev_id) {
			const prev_item = target_level[target_index - 1]

			prev_item.next_id = cloned_item.next_id ?? ''

			effect_items.push(toJS(prev_item))
		}

		if (cloned_item.next_id) {
			const next_item = target_level[target_index + 1]

			next_item.prev_id = cloned_item.prev_id ?? ''

			if (swap) next_item.next_id = cloned_item.id

			effect_items.push(toJS(next_item))
		}

		target_level.splice(target_index, 1)

		return { cloned_item, effect_items }
	}

	private place(args: ArgsPlace) {
		const { type, active_item, over_item, target_level, over_index } = args
		const effect_items = [] as RawNodes

		if (type === 'push') {
			active_item.pid = over_item ? over_item.id : ''

			if (target_level.length) {
				const last_item = last(target_level)

				last_item.next_id = active_item.id

				active_item.prev_id = last_item.id

				effect_items.push(toJS(last_item))
			} else {
				active_item.prev_id = undefined
			}

			active_item.next_id = undefined

			effect_items.push(toJS(active_item))
			target_level.push(active_item)
		} else {
			active_item.pid = over_item.pid

			active_item.prev_id = over_item.id
			active_item.next_id = over_item.next_id

			if (over_item.next_id) {
				const next_item = target_level[over_index + 1]

				next_item.prev_id = active_item.id

				effect_items.push(toJS(next_item))
			} else {
				active_item.next_id = undefined
			}

			if (active_item.next_id === over_item.id) {
				over_item.next_id = active_item.next_id
			} else {
				over_item.next_id = active_item.id
			}

			effect_items.push(toJS(active_item))
			effect_items.push(toJS(over_item))

			target_level.splice(over_index + 1, 0, active_item)
		}

		return { active_item, effect_items }
	}

	private getUniqEffectItems(effect_items: Tree) {
		return reduceRight(
			effect_items,
			(acc, curr) => {
				if (!acc.some(item => item['id'] === curr['id'])) {
					acc.unshift(curr)
				}

				return acc
			},
			[] as Tree
		)
	}

	private getIndexes(indexes: Array<number>) {
		return flatMap(indexes, (value, index) => {
			return index < indexes.length - 1 ? [value, 'children'] : [value]
		})
	}

	private getherItems(tree: Tree) {
		return tree.reduce((total, item) => {
			total.push(item)

			if (item?.children?.length) {
				total.push(...this.getherItems(item.children))
			}

			return total
		}, [] as Tree)
	}
}
