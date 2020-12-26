import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    storyLive: [{ name: 'Waterflow', id: '0001' }, { name: 'Rainfall', id: '0002' }, { name: 'Soil', id: '0003' }, { name: 'Plants', id: '0004' }, { name: 'Birds', id: '0005' }, { name: 'Snow', id: '0006' }, { name: 'Population', id: '0007' }],
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
      '0001': { stages: [{ refcontract: 303031, name: 'introduction', type: 'text', text: 'the history of the rive dee water flow over the decades' }, { refcontract: 303032, name: '1950 water flow', type: 'data', text: '', data: '99881' }, { refcontract: 303033, name: 'Live water flow', type: 'data', data: 'dfdfd' }, { refcontract: 303034, name: 'Trend analysis', type: 'data', data: '12345' }] },
      '0002': { stages: [{ refcontract: 403031, name: 'introduction', type: 'text', text: 'the history of the rive dee rainfall' }, { refcontract: 403032, name: '1950 rainfall', type: 'data', text: '', data: '99881' }, { refcontract: 403033, name: 'Live radar', type: 'data', data: 'dfdfd' }, { refcontract: 403034, name: 'Trend analysis', type: 'data', data: '12345' }] },
      '0003': { stages: [{ refcontract: 503031, name: 'introduction', type: 'text', text: 'the history of the rive dee Soil' }, { refcontract: 503032, name: '1950 soil', type: 'data', text: '', data: '99881' }, { refcontract: 403033, name: 'Soil today', type: 'data', data: 'dfdfd' }, { refcontract: 503034, name: 'Trend analysis', type: 'data', data: '12345' }] },
      '0004': { stages: [{ refcontract: 603031, name: 'introduction', type: 'text', text: 'the history of the rive Plants' }, { refcontract: 603032, name: '1950 plants', type: 'data', text: '', data: '99881' }, { refcontract: 603033, name: 'Plants today', type: 'data', data: 'dfdfd' }, { refcontract: 603034, name: 'Trend analysis', type: 'data', data: '12345' }] },
      '0005': { stages: [{ refcontract: 703031, name: 'introduction', type: 'text', text: 'the history of the rive dee Birds' }, { refcontract: 703032, name: '1950 birds', type: 'data', text: '', data: '99881' }, { refcontract: 703033, name: 'Birds today', type: 'data', data: 'dfdfd' }, { refcontract: 703034, name: 'Trend analysis', type: 'data', data: '12345' }] },
      '0006': { stages: [{ refcontract: 803031, name: 'introduction', type: 'text', text: 'the history of the rive dee snow' }, { refcontract: 803032, name: '1950 snowfall', type: 'data', text: '', data: '99881' }, { refcontract: 803033, name: 'snow', type: 'data', data: 'dfdfd' }, { refcontract: 803034, name: 'Trend analysis', type: 'data', data: '12345' }] },
      '0007': { stages: [{ refcontract: 903031, name: 'introduction', type: 'text', text: 'the history of the rive dee popluation' }, { refcontract: 903032, name: '1950 population', type: 'data', text: '', data: '99881' }, { refcontract: 903033, name: 'Popluation today', type: 'data', data: 'dfdfd' }, { refcontract: 903034, name: 'Trend analysis', type: 'data', data: '12345' }] }
    },
    experimentData:
    {
      '303031': { data: [{ name: 'Marlodge', latlong: [56.988040, -3.4861979], data: '1234' }, { name: 'Polhollick', latlong: [57.055146, -3.0831807], data: '0002', embed: '' }, { name: 'Woodend', latlong: [57.050129, -2.6035672], data: '0002', embed: '' }, { name: 'Park', latlong: [57.075424, -2.3358252], data: '0003', embed: '' }, { name: 'Garthdee', latlong: [57.118824, -2.1243966], data: '0004', embed: '' }] },
      '303032': { data: [{ name: 'Marlodge', latlong: [56.988040, -3.4861979], data: '1234', embed: '' }, { name: 'Polhollick', latlong: [57.055146, -3.0831807], data: '0002', embed: '' }, { name: 'Woodend', latlong: [57.050129, -2.6035672], data: '0002', embed: '' }, { name: 'Park', latlong: [57.075424, -2.3358252], data: '0003', embed: '' }, { name: 'Garthdee', latlong: [57.118824, -2.1243966], data: '0004', embed: '' }] },
      '303033': { data: [{ name: 'Marlodge', latlong: [56.988040, -3.4861979], data: '1234', embed: '<iframe frameborder="0" width="300" height="446" src="https://gaugemap.blob.core.windows.net/gaugemapwidgets/4250-2442-1-300x446.html"></iframe>' }, { name: 'Polhollick', latlong: [57.055146, -3.0831807], data: '0002', embed: '<iframe frameborder="0" width="300" height="446" src="https://gaugemap.blob.core.windows.net/gaugemapwidgets/4297-2489-1-300x446.html"></iframe>' }, { name: 'Woodend', latlong: [57.050129, -2.6035672], data: '0002', embed: '<iframe frameborder="0" width="300" height="446" src="https://gaugemap.blob.core.windows.net/gaugemapwidgets/4348-2539-1-300x446.html"></iframe>' }, { name: 'Park', latlong: [57.075424, -2.3358252], data: '0003', embed: '<iframe frameborder="0" width="300" height="446" src="https://gaugemap.blob.core.windows.net/gaugemapwidgets/4287-2479-1-300x446.html"></iframe>' }, { name: 'Garthdee', latlong: [57.118824, -2.1243966], data: '0004', embed: '<iframe frameborder="0" width="300" height="446" src="https://gaugemap.blob.core.windows.net/gaugemapwidgets/4148-2341-1-300x446.html"></iframe>' }] },
      '303034': { data: [{ name: 'Marlodge', latlong: [56.988040, -3.4861979], data: '1234', embed: '<a data-flickr-embed="true" href="https://www.flickr.com/photos/aboynejames/50733289566/in/dateposted/" title="trend-overtime"><img src="https://live.staticflickr.com/65535/50733289566_501ff8a9d3_z.jpg" width="640" height="386" alt="trend-overtime"></a><script async src="//embedr.flickr.com/assets/client-code.js" charset="utf-8"></script>' }, { name: 'Polhollick', latlong: [57.055146, -3.0831807], data: '0002', embed: '<a data-flickr-embed="true" href="https://www.flickr.com/photos/aboynejames/50733289566/in/dateposted/" title="trend-overtime"><img src="https://live.staticflickr.com/65535/50733289566_501ff8a9d3_z.jpg" width="640" height="386" alt="trend-overtime"></a><script async src="//embedr.flickr.com/assets/client-code.js" charset="utf-8"></script>' }, { name: 'Woodend', latlong: [57.050129, -2.6035672], data: '0002', embed: '<a data-flickr-embed="true" href="https://www.flickr.com/photos/aboynejames/50733289566/in/dateposted/" title="trend-overtime"><img src="https://live.staticflickr.com/65535/50733289566_501ff8a9d3_z.jpg" width="640" height="386" alt="trend-overtime"></a><script async src="//embedr.flickr.com/assets/client-code.js" charset="utf-8"></script>' }, { name: 'Park', latlong: [57.075424, -2.3358252], data: '0003', embed: '<a data-flickr-embed="true" href="https://www.flickr.com/photos/aboynejames/50733289566/in/dateposted/" title="trend-overtime"><img src="https://live.staticflickr.com/65535/50733289566_501ff8a9d3_z.jpg" width="640" height="386" alt="trend-overtime"></a><script async src="//embedr.flickr.com/assets/client-code.js" charset="utf-8"></script>' }, { name: 'Garthdee', latlong: [57.118824, -2.1243966], data: '0004', embed: '<a data-flickr-embed="true" href="https://www.flickr.com/photos/aboynejames/50733289566/in/dateposted/" title="trend-overtime"><img src="https://live.staticflickr.com/65535/50733289566_501ff8a9d3_z.jpg" width="640" height="386" alt="trend-overtime"></a><script async src="//embedr.flickr.com/assets/client-code.js" charset="utf-8"></script>' }] }
    },
    liveDataLocation: [],
    /* [{ name: 'Marlodge', latlong: [57.071154, -2.782325], data: '1234' }, { name: 'Woodend', latlong: [57.077154, -2.542325], data: '0002' }], { name: 'Soil', latlong: [57.077154, -2.782325], data: '0003' }, { name: 'Plants', latlong: [57.077154, -2.782325], data: '0004' }, { name: 'Birds', latlong: [57.077154, -2.782325], data: '0005' }] */
    liveStory: {},
    liveStoryName: '',
    storyStages: [],
    stageCount: 0,
    bioregionSet: {},
    loading: false,
    liveGEOJSON: {},
    twoDmapview: false,
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
    SET_SHOWLIVE_MAP2D (state, inVerified) {
      state.twoDmapview = inVerified
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
    },
    SET_STAGE_DATA (state, inVerified) {
      let stageData = state.experimentData[inVerified.refcontract]
      state.liveDataLocation = stageData.data
    },
    SET_MAP2D_STATUS (state, inVerified) {
      state.twoDmapview = !state.twoDmapview
    }
  },
  actions: {
    async actionBioregion (context, update) {
      context.commit('SET_LOADING_BIOREGION', true)
      context.commit('SET_SHOWLIVE_MAP2D', true)
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
    },
    actionStageID (context, update) {
      context.commit('SET_STAGE_DATA', update)
    },
    actionHideMap (context, update) {
      context.commit('SET_MAP2D_STATUS', update)
    }
  },
  modules: {
  }
})
