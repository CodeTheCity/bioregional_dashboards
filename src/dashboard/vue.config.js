module.exports = {
  /* publicPath: process.env.NODE_ENV === 'production'
    ? '/healthscience/code/diyhstoolkit/dist/'
    : '/', */
  devServer: {
    // proxy: 'https://bioregion.healthscience.network/'  // online server setup
    proxy: 'https://raw.githubusercontent.com/CodeTheCity/bioregional_dashboards/main/data/geojsonshed/'
    // proxy: 'https://en.wikipedia.org'
    // proxy: 'https://rawgit.com/gregoiredavid/france-geojson/master/regions/pays-de-la-loire/'
  }
}
