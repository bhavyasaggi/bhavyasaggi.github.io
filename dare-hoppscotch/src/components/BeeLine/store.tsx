/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

interface initialStateType {
  groupBy: 'status' | 'labels' | 'priority' | 'assignee' | ''
  progress: number
}

const initialState: initialStateType = {
  groupBy: '',
  progress: 0,
}

export const beeLineSlice = createSlice({
  name: 'beeline',
  initialState,
  reducers: {
    setGroupBy: (
      state,
      action: { payload: initialStateType['groupBy']; type: any }
    ) => {
      state.groupBy = action.payload
    },
    setProgress: (
      state,
      action: { payload: initialStateType['progress']; type: any }
    ) => {
      state.progress = action.payload
    },
  },
})

export const { setGroupBy: actionGroupBy, setProgress: actionProgress } =
  beeLineSlice.actions

export default beeLineSlice.reducer
