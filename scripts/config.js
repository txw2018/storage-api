import replace from '@rollup/plugin-replace';
const version = require('../package.json').version

const builds = {
    umdDev: {
        input: resolve('src/index.ts'),
        dest: resolve('dist/storage.js'),
        format: 'umd',
        env: 'development'
      },
      umdProd: {
        input: resolve('src/index.ts'),
        dest: resolve('dist/storage.min.js'),
        format: 'umd',
        env: 'production'
      },
      esm: {
        input: resolve('src/index.ts'),
        dest: resolve('dist/storage.esm.js'),
        format: 'es'
      }

}
function genConfig (name) {
    const opts = builds[name]
    const config = {
      input: opts.input,
      plugins: [
        replace(   {
            __VERSION__: version
          }),
        flow(),
        alias(Object.assign({}, aliases, opts.alias))
      ].concat(opts.plugins || []),
      output: {
        file: opts.dest,
        format: opts.format,
        name: 'storage-api'
      }
    }
    return config
}