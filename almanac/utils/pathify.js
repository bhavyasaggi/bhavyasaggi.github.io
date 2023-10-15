const PATHIFY_BASE = 'http://xkcd.com'

function pathify(path) {
  const url = new URL(path, PATHIFY_BASE)
  const paths = String(url.pathname).toLowerCase().split('/')
  paths[paths.length - 1] = paths[paths.length - 1].split('.')[0]
  if (paths[paths.length - 1] === 'index') {
    paths[paths.length - 1] = ''
  }
  const pathString = paths.join('/') + '/'
  return pathString.replaceAll(/\/+/g, '/')
}

module.exports = pathify
