
module.exports = ({
  webpack (config, { dev }) {
    config.module.rules.push({
      test: require.resolve('next/router'),
      use: [{
        loader: 'expose-loader',
        options: 'router'
      }]
    })
    return config
  }
})
