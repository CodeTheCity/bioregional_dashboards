module.exports = {
  /* publicPath: process.env.NODE_ENV === 'production'
    ? '/healthscience/code/diyhstoolkit/dist/'
    : '/', */
  devServer: {
    proxy: 'https://bioregion.healthscience.network'
  }
}
