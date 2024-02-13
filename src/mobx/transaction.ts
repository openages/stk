import { runInAction } from 'mobx'

export default (_target: any, _methodName: string, descriptor: PropertyDescriptor) => {
	const func = descriptor.value

	descriptor.value = async function (...args: any[]) {
		if (func.constructor === Promise) {
			return runInAction(async () => {
				const result = await (func as any).apply(this, args)

				return result
			})
		} else {
			return runInAction(() => {
				const result = func.apply(this, args)

				return result
			})
		}
	}

	return descriptor
}
