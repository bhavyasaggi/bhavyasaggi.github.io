import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface DocumentSelectorState {
  searchFromFilter: string | undefined
  searchToFilter: string | undefined
  templateFilter: Record<string, boolean | undefined>
  locationFilter: Record<string, boolean | undefined>
  subsidiaryFilter: Record<string, boolean | undefined>
  seniorityFilter: Record<string, boolean | undefined>
  selection: Record<string, boolean | undefined>
}

const initialState: DocumentSelectorState = {
  searchFromFilter: '',
  searchToFilter: '',
  templateFilter: {},
  locationFilter: {},
  subsidiaryFilter: {},
  seniorityFilter: {},
  selection: {},
}

const DocumentSelectorSlice = createSlice({
  name: 'documentSelector',
  initialState,
  reducers: {
    setFromSearch(state, action: PayloadAction<string>) {
      state.searchFromFilter = action.payload
    },
    setToSearch(state, action: PayloadAction<string>) {
      state.searchToFilter = action.payload
    },
    setSelection(
      state,
      action: PayloadAction<{
        ids: Array<string>
        value?: boolean | undefined
      }>
    ) {
      const { ids, value } = action.payload
      ids.map((selectionId) => {
        if (typeof value === 'undefined') {
          if (state.selection[selectionId]) {
            delete state.selection[selectionId]
          } else {
            state.selection[selectionId] = true
          }
        } else {
          if (value) {
            state.selection[selectionId] = true
          } else {
            delete state.selection[selectionId]
          }
        }
      })
    },
    setFilter(
      state,
      action: PayloadAction<{
        type: keyof Omit<
          DocumentSelectorState,
          'searchFromFilter' | 'searchToFilter'
        >
        values: Array<string>
      }>
    ) {
      const { type, values } = action.payload
      state[type] = values.reduce(
        (acc, key) => {
          acc[key] = true
          return acc
        },
        {} as Record<string, boolean>
      )
    },
  },
})

export const {
  setFromSearch: actionSetFromSearch,
  setToSearch: actionSetToSearch,
  setSelection: actionSetSelection,
  setFilter: actionSetFilter,
} = DocumentSelectorSlice.actions
export default DocumentSelectorSlice
