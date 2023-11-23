import { get, flatMap, last, initial, cloneDeep, find } from 'lodash-es'

type RawNode = {
	id: string
	pid?: string
	prev_id?: string
	next_id?: string
	[key: string]: any
}

type RawNodes = Array<RawNode>
type RawMap = Map<string, RawNode>
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
	raw_map = new Map() as RawMap
	tree = [] as Tree

	public init(raw_nodes: RawNodes) {
		const raw_tree_map = this.setRawMap(raw_nodes)
		const { tree, tree_map } = this.getTree(raw_tree_map)

		this.tree = this.sortTree(tree, tree_map)
	}

	public insert(item: RawNode, focusing_index?: Array<number>) {
		this.raw_map.set(item.id, item)

		const { target_level } = this.getItem(focusing_index ?? [0])
		const { effect_items } = this.place({ type: 'push', active_item: item, target_level })

		return { item, effect_items }
	}

	public remove(focusing_index: Array<number>) {
		const { cloned_item, effect_items } = this.take(focusing_index)

		let remove_ids = [] as Array<string>

		this.raw_map.delete(cloned_item.id)

		if (cloned_item?.children?.length) {
			remove_ids = this.getherIds(cloned_item.children)

			remove_ids.map((id) => this.raw_map.delete(id))
		}

		return { id: cloned_item.id, remove_ids, effect_items }
	}

	public update(focusing_index: Array<number>, data: Omit<RawNode, 'id'>) {
		const { item, target_level, target_index } = this.getItem(focusing_index)
		const target = { ...item, ...data }

		target_level[target_index] = target

		this.raw_map.set(item.id, target)

		return target
	}

	public move(args: ArgsMove) {
		const { active_parent_index, over_parent_index, droppable } = args

		const effect_items = [] as RawNodes

		const { cloned_item: active_item, effect_items: take_effect_items } = this.take(active_parent_index)
		const { cloned_item: over_item, target_level } = this.getItem(over_parent_index)

		effect_items.push(...take_effect_items)

		const { effect_items: place_effect_items } = this.place({
			type: droppable ? 'push' : 'insert',
			active_item,
			over_item,
			target_level,
			over_index: last(over_parent_index)
		})

		effect_items.push(...place_effect_items)

		effect_items.map((item) => this.raw_map.set(item.id, item))

		return { effect_items }
	}

	private setRawMap(raw_nodes: RawNodes) {
		const tree_map = {} as TreeMap

		raw_nodes.map((item) => {
			this.raw_map.set(item.id, item)

			tree_map[item.id] = item
		})

		return tree_map
	}

	private getTree(tree_map: TreeMap) {
		const tree = [] as Tree

		this.raw_map.forEach((item) => {
			if (item.pid) {
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
		const _tree = [] as Tree
		const start_node = find(tree, (item) => !item.prev_id)

		let current = start_node.id

		while (current) {
			const item = tree_map[current]

			if (item?.children?.length) {
				item.children = this.sortTree(item.children, tree_map)
			}

			_tree.push(item)

			current = start_node.next_id
		}

		return _tree
	}

	private take(indexes: Array<number>) {
		const { cloned_item, target_level, target_index } = this.getItem(indexes)
		const effect_items = [] as Array<TreeItem>

		if (cloned_item.prev_id) {
			const prev_item = target_level[target_index - 1]

			prev_item.next_id = cloned_item.next_id ?? ''

			effect_items.push(prev_item)
		}

		if (cloned_item.next_id) {
			const next_item = target_level[target_index + 1]

			next_item.prev_id = cloned_item.prev_id ?? ''

			effect_items.push(next_item)
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

				if (over_item) {
					last_item.next_id = over_item.id
				}

				active_item.prev_id = last_item.id

				effect_items.push(last_item)
			}

			effect_items.push(active_item)
			target_level.push(active_item)

			return { active_item, effect_items }
		} else {
			active_item.pid = over_item.pid

			if (over_item.next_id) {
				const next_item = target_level[over_index + 1]

				active_item.next_id = next_item.id
				next_item.prev_id = active_item.id

				effect_items.push(next_item)
			}

			active_item.prev_id = over_item.id
			over_item.next_id = active_item.id

			effect_items.push(active_item)
			target_level.splice(over_index, 0, active_item)
		}
	}

	private getItem(indexes: Array<number>) {
		let target_level = [] as Array<TreeItem>
		let target_index = 0

		if (indexes.length === 1) {
			target_level = this.tree
			target_index = indexes[0]
		} else {
			const level_indexes = initial(indexes)

			target_level = get(
				this.tree,
				flatMap(level_indexes, (item) => [item, 'children'])
			).children as Tree

			target_index = last(indexes)
		}

		return {
			item: target_level[target_index],
			cloned_item: cloneDeep(target_level[target_index]),
			target_level,
			target_index
		}
	}

	private getherIds(tree: Tree) {
		return tree.reduce((total, item) => {
			total.push(item.id)

			if (item?.children?.length) {
				total.push(...this.getherIds(item.children))
			}

			return total
		}, [] as Array<string>)
	}
}
