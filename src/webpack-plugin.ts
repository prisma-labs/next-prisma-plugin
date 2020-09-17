import path from 'path'
import { Compiler } from 'webpack'

const PLUGIN_NAME = 'PrismaClientReloaderWebpackPlugin'

const PATHS = ['.prisma/client/index.js', '@prisma/client/index.js', '@prisma/client/runtime/index.js']
const TESTS = [
  /\.next\/static\/build-manifest.json/,
  /\.next\/server\/ssr-module-cache.js/,
  /\.prisma\/client\/index.js/,
  /@prisma\/client\/index.js/,
  /@prisma\/client\/runtime\/index.js/
]
class PrismaClientReloaderWebpackPlugin {
  apply(compiler: Compiler) {
    const clientPaths = PATHS.map(p => path.join(compiler.context, 'node_modules', p))

    compiler.hooks.afterEmit.tapAsync(PLUGIN_NAME, (compilation, callback) => {
      const moduleIds = Object.keys(require.cache)
      TESTS.forEach(regex => {
        moduleIds.forEach(moduleId => {
          if (regex.test(moduleId)) {
            // console.log(moduleId)
            delete require.cache[moduleId]
          }
        })
      })
      callback()
    })

    compiler.hooks.compilation.tap(PLUGIN_NAME, compilation => {
      if (compilation.fileDependencies) {
        clientPaths.forEach(p => {
          compilation.fileDependencies.add(p)
        })
      }
      // @ts-ignore
      else if (compilation.compilationDependencies) {
        clientPaths.forEach(p => {
          // @ts-ignore
          compilation.compilationDependencies.add(p)
        })
      }
    })
  }
}
export default PrismaClientReloaderWebpackPlugin
