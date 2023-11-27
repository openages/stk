import { useUpdateEffect } from 'ahooks'

import createDeepCompareEffect from './createDeepCompareEffect'

export default createDeepCompareEffect(useUpdateEffect)
