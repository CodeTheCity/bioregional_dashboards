<template>
  <div class="dashboard">
    <header>Dashboard</header>
    <div id="tools-holder">
      <div id="tools-top">
        <ul>
          <li class="tools-power"><visualisation-medium></visualisation-medium></li>
          <li class="tools-power">SCALE</li>
          <li class="tools-power">
            <label for="bioregion-select">Bioregion:</label>
            <select class="select-bioregion-id" id="bioregion-mapping-build" @change="bioregionSelect" v-model="bioregionID">
              <!-- <option value="none" selected="">please select</option> -->
              <option v-for="bplace in bioregionList" :key="bplace.id" v-bind:value="bplace">
                {{ bplace.name }}
              </option>
            </select>
          </li>
          <li class="tools-power"><a @click.prevent="viewStorytools" href="" id="story-button">Story</a></li>
        </ul>
      </div>
      <div v-if="liveStorytools === true" id="story-board">
        <story-tools></story-tools>
      </div>
      <div id="filter-tools">
        <ul>
          <li class="tools-filter"><a href="" @click.prevent="filterCategory" >Waterflow</a></li>
          <li class="tools-filter"><a href="" @click.prevent="filterCategory">Rainfall</a></li>
          <li class="tools-filter"><a href="" @click.prevent="filterCategory">Brids</a></li>
          <li class="tools-filter">Soil</li>
          <li class="tools-filter">ADD</li>
        </ul>
      </div>
      <div id="acitve-board">
        <div id="map-location-holder">
          <map-location></map-location>
        </div>
      </div>
      <data-flow></data-flow>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import VisualisationMedium from '@/components/board/medium/mediumView.vue'
import StoryTools from '@/components/board/story/storyTools.vue'
import MapLocation from '@/components/board/map/mapLocation.vue'
import DataFlow from '@/components/board/datatools/dataFlow.vue'

export default {
  name: 'Dashboard',
  components: {
    VisualisationMedium,
    StoryTools,
    MapLocation,
    DataFlow
  },
  computed: {
    bioregionList () {
      return [{ id: 123, name: 'Earth' }, { id: 124, name: 'Scotland' }, { id: 125, name: 'Dee watershed' }, { id: 126, name: 'Dee tributaries' }]
    }
  },
  data: () => ({
    liveStorytools: false,
    bioregionID: ''
  }),
  methods: {
    viewStorytools (ev) {
      console.log(ev)
      console.log('event story tools')
      this.liveStorytools = !this.liveStorytools
    },
    filterCategory (ev) {
      console.log('type of data to filter on')
    },
    bioregionSelect () {
      console.log('selected bioregion')
      console.log(this.bioregionID)
      this.$store.dispatch('actionBioregion', this.bioregionID)
    }
  }
}
</script>

<style>
.moveable {
  display: inline-block;
  border: 2px solid red;
}

ul li {
  display: inline;
}

.tools-power {
  margin: 1em;
}

#filter-tools {
  display: inline;
}

#filter-tools ul li {
  border: 1px solid lightgrey;
  margin: 0.2em;
}

#map-location-holder {
  border: 1px solid orange;
  display: block;
  height: auto;
}
</style>
