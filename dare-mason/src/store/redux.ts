import { configureStore } from '@reduxjs/toolkit'
import {
  useDispatch,
  useSelector,
  useStore,
  type TypedUseSelectorHook,
} from 'react-redux'

import sliceDocumentSelector from './sliceDocumentSelector'

export const makeStore = () => {
  return configureStore({
    reducer: {
      [sliceDocumentSelector.reducerPath]: sliceDocumentSelector.reducer,
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppStore: () => AppStore = useStore
