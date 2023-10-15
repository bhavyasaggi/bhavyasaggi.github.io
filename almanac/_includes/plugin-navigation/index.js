const pathify = require('../../utils/pathify')

const PLUGIN_TYPE = 'eleventy-navigation'

function defaultParentKey(key) {
  return (
    String(key)
      .split('/')
      .filter((v) => v)
      .slice(0, -1)
      .join('/') + '/'
  ).replaceAll(/\/+/g, '/')
}

const defaultInputPath = '/'

function defaultUrlFilter(url) {
  return url
}

function pathToTitle(path) {
  return String(path)
    .split('/')
    .filter((v) => v)
    .pop()
}

function fillKeyMap(keyMap, key) {
  if (!key || key === '/') {
    return keyMap
  }
  const parentKey = pathify(defaultParentKey(key))
  keyMap[key] = keyMap[key] || {
    key,
    parentKey,
    order: 1,
    pluginType: PLUGIN_TYPE,
    title: pathToTitle(key),
  }
  return fillKeyMap(parentKey)
}

function findNavigationEntries(nodes = [], options = {}) {
  const inputPath = (options && options.inputPath) || defaultInputPath
  const urlFilter = (options && options.urlFilter) || defaultUrlFilter

  const navKeyMap = {
    '/': {
      key: '/',
      order: 1,
      pluginType: PLUGIN_TYPE,
      title: 'Root',
    },
  }

  const rootNav = { key: '/', children: [navKeyMap['/']] }

  for (let node of nodes) {
    if (
      node.data &&
      node.data.eleventyNavigation &&
      node.data.eleventyNavigation.order > 0
    ) {
      const currentKey = pathify(node.data.page.inputPath)
      const currentUrl = urlFilter(node.data.page.url)
      const currentDataTitle = node.data.title
      const currentParent = pathify(
        node.data.eleventyNavigation.parent || defaultParentKey(currentKey)
      )
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
      fillKeyMap(navKeyMap, currentParent)
    }
  }

  for (let navKey in navKeyMap) {
    const navItem = navKeyMap[navKey]
    const navItemParentKey = navItem.parentKey
    const navItemParent = navKeyMap[navItemParentKey]
    if (navItemParentKey && navItemParent) {
      navKeyMap[navItemParentKey].children =
        navKeyMap[navItemParentKey].children || []
      navKeyMap[navItemParentKey].children.push(navItem)
    } else {
      // TODO: Add missing parent-chain to root
      // rootNav.children.push(navItem)
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

  const navList =
    (navKeyMap[inputPath] && navKeyMap[inputPath].children) ||
    (navKeyMap[defaultInputPath] && navKeyMap[defaultInputPath].children) ||
    rootNav.children
  return navList
}

function getUrlFilter(eleventyConfig) {
  // eleventyConfig.pathPrefix was first available in Eleventy 2.0.0-canary.15
  // And in Eleventy 2.0.0-canary.15 we recommend the a built-in transform for pathPrefix
  if (eleventyConfig.pathPrefix !== undefined) {
    return function (url) {
      return url
    }
  }

  if ('getFilter' in eleventyConfig) {
    // v0.10.0 and above
    return eleventyConfig.getFilter('url')
  } else if ('nunjucksFilters' in eleventyConfig) {
    // backwards compat, hardcoded key
    return eleventyConfig.nunjucksFilters.url
  } else {
    // Theoretically we could just move on here with a `url => url` but then `pathPrefix`
    // would not work and it wouldn’t be obvious why—so let’s fail loudly to avoid that.
    throw new Error(
      'Could not find a `url` filter for the eleventy-navigation plugin in eleventyNavigationToHtml filter.'
    )
  }
}

// export the configuration function for plugin
module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter('eleventyNavigation', function (nodes) {
    return findNavigationEntries(nodes, {
      inputPath:
        (eleventyConfig && eleventyConfig.dir && eleventyConfig.dir.input) ||
        defaultInputPath,
      urlFilter: getUrlFilter(eleventyConfig),
    })
  })
}
