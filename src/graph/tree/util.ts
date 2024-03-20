export const getHeight = (prev_node: any, current_node: any, align: 'center' | undefined, height_field = 'height') => {
	return align === 'center' ? (prev_node[height_field] + current_node[height_field]) / 2 : prev_node.height
}
