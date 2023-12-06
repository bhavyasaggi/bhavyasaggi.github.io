/* eslint-disable import/no-extraneous-dependencies */
const WorkerPlugin = require('worker-plugin')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(
        new WorkerPlugin({
          // use "self" as the global object when receiving hot updates.
          globalObject: 'self',
        })
      )
    }
    return config
  },
}

module.exports = nextConfig
