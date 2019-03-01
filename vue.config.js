module.exports = {
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === 'production' ? '/playground/' : '/',
  outputDir: 'docs',
  productionSourceMap: false,
}
