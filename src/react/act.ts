import { reaction } from 'mobx'

import type { IReactionPublic, IReactionDisposer } from 'mobx'

type TFunction = (target: any, effect: (arg: any, prev: any, r: IReactionPublic) => void) => IReactionDisposer

const Index: TFunction = (target, effect) => {
	return reaction(() => target, effect)
}

export default Index
