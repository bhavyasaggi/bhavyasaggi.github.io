import isEmpty from 'lodash/isEmpty'

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import useFetch from '../../../hooks/useFetch'

import {
  actionStatus,
  actionEdges,
  actionNodes,
  actionNodeCount,
  actionEdgeCount,
} from '../store'

function PlgVisualizerDataGraphWrapper({ children }) {
  return (
    <div className='position-absolute top-0 bottom-0 start-0 end-0 d-flex align-items-center justify-content-center bg-dark bg-opacity-75 z-3'>
      {children}
    </div>
  )
}

export default function PlgVisualizerDataGraph() {
  const status = useSelector((state) => state.plgVisualizer.status)

  const selectType = useSelector((state) => state.plgVisualizer.select.type)
  const selectValue = useSelector((state) => state.plgVisualizer.select.value)
  const {
    env: filterEnv,
    wf: filterWf,
    feat: filterFeat,
    cat: filterCat,
    cfg: filterCfg,
    key: filterKey,
  } = useSelector((state) => state.plgVisualizer.filter)

  const dispatch = useDispatch()

  const fetchEdgesCb = useFetch('/api/plg-graph')

  useEffect(() => {
    dispatch(actionStatus({ nodes: 0, edges: 0 }))

    const [fetch, abortController] = fetchEdgesCb()

    // TODO: Replace with complete URI from process.env
    const url = new URL('/api/plg-graph', window.location.origin)
    Object.entries({
      selectType,
      selectValue,
      tenant: 'fa33339f-ff66-4aa6-86d6-3de8a4230ce7',
      env: filterEnv,
      wf: filterWf,
      feat: filterFeat,
      cat: filterCat,
      cfg: filterCfg,
      key: filterKey,
    }).forEach(([keyName, keyValue]) => {
      if (
        typeof keyValue === 'object' ? !isEmpty(keyValue) : Boolean(keyValue)
      ) {
        url.searchParams.append(keyName, keyValue)
      }
    })
    fetch(url.toString())
      .then((res) => res.json())
      .then((data) => {
        // TODO: parse data
        dispatch(actionStatus({ nodes: 1, edges: 1 }))
        dispatch(actionEdges(data.edges))
        dispatch(actionNodes(data.nodes))
        dispatch(actionNodeCount(data.nodeCount))
        dispatch(actionEdgeCount(data.edgeCount))
      })
      .catch(() => {
        if (abortController.signal.aborted) {
          dispatch(actionStatus({ nodes: 0, edges: 0 }))
        } else {
          dispatch(actionStatus({ nodes: 2, edges: 2 }))
        }
      })

    return () => {
      abortController.abort()
    }
  }, [
    dispatch,
    selectType,
    selectValue,
    filterEnv,
    filterWf,
    filterFeat,
    filterCat,
    filterCfg,
    filterKey,
    fetchEdgesCb,
  ])

  if (status.nodes === 0 || status.edges === 0) {
    return <PlgVisualizerDataGraphWrapper>⏳</PlgVisualizerDataGraphWrapper>
  }
  if (status.nodes === 2 || status.edges === 2) {
    return <PlgVisualizerDataGraphWrapper>⚠️</PlgVisualizerDataGraphWrapper>
  }

  return null
}
