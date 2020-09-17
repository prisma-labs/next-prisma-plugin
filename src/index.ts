import PrismaClientReloaderWebpackPlugin from './webpack-plugin'
const PATH_DELIMITER = '[\\\\/]' // match 2 antislashes or one slash

/**
 * On Windows, the Regex won't match as Webpack tries to resolve the
 * paths of the modules. So we need to check for \\ and /
 */
// @ts-ignore
const safePath = module => module.split(/[\\\/]/g).join(PATH_DELIMITER)

/**
 * Actual Next.js plugin
 */
const excludes = [/node_modules(?!\/(@prisma\/client|\.prisma\/client)(?!.*node_modules))/]
const withPrismaPluginInitializer = () => {
  const withPrismaPlugin = (nextConfig = {}) => {
    return Object.assign({}, nextConfig, {
      webpack(config: any, options: any) {
        const ignored = config.watchOptions.ignored
          .filter((ignored: string) => ignored !== '**/node_modules/**')
          .concat(excludes)

        return Object.assign(config, {
          plugins: [...config.plugins, new PrismaClientReloaderWebpackPlugin()],
          watchOptions: {
            ignored
          }
        })
      }
    })
  }

  return withPrismaPlugin
}

module.exports = withPrismaPluginInitializer
