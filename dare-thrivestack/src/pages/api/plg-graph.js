import dataPlgNodes from '#/data/plg-nodes.json'
import dataPlgEdges from '#/data/plg-edges.json'

const MIN_COL_NODE_COUNT = 10

function getEdgesFromFilter(queryFilter) {
  const localEdges = []
  dataPlgEdges.forEach((dataPlgEdge) => {
    const isFiltered = Object.keys(queryFilter).every((queryFilterKey) => {
      const queryFilterValues = queryFilter[queryFilterKey] || []
      return (
        !queryFilterValues.length ||
        queryFilterValues.includes(dataPlgEdge[queryFilterKey])
      )
    })
    // console.log('##2: ', { isFiltered, dataPlgEdge })
    if (isFiltered) {
      localEdges.push(dataPlgEdge)
    }
  })
  return localEdges
}

function getNodesFromEdges(edges) {
  const localNodes = {
    tenant: new Set(),
    env: new Set(),
    wf: new Set(),
    feat: new Set(),
    cat: new Set(),
    cfg: new Set(),
    key: new Set(),
  }
  const localNodesKeys = Object.keys(localNodes)
  // Grab nodes from edges
  edges.forEach((localEdge) => {
    localNodesKeys.forEach((localNodeKey) => {
      localNodes[localNodeKey].add(localEdge[localNodeKey])
    })
  })
  // Add Extra 10 nodes
  // Sort
  // Fill complete node details
  localNodesKeys.forEach((localNodeKey) => {
    const extraNodeSet = new Set()
    dataPlgNodes[localNodeKey]
      .slice(0, MIN_COL_NODE_COUNT)
      .forEach(({ uuid }) => {
        if (!localNodes[localNodeKey].has(uuid)) {
          extraNodeSet.add(uuid)
        }
        localNodes[localNodeKey].add(uuid)
      })
    localNodes[localNodeKey] = [...localNodes[localNodeKey]]
      .sort()
      .map((localNodeValue) => {
        const nodeValue = dataPlgNodes[localNodeKey].find(
          ({ uuid }) => uuid === localNodeValue
        )
        return {
          ...(nodeValue || {}),
          active: !extraNodeSet.has(localNodeValue),
        }
      })
  })

  return localNodes
}

function getNodesFromFilter(queryFilter) {
  const localNodes = {
    tenant: [],
    env: [],
    wf: [],
    feat: [],
    cat: [],
    cfg: [],
    key: [],
  }
  Object.keys(localNodes).forEach((nodeKey) => {
    // TODO: Grab only till max-limit
    let countNodes = 0
    dataPlgNodes[nodeKey].forEach((node) => {
      const isFilterSatisfied =
        queryFilter[nodeKey] &&
        queryFilter[nodeKey].length &&
        queryFilter[nodeKey].includes(node.uuid)
      const isExtraSatisfied = countNodes < MIN_COL_NODE_COUNT
      if (isFilterSatisfied || isExtraSatisfied) {
        localNodes[nodeKey].push(node)
        countNodes += 1
      }
    })
    localNodes[nodeKey] = localNodes[nodeKey].sort(
      ({ uuid: a }, { uuid: b }) => {
        if (a > b) {
          return 1
        }
        if (a < b) {
          return -1
        }
        return 0
      }
    )
  })
  return localNodes
}

export default async function handler(req, res) {
  const localEdges = []
  const localNodes = {
    tenant: new Set(),
    env: new Set(),
    wf: new Set(),
    feat: new Set(),
    cat: new Set(),
    cfg: new Set(),
    key: new Set(),
  }
  let localEdgeCount = 0
  const localNodeCount = {
    tenant: 0,
    env: 0,
    wf: 0,
    feat: 0,
    cat: 0,
    cfg: 0,
    key: 0,
  }

  const {
    selectType,
    selectValue,
    tenant: queryTenant,
    env: queryEnv,
    wf: queryWf,
    feat: queryFeat,
    cat: queryCat,
    cfg: queryCfg,
    key: queryKey,
  } = req.query

  if (!queryTenant) {
    res.status(400).json({ error: 'Missing tenant' })
  }

  // Normalize QueryFilter
  const queryFilter = Object.entries({
    tenant: queryTenant,
    env: queryEnv,
    wf: queryWf,
    feat: queryFeat,
    cat: queryCat,
    cfg: queryCfg,
    key: queryKey,
  }).reduce((acc, [qKey, qValue]) => {
    acc[qKey] = (
      Array.isArray(qValue) ? qValue : String(qValue || '').split(',')
    ).filter((v) => v)
    return acc
  }, {})

  // Append Select to QueryFilter
  if (selectType) {
    queryFilter[selectType] = queryFilter[selectType] || []
    queryFilter[selectType].push(selectValue)
  }

  // Evaluate Edges: Mock DB calls to json store
  if (selectType) {
    localEdges.push(...getEdgesFromFilter(queryFilter))
    Object.assign(localNodes, getNodesFromEdges(localEdges))
  } else {
    Object.assign(localNodes, getNodesFromFilter(queryFilter))
  }

  // Set Total counts
  Object.keys(localNodeCount).forEach((countKey) => {
    localNodeCount[countKey] = dataPlgNodes[countKey].length
  })
  localEdgeCount = dataPlgEdges.length

  await new Promise((resolve) => {
    setTimeout(resolve, 1000 * (1 + Math.random()))
  })

  res.status(200).json({
    edges: localEdges,
    nodes: localNodes,
    edgeCount: localEdgeCount,
    nodeCount: localNodeCount,
  })
}
