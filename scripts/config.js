const path = require('path')
const replace = require('@rollup/plugin-replace')
const {babel} = require('@rollup/plugin-babel')
const {nodeResolve} = require('@rollup/plugin-node-resolve')
const {terser} = require("rollup-plugin-terser");

const version = require('../package.json').version
const resolve = p => {
    return path.resolve(__dirname, '../', p)
}
const builds = {
    'umd-dev': {
        input: resolve('src/index.ts'),
        dest: resolve('dist/storage.js'),
        format: 'umd',
        env: 'development'
      },
      'umd-prod': {
        input: resolve('src/index.ts'),
        dest: resolve('dist/storage.min.js'),
        format: 'umd',
        env: 'production'
      },
      'esm': {
        input: resolve('src/index.ts'),
        dest: resolve('dist/storage.esm.js'),
        format: 'es'
      }

}
const extensions = ['.js', '.ts'];

function genConfig (name) {
    const opts = builds[name]
    const config = {
      input: opts.input,
      plugins: [
        replace(   {
            __VERSION__: version
          }),
          nodeResolve({
              extensions,
              modulesOnly: true,
          }),
          babel({
              exclude: 'node_modules/**',
              extensions,
          }),

      ],
      output: {
        file: opts.dest,
        format: opts.format,
        name: 'storage-api'
      }
    }
    const vars = {}
    if (opts.env) {
        vars['process.env.NODE_ENV'] = JSON.stringify(opts.env)
    }

    config.plugins.push(replace(vars))

    if (opts.env === 'production'){
        config.plugins.push(terser())
    }
    return config
}
exports.getAllBuilds = () => Object.keys(builds).map(genConfig)
