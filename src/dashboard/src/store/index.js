import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    bioregionsList:
    [
      { id: 123, geojson: 'http://localhost:8080/geoman-earth.geojson', zoom: 2 },
      { id: 124, geojson: 'http://localhost:8080/geoman-scotland.geojson', zoom: 7 },
      { id: 125, geojson: 'http://localhost:8080/geoman2.geojson', zoom: 9 },
      { id: 126, geojson: 'http://localhost:8080/geoman2-trib.geojson', zoom: 10 }
    ],
    /* [
      { id: 123, geojson: 'https://raw.githubusercontent.com/CodeTheCity/bioregional_dashboards/main/data/geojsonshed/geoman-earth.geojson', zoom: 2 },
      { id: 124, geojson: 'https://raw.githubusercontent.com/CodeTheCity/bioregional_dashboards/main/data/geojsonshed/geoman-scotland.geojson', zoom: 7 },
      { id: 125, geojson: 'https://raw.githubusercontent.com/CodeTheCity/bioregional_dashboards/main/data/geojsonshed/geoman2.geojson', zoom: 9 },
      { id: 126, geojson: 'https://raw.githubusercontent.com/CodeTheCity/bioregional_dashboards/main/data/geojsonshed/geoman2-trib.geojson', zoom: 10 }
    ], */
    bioregionSet: {},
    loading: false,
    liveGEOJSON: {},
    showLive: false,
    zoomLive: 11.5,
    storyStages: []
  },
  getters: {
    liveGeojson: state => state.liveGEOJSON
  },
  mutations: {
    SET_BIOREGION (state, inVerified) {
      Vue.set(this.state.liveGEOJSON, 'features', inVerified.features)
      Vue.set(this.state.liveGEOJSON, 'type', inVerified.type)
    },
    SET_LOADING_BIOREGION (state, inVerified) {
      state.loading = inVerified
    },
    SET_ZOOM_MAP (state, inVerified) {
      state.zoomLive = inVerified
    },
    SET_SHOWLIVE_MAP (state, inVerified) {
      console.log('set show map')
      console.log(inVerified)
      state.showLive = inVerified
      console.log(state.showLive)
    },
    SET_NEW_STAGE (state, inVerified) {
      console.log('set new stage')
      state.storyStages.push(inVerified)
    }
  },
  actions: {
    async actionBioregion (context, update) {
      context.commit('SET_LOADING_BIOREGION', true)
      context.commit('SET_SHOWLIVE_MAP', true)
      let matchBioregion = null
      for (let br of this.state.bioregionsList) {
        if (br.id === update.id) {
          matchBioregion = br
        }
      }
      context.commit('SET_ZOOM_MAP', matchBioregion.zoom)
      const response = await fetch(matchBioregion.geojson)
      // const response = await fetch('https://raw.githubusercontent.com/CodeTheCity/bioregional_dashboards/main/data/geojsonshed/geoman2.geojson')
      // const response = await fetch('http://localhost:8080/communes-pays-de-la-loire.geojson')
      const data = await response.json()
      context.commit('SET_BIOREGION', data)
      context.commit('SET_LOADING_BIOREGION', false)
    },
    actionNewsage (context, update) {
      context.commit('SET_NEW_STAGE', update)
    }
  },
  modules: {
  }
})
