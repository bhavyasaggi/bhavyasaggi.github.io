import { configureStore } from '@reduxjs/toolkit'

import plgVisualizer from '../components/PlgVisualizer/store'

const reducer = {
  plgVisualizer,
}

export const store = configureStore({
  reducer,
})

export default reducer
