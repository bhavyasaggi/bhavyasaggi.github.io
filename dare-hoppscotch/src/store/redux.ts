import { configureStore } from '@reduxjs/toolkit'

import beeLineSliceReducer from '@/components/BeeLine/store'

const reducer = {
  beeLineSliceReducer,
}

export const store = configureStore({
  reducer,
})

export default reducer
