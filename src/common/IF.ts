interface Args {
	condition: boolean | undefined | null
	If: () => any
	Else?: () => any
}

export default (args: Args) => {
	const { condition, If, Else } = args

	return condition ? If() : Else?.()
}
