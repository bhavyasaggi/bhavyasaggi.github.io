const pathify = require('../../utils/pathify')

const PLUGIN_TYPE = 'eleventy-navigation'

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

function parseNodeNavigation(nodes = [], options = {}) {
  const rootTitle = (options && options.rootTitle) || 'Navigation'
  const inputPath = (options && options.inputPath) || defaultInputPath
  const urlFilter = (options && options.urlFilter) || defaultUrlFilter

  const navKeyMap = {
    '/': {
      key: '/',
      order: 1,
      pluginType: PLUGIN_TYPE,
      title: rootTitle,
    },
  }

  const rootNav = navKeyMap['/']

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
        pluginType: PLUGIN_TYPE,
        url: currentLink || currentUrl,
        title: currentTitle || pathToTitle(currentKey) || currentDataTitle,
      }
    }
  }

  for (let navKey in navKeyMap) {
    const navItem = navKeyMap[navKey]
    const navItemParentKey = navItem.parentKey
    const navItemParent = navKeyMap[navItemParentKey]
    if (navItemParentKey && navItemParent) {
      // navKeyMap[navKey].parent = navKeyMap[navItemParentKey]
      navKeyMap[navItemParentKey].children =
        navKeyMap[navItemParentKey].children || []
      navKeyMap[navItemParentKey].children.push(navItem)
    }
  }

  for (let navFullKey in navKeyMap) {
    const navChildren = navKeyMap[navFullKey].children
    if (navChildren && navChildren.length > 0) {
      navKeyMap[navFullKey].children = navChildren.sort((a, b) => {
        if (Number.isFinite(a.order) && Number.isFinite(b.order)) {
          return a.order - b.order
        } else {
          return String(a).charCodeAt() - String(b).charCodeAt()
        }
      })
    }
  }

  const rootPathKey = pathify(inputPath)

  const navList =
    (navKeyMap[rootPathKey] && navKeyMap[rootPathKey].children) ||
    (navKeyMap[defaultInputPath] && navKeyMap[defaultInputPath].children) ||
    rootNav.children ||
    []

  return navList
}

// export the configuration function for plugin
module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter('eleventyNavigation', function (nodes) {
    return parseNodeNavigation(nodes, {
      inputPath:
        (eleventyConfig && eleventyConfig.dir && eleventyConfig.dir.input) ||
        defaultInputPath,
      urlFilter: eleventyConfig.getFilter('url'),
    })
  })
}
