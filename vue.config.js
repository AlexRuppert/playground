module.exports = {
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === 'production' ? '/playground/' : '/',
  outputDir: 'docs',
  productionSourceMap: false,

  devServer: {
    host: '0.0.0.0',
    port: 3000,
  },
}
