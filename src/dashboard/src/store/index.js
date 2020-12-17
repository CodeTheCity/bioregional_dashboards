import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    storyLive: [{ name: 'Waterflow', id: '0001' }, { name: 'Rainfall', id: '0002' }, { name: 'Soil', id: '0003' }, { name: 'Plants', id: '0004' }, { name: 'Birds', id: '0005' }],
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
    storyRefContracts:
    {
      '0001': { stages: [{ refcontract: 303031, name: 'introduction', type: 'text', text: 'the history of the rive dee water flow over the decades' }, { refcontract: 303032, name: '1950 water flow', type: 'data', text: '', data: '99881' }, { refcontract: 303033, name: 'Live water flow', type: 'data', data: 'dfdfd' }] },
      '0002': { stages: [1, 2, 3, 4] },
      '0003': { stages: [1, 2] },
      '0004': { stages: [1, 2, 3, 4] },
      '0005': { stages: [1, 2, 3, 4, 5] }
    },
    liveDataLocation: [{ name: 'Marlodge', latlong: [57.071154, -2.782325], data: '1234' }, { name: 'Woodend', latlong: [57.077154, -2.542325], data: '0002' }], //, { name: 'Soil', latlong: [57.077154, -2.782325], data: '0003' }, { name: 'Plants', latlong: [57.077154, -2.782325], data: '0004' }, { name: 'Birds', latlong: [57.077154, -2.782325], data: '0005' }]
    liveStory: {},
    liveStoryName: '',
    storyStages: [],
    stageCount: 0,
    bioregionSet: {},
    loading: false,
    liveGEOJSON: {},
    showLive: false,
    zoomLive: 11.5
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
      state.showLive = inVerified
    },
    SET_SAVE_STORY (state, inVerified) {
      state.stageCount++
      Vue.set(this.state.storyRefContracts, 'name', inVerified)
      let storySummary = {}
      storySummary.name = state.liveStoryName
      storySummary.id = inVerified
      this.state.storyLive.push(storySummary)
    },
    SET_NEW_STAGE (state, inVerified) {
      state.storyStages.push(inVerified)
    },
    SET_STAGE_COUNT (state, inVerified) {
      state.stageCount++
    },
    SET_STORY_NAME (state, inVerified) {
      state.liveStoryName = inVerified
    },
    SET_LIVE_STORY (state, inVerified) {
      state.liveStory = state.storyRefContracts[inVerified]
      state.storyStages = state.storyRefContracts[inVerified].stages
    },
    SET_EMPTY_STAGES (state, inVerified) {
      state.storyStages = []
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
    actionNewstage (context, update) {
      context.commit('SET_NEW_STAGE', update)
    },
    actionNewstory (context, update) {
      context.commit('SET_SAVE_STORY', update)
    },
    actionNewstoryCount (context, update) {
      context.commit('SET_STAGE_COUNT', update)
    },
    actionStoryname (context, update) {
      context.commit('SET_STORY_NAME', update)
    },
    actionLivestory (context, update) {
      context.commit('SET_LIVE_STORY', update)
    },
    actionEmptystages (context, update) {
      context.commit('SET_EMPTY_STAGES', update)
    }
  },
  modules: {
  }
})
