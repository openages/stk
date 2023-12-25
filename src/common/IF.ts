interface Args {
	condition: boolean | undefined | null
	If: () => any
	Else?: () => any
}

export default <IF_RETURN = any, ELSE_RETURN = any>(args: Args) => {
	const { condition, If, Else } = args

	return condition ? (If() as IF_RETURN) : (Else?.() as ELSE_RETURN)
}
