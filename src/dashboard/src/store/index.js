import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    bioregionsList:
    [
      { id: 123, geojson: 'http://localhost:8080/geoman-earth.geojson' },
      { id: 124, geojson: 'http://localhost:8080/geoman-scotland.geojson' },
      { id: 125, geojson: 'http://localhost:8080/geoman2.geojson' },
      { id: 126, geojson: 'http://localhost:8080/geoman2-trib.geojson' }
    ],
    bioregionSet: {},
    loading: false,
    liveGEOJSON: {}
  },
  mutations: {
    SET_BIOREGION (state, inVerified) {
      state.liveGEOJSON = inVerified
    },
    SET_LOADING_BIOREGION (state, inVerified) {
      state.loading = inVerified
    }
  },
  actions: {
    async actionBioregion (context, update) {
      console.log('change bioregtion')
      console.log(update)
      context.commit('SET_LOADING_BIOREGION', true)
      let matchBioregion = null
      for (let br of this.state.bioregionsList) {
        if (br.id === update.id) {
          matchBioregion = br
        }
      }
      const response = await fetch(matchBioregion.geojson)
      // const response = await fetch('https://raw.githubusercontent.com/CodeTheCity/bioregional_dashboards/main/data/geojsonshed/geoman2.geojson')
      // const response = await fetch('http://localhost:8080/communes-pays-de-la-loire.geojson')
      const data = await response.json()
      console.log('geo back github???')
      console.log(data)
      context.commit('SET_LOADING_BIOREGION', false)
      context.commit('SET_BIOREGION', data)
    }
  },
  modules: {
  }
})
