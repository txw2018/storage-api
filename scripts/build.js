build(builds)

function build (builds) {
  let built = 0
  const total = builds.length
  const next = () => {
    buildEntry(builds[built]).then(() => {
      built++
      if (built < total) {
        next()
      }
    }).catch(logError)
  }

  next()
}
function buildEntry (config) {
    const output = config.output
    const { file, banner } = output
    const isProd = /(min|prod)\.js$/.test(file)
    return rollup.rollup(config)
      .then(bundle => bundle.generate(output))
      .then(({ output: [{ code }] }) => {
        if (isProd) {
          const minified = (banner ? banner + '\n' : '') + terser.minify(code, {
            toplevel: true,
            output: {
              ascii_only: true
            },
            compress: {
              pure_funcs: ['makeMap']
            }
          }).code
          return write(file, minified, true)
        } else {
          return write(file, code)
        }
      })
  }