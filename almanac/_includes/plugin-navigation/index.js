const pathify = require('../../utils/pathify')

// const PLUGIN_TYPE = 'eleventy-navigation'
const PLUGIN_BUILD_ID = Math.random().toString(36).slice(2)
const ELEVENTY_BUILD_MODE = process.env.ELEVENTY_RUN_MODE === 'build'

const defaultInputPath = '/'

function defaultUrlFilter(url) {
  return url
}

function pathToTitle(path) {
  return String(path)
    .split('/')
    .filter((v) => v)
    .pop()
    .split(/\W+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const nodeNavigationCache = {}
function parseNodeNavigation(nodes = [], options = {}) {
  const cacheId = (options && options.cacheId) || PLUGIN_BUILD_ID
  const rootTitle = (options && options.rootTitle) || 'Navigation'
  const inputPath = (options && options.inputPath) || defaultInputPath
  const urlFilter = (options && options.urlFilter) || defaultUrlFilter

  if (ELEVENTY_BUILD_MODE && nodeNavigationCache[cacheId]) {
    return nodeNavigationCache[cacheId]
  }

  const navKeyMap = {
    '/': {
      key: '/',
      order: 1,
      // pluginType: PLUGIN_TYPE,
      title: rootTitle,
    },
  }

  for (let node of nodes) {
    if (
      node.data &&
      node.data.eleventyNavigation &&
      node.data.eleventyNavigation.order > 0
    ) {
      const currentKey = pathify(node.data.page.inputPath)
      const currentUrl = urlFilter(node.data.page.url)
      const currentDataTitle = node.data.title
      const currentParent = pathify(node.data.eleventyNavigation.parent || '')
      const currentOrder = node.data.eleventyNavigation.order
      const currentLink = node.data.eleventyNavigation.link
      const currentTitle = node.data.eleventyNavigation.title
      navKeyMap[currentKey] = {
        key: currentKey,
        parentKey: currentParent,
        order: currentOrder,
        // pluginType: PLUGIN_TYPE,
        url: currentLink || currentUrl,
        title: currentTitle || currentDataTitle || pathToTitle(currentKey),
        parent: null,
        next: null,
        prev: null,
      }
    }
  }

  for (let navKey in navKeyMap) {
    const navItem = navKeyMap[navKey]
    const navItemParentKey = navItem.parentKey
    const navItemParent = navKeyMap[navItemParentKey]
    if (navItemParentKey && navItemParent) {
      navKeyMap[navKey].parent = navKeyMap[navItemParentKey]
      navKeyMap[navItemParentKey].children =
        navKeyMap[navItemParentKey].children || []
      navKeyMap[navItemParentKey].children.push(navItem)
    }
  }

  // Sort all children
  for (let navFullKey in navKeyMap) {
    const navChildren = navKeyMap[navFullKey].children
    if (navChildren && navChildren.length > 0) {
      navKeyMap[navFullKey].children = navChildren.sort((a, b) => {
        if (
          Number.isFinite(a.order) &&
          Number.isFinite(b.order) &&
          a.order !== b.order
        ) {
          return a.order - b.order
        } else {
          return String(a).charCodeAt() - String(b).charCodeAt()
        }
      })
    }
  }

  // Link siblings
  for (let navFullKey in navKeyMap) {
    const navChildren = navKeyMap[navFullKey].children
    if (navChildren && navChildren.length) {
      for (
        let navChildIndex = 0;
        navChildIndex < navChildren.length;
        navChildIndex += 1
      ) {
        const navChild = navChildren[navChildIndex]
        if (navChildIndex > 0) {
          navChild.prev = navChildren[navChildIndex - 1]
        }
        if (navChildIndex + 1 < navChildren.length) {
          navChild.next = navChildren[navChildIndex + 1]
        }
      }
    }
    // TODO: Remove Children
  }

  const navList =
    (navKeyMap[inputPath] && navKeyMap[inputPath].children) ||
    (navKeyMap[defaultInputPath] && navKeyMap[defaultInputPath].children) ||
    []

  if (ELEVENTY_BUILD_MODE) {
    nodeNavigationCache[cacheId] = navList
  }

  return navList
}

function getNodeCurrent(parsedNodes = [], pageUrl = '') {
  if (!pageUrl) {
    return null
  }
  for (let node of parsedNodes) {
    if (node.url === pageUrl) {
      return node
    } else if (node.children) {
      const childCurrent = getNodeCurrent(node.children, pageUrl)
      if (childCurrent) {
        return childCurrent
      }
    }
  }
  return null
}

function getNodePath(parsedNodes = [], options = {}) {
  const inputPath = (options && options.inputPath) || defaultInputPath
  const pageUrl = (options && options.pageUrl) || defaultInputPath

  const nodePath = []
  let nodeCurrent = getNodeCurrent(parsedNodes, pageUrl)

  while (nodeCurrent && ![null, '', inputPath].includes(nodeCurrent.key)) {
    nodePath.unshift(nodeCurrent)
    nodeCurrent = nodeCurrent.parent
  }

  return nodePath
}

// export the configuration function for plugin
module.exports = function (eleventyConfig) {
  const inputPath = pathify(
    (eleventyConfig && eleventyConfig.dir && eleventyConfig.dir.input) ||
      defaultInputPath
  )
  const urlFilter = eleventyConfig.getFilter('url')
  eleventyConfig.addFilter('eleventyNavigation', function (nodes, cacheId) {
    return parseNodeNavigation(nodes, {
      cacheId,
      inputPath,
      urlFilter,
    })
  })
  eleventyConfig.addFilter('eleventyNavigationCurrent', getNodeCurrent)
  eleventyConfig.addFilter(
    'eleventyNavigationPath',
    function (parsedNodes, pageUrl) {
      return getNodePath(parsedNodes, {
        pageUrl,
        inputPath,
      })
    }
  )
}
