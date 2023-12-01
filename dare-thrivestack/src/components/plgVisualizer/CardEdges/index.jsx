import debounce from 'lodash/debounce'

import React, { useCallback, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import Xarrow from 'react-xarrows'

const cols = ['env', 'wf', 'feat', 'cat', 'cfg', 'key']

export default function PlgVisualizerCardEdges() {
  const [edgesParams, setEdgesParams] = useState([])

  const edges = useSelector((state) => state.plgVisualizer.edges)

  const updateLines = useCallback((edgesArg = []) => {
    const localEdgesParams = []
    edgesArg.forEach((edge) => {
      const randomColor = `#${Math.random().toString(16).slice(2, 8)}`
      cols.slice(0, -1).forEach((col, colIdx) => {
        //
        const queryStart = `[data-card="plg"][data-type="${col}"][data-uuid="${edge[col]}"]`
        const domStart = document.querySelector(queryStart)
        domStart.id = queryStart
        //
        const queryEnd = `[data-card="plg"][data-type="${
          cols[colIdx + 1]
        }"][data-uuid="${edge[cols[colIdx + 1]]}"]`
        const domEnd = document.querySelector(queryEnd)
        domEnd.id = queryEnd
        //
        if (domStart && domEnd) {
          localEdgesParams.push({
            start: queryStart,
            end: queryEnd,
            color: randomColor,
          })
        }
      })
    })

    setEdgesParams(localEdgesParams)
  }, [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateLinesDebounced = useCallback(debounce(updateLines, 300), [
    updateLines,
  ])

  useEffect(() => {
    updateLinesDebounced(edges)
  }, [edges, updateLinesDebounced])

  return (
    <>
      {edgesParams.map(({ start, end, color }, idx) => (
        <Xarrow
          key={idx}
          start={start}
          end={end}
          color={color}
          strokeWidth={2}
          headSize={3}
          tailSize={3}
        />
      ))}
    </>
  )
}
