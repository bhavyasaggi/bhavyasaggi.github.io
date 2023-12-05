/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  select: {
    type: '',
    value: '',
  },
  status: {
    // 0: Loading
    // 1: Done
    // 2: Error
    nodes: 0,
    edges: 0,
  },
  filter: { env: [], wf: [], feat: [], cat: [], cfg: [], key: [] },
  nodes: { env: [], wf: [], feat: [], cat: [], cfg: [], key: [] },
  edges: [],
  nodeCount: { env: 0, wf: 0, feat: 0, cat: 0, cfg: 0, key: 0 },
  edgecount: 0,
}

const initialStateKeysStatus = Object.keys(initialState.status)
const initialStateKeysFilter = Object.keys(initialState.filter)
const initialStateKeysNodes = Object.keys(initialState.nodes)
const initialStateKeysNodeCount = Object.keys(initialState.nodeCount)

export const plgVisualizerSlice = createSlice({
  name: 'plgVisualizer',
  initialState,
  reducers: {
    toggleSelect: (state, action = '') => {
      const { type: pType, value: pValue } = action.payload || {}
      const { type: sType, value: sValue } = state.select || {}
      if (pType === sType && pValue === sValue) {
        state.select = JSON.parse(JSON.stringify(initialState.select))
      } else {
        state.select = action.payload
      }
    },
    setStatus: (state, action = initialState.status) => {
      const actionPayload = action.payload || {}
      Object.keys(actionPayload).forEach((pKey) => {
        if (
          Object.prototype.hasOwnProperty.call(actionPayload, pKey) &&
          initialStateKeysStatus.includes(pKey)
        ) {
          state.status[pKey] = actionPayload[pKey]
        }
      })
    },
    toggleFilter: (state, action = initialState.filter) => {
      const actionPayload = action.payload || {}
      Object.keys(actionPayload).forEach((pKey) => {
        if (
          Object.prototype.hasOwnProperty.call(actionPayload, pKey) &&
          initialStateKeysFilter.includes(pKey)
        ) {
          const pValue = actionPayload[pKey]
          const filterSet = new Set(state.filter[pKey] || [])
          if (pValue === null) {
            filterSet.clear()
          } else if (filterSet.has(pValue)) {
            filterSet.delete(pValue)
          } else {
            filterSet.add(pValue)
          }

          state.filter[pKey] = [...filterSet].sort()

          const filterForSelectType = state.filter[state.select.type]
          // No Filter for SelectType: !filterForSelectType.length
          // Filter for SelectType but without SelectValue: filterForSelectType.length && filterForSelectType.includes(state.select.value)
          // Filter for SelectType with SelectValue: filterForSelecType.length && !filterForSelectType.includes(state.select.value)
          if (
            filterForSelectType &&
            filterForSelectType.length &&
            !filterForSelectType.includes(state.select.value)
          ) {
            state.select = JSON.parse(JSON.stringify(initialState.select))
          }
        }
      })
    },
    setNodes: (state, action = initialState.nodes) => {
      const actionPayload = action.payload || {}
      Object.keys(actionPayload).forEach((pKey) => {
        if (
          Object.prototype.hasOwnProperty.call(actionPayload, pKey) &&
          initialStateKeysNodes.includes(pKey)
        ) {
          state.nodes[pKey] = actionPayload[pKey]
        }
      })
    },
    setEdges: (state, action = initialState.edges) => {
      const dataEdges = action.payload
      state.edges = dataEdges
    },
    setNodeCount: (state, action = initialState.nodeCount) => {
      const actionPayload = action.payload || {}
      Object.keys(actionPayload).forEach((pKey) => {
        if (
          Object.prototype.hasOwnProperty.call(actionPayload, pKey) &&
          initialStateKeysNodeCount.includes(pKey)
        ) {
          state.nodeCount[pKey] = actionPayload[pKey]
        }
      })
    },
    setEdgeCount: (state, action = 0) => {
      state.edgecount = action
    },
  },
})

export const {
  setEdgeCount: actionEdgeCount,
  setNodeCount: actionNodeCount,
  setEdges: actionEdges,
  setNodes: actionNodes,
  setStatus: actionStatus,
  toggleSelect: actionSelect,
  toggleFilter: actionFilter,
} = plgVisualizerSlice.actions

export default plgVisualizerSlice.reducer
