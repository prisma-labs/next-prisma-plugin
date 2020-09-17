"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var PLUGIN_NAME = 'PrismaClientReloaderWebpackPlugin';
var PATHS = ['.prisma/client/index.js', '@prisma/client/index.js', '@prisma/client/runtime/index.js'];
var TESTS = [
    /\.next\/static\/build-manifest.json/,
    /\.next\/server\/ssr-module-cache.js/,
    /\.prisma\/client\/index.js/,
    /@prisma\/client\/index.js/,
    /@prisma\/client\/runtime\/index.js/
];
var PrismaClientReloaderWebpackPlugin = /** @class */ (function () {
    function PrismaClientReloaderWebpackPlugin() {
    }
    PrismaClientReloaderWebpackPlugin.prototype.apply = function (compiler) {
        var clientPaths = PATHS.map(function (p) { return path_1.default.join(compiler.context, 'node_modules', p); });
        compiler.hooks.afterEmit.tapAsync(PLUGIN_NAME, function (compilation, callback) {
            var moduleIds = Object.keys(require.cache);
            TESTS.forEach(function (regex) {
                moduleIds.forEach(function (moduleId) {
                    if (regex.test(moduleId)) {
                        // console.log(moduleId)
                        delete require.cache[moduleId];
                    }
                });
            });
            callback();
        });
        compiler.hooks.compilation.tap(PLUGIN_NAME, function (compilation) {
            if (compilation.fileDependencies) {
                clientPaths.forEach(function (p) {
                    compilation.fileDependencies.add(p);
                });
            }
            // @ts-ignore
            else if (compilation.compilationDependencies) {
                clientPaths.forEach(function (p) {
                    // @ts-ignore
                    compilation.compilationDependencies.add(p);
                });
            }
        });
    };
    return PrismaClientReloaderWebpackPlugin;
}());
exports.default = PrismaClientReloaderWebpackPlugin;
