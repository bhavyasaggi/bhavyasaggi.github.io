const fs = require('node:fs')

const data = require('../data/plg-nodes.json')

const sample = {
  tenant: [
    {
      id: '656ccfafb01e8ec0caf343f6',
      name: 'Halap',
    },
  ],
  env: [
    {
      id: '656ccfaf2dffff7a10ca5146',
      name: 'Mixers',
    },
    {
      id: '656ccfaf5afcf33ee4b6c6b8',
      name: 'Memora',
    },
  ],
  wf: [
    {
      id: '656ccfafb73a46cc29c234cd',
      name: 'Norsup',
    },
    {
      id: '656ccfafaea3c7367f9218d0',
      name: 'Acumentor',
    },
    {
      id: '656ccfaf09bb623439e1d48f',
      name: 'Optyk',
    },
  ],
  feat: [
    {
      id: '656ccfafb58b726fc9a43ba6',
      name: 'Bleeko',
    },
    {
      id: '656ccfaf3c7ac8a7272c1887',
      name: 'Senmao',
    },
    {
      id: '656ccfaf158191297270d9a7',
      name: 'Comtent',
    },
    {
      id: '656ccfaf891d5530ce743962',
      name: 'Cubix',
    },
    {
      id: '656ccfaf0ac7231b3017e370',
      name: 'Bisba',
    },
  ],
  cat: [
    {
      id: '656ccfaf599bbe8c609a25bf',
      name: 'Anarco',
    },
    {
      id: '656ccfafd3dc91ef8ef5ed52',
      name: 'Fuelworks',
    },
    {
      id: '656ccfafbbc4e3a16397360a',
      name: 'Plasmos',
    },
    {
      id: '656ccfafb0a4b7809b1bac44',
      name: 'Lunchpod',
    },
    {
      id: '656ccfafe7a79359131f7978',
      name: 'Bizmatic',
    },
  ],
  cfg: [
    {
      id: '656ccfafb39b69a7e5ce1faf',
      name: 'Kengen',
    },
    {
      id: '656ccfaf612c39125464a728',
      name: 'Shepard',
    },
    {
      id: '656ccfaf93090f1cd3e339dc',
      name: 'Tetak',
    },
    {
      id: '656ccfaf141b51202274b016',
      name: 'Yurture',
    },
    {
      id: '656ccfaf13d2e7220f4e42d0',
      name: 'Unia',
    },
  ],
  key: [
    {
      id: '656ccfafd6bef315cf63f66b',
      name: 'Telpod',
    },
    {
      id: '656ccfaf306fb76e564868ca',
      name: 'Injoy',
    },
  ],
}

const SAMPLE_SIZE = 10
function* getNext() {
  let tIdx = 0
  let envIdx = 0
  let wfIdx = 0
  let featIdx = 0
  let catIdx = 0
  let cfgIdx = 0
  let keyIdx = 0

  let isRunning = true
  while (isRunning) {
    keyIdx += 1
    if (keyIdx >= Math.min(data.key.length, SAMPLE_SIZE)) {
      keyIdx = 0
      cfgIdx += 1
    }
    if (cfgIdx >= Math.min(data.cfg.length, SAMPLE_SIZE)) {
      cfgIdx = 0
      catIdx += 1
    }
    if (catIdx >= Math.min(data.cat.length, SAMPLE_SIZE)) {
      catIdx = 0
      featIdx += 1
    }
    if (featIdx >= Math.min(data.feat.length, SAMPLE_SIZE)) {
      featIdx = 0
      wfIdx += 1
    }
    if (wfIdx >= Math.min(data.wf.length, SAMPLE_SIZE)) {
      wfIdx = 0
      envIdx += 1
    }
    if (envIdx >= Math.min(data.env.length, SAMPLE_SIZE)) {
      envIdx = 0
      tIdx += 1
    }
    if (tIdx >= Math.min(data.tenant.length, SAMPLE_SIZE)) {
      isRunning = false
      tIdx -= 1
    }
    yield {
      tenant: tIdx,
      env: envIdx,
      wf: wfIdx,
      feat: featIdx,
      cat: catIdx,
      cfg: cfgIdx,
      key: keyIdx,
    }
  }

  return null
}

const edges = []
let edgeCount = 0
let totalCount = 0
// eslint-disable-next-line no-restricted-syntax
for (const idx of getNext()) {
  totalCount += 1
  if (idx && Math.random() < 0.00001) {
    edgeCount += 1
    console.log('>>', { edgeCount, totalCount }, idx)
    const rId = Math.random().toString(36).slice(2)
    const nextEdge = {
      uuid: rId,
      tenant: data.tenant[idx.tenant].uuid,
      env: data.env[idx.env].uuid,
      wf: data.wf[idx.wf].uuid,
      feat: data.feat[idx.feat].uuid,
      cat: data.cat[idx.cat].uuid,
      cfg: data.cfg[idx.cfg].uuid,
      key: data.key[idx.key].uuid,
      value: rId,
      error: Math.random() > 0.9 ? 'Failure' : null,
    }
    edges.push(nextEdge)
  }
}

//
fs.writeFileSync('./plg-edges.json', JSON.stringify(edges, null, 2))

console.log({ edgeCount, totalCount })
