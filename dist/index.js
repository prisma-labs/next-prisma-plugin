"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var webpack_plugin_1 = __importDefault(require("./webpack-plugin"));
var PATH_DELIMITER = '[\\\\/]'; // match 2 antislashes or one slash
/**
 * On Windows, the Regex won't match as Webpack tries to resolve the
 * paths of the modules. So we need to check for \\ and /
 */
// @ts-ignore
var safePath = function (module) { return module.split(/[\\\/]/g).join(PATH_DELIMITER); };
/**
 * Actual Next.js plugin
 */
var excludes = [/node_modules(?!\/(@prisma\/client|\.prisma\/client)(?!.*node_modules))/];
var withPrismaPluginInitializer = function () {
    var withPrismaPlugin = function (nextConfig) {
        if (nextConfig === void 0) { nextConfig = {}; }
        return Object.assign({}, nextConfig, {
            webpack: function (config, options) {
                var ignored = config.watchOptions.ignored
                    .filter(function (ignored) { return ignored !== '**/node_modules/**'; })
                    .concat(excludes);
                return Object.assign(config, {
                    plugins: __spreadArrays(config.plugins, [new webpack_plugin_1.default()]),
                    watchOptions: {
                        ignored: ignored
                    }
                });
            }
        });
    };
    return withPrismaPlugin;
};
module.exports = withPrismaPluginInitializer;
