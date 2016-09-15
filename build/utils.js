import path from 'path'
import compression from 'compression'

import webpack from 'webpack'
import config from '../webpack.config'

export function setupWebpackMiddleware(app) {
  /* eslint-disable */
  const webpackMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  /* eslint-enable */
  const compiler = webpack(config)

  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false,
    },
  })

  app.use(middleware)
  app.use(webpackHotMiddleware(compiler))

  app.get('*', (req, res) => {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, '../dist/index.html')))
    res.end()
  })
}

export function serveStaticFiles(app) {
  app.use(compression())
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'))
  })
}
