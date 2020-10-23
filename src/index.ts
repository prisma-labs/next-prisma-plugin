import CopyWebpackPlugin from 'copy-webpack-plugin'
import path from 'path'
import PrismaClientReloaderWebpackPlugin from './webpack-plugin'

const PATH_DELIMITER = '[\\\\/]' // match 2 antislashes or one slash

/**
 * On Windows, the Regex won't match as Webpack tries to resolve the
 * paths of the modules. So we need to check for \\ and /
 */
// @ts-ignore
const safePath = (module) => module.split(/[\\\/]/g).join(PATH_DELIMITER)

/**
 * Actual Next.js plugin
 */
const withPrismaPlugin = (nextConfig: any) => (
  phase: 'phase-export' | 'phase-production-build' | 'phase-production-server' | 'phase-development-server',
  ...thing: any
) => {
  const config = { ...nextConfig }
  config.webpack = (webpackConfig: any, options: any) => {
    if (typeof nextConfig?.webpack === 'function') {
      nextConfig?.webpack(webpackConfig, options)
    }
    config.node.__dirname = false
    if (phase === 'phase-development-server') {
      config.node.__dirname = true
      const ignore = ['.prisma/client', '@prisma/client']
      // const includes = ignore.map(module => (new RegExp(`${module}(?!.*node_modules)`)));
      const excludes = [new RegExp(`node_modules(?!/(${ignore.join('|')})(?!.*node_modules))`)]
      const ignored = webpackConfig.watchOptions.ignored
        .filter((ignored: string) => ignored !== '**/node_modules/**')
        .concat(excludes)
      webpackConfig.watchOptions = {
        ...webpackConfig.watchOptions,
        ignored,
      }
    }
    // Custom Output Fix
    webpackConfig.plugins.push(
      new CopyWebpackPlugin({
        patterns: [
          {
            // the custom location the binary is generated to
            from: '**/query-engine*', // glob pattern that matches all query-engines

            to: path.join(__dirname, '.next/serverless/pages/api'),
          },
        ],
      })
    )
    webpackConfig.plugins = [...webpackConfig.plugins, new PrismaClientReloaderWebpackPlugin()]
    // set to false
    // config.node.__dirname = false;
    return webpackConfig
  }
  let internalConfigObj = typeof nextConfig === 'function' ? nextConfig(phase, ...thing) : nextConfig
  return internalConfigObj
}

export default withPrismaPlugin
