export default <T>(arr: Array<T>, index: number, sort_key?: string): { item: T; sort: number } => {
	const sort = sort_key || 'sort'

	const prev_item = index - 1 >= 0 ? arr.at(index - 1) : null
	const next_item = arr.at(index + 1)

	let sort_value = 0

	if (prev_item && next_item) {
		sort_value = parseFloat(((prev_item[sort] + next_item[sort]) / 2).toFixed(3))
	}

	if (!prev_item && next_item) {
		sort_value = parseFloat((next_item[sort] / 2).toFixed(3))
	}

	if (prev_item && !next_item) {
		sort_value = prev_item[sort] + 1
	}

	arr[index][sort] = sort_value

	return { item: arr[index], sort: sort_value }
}
