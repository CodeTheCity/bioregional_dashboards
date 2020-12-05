<template>
  <div class="dashboard">
    <header>Dashboard</header>
    <div id="tools-holder">
      <div id="tools-top">
        <ul>
          <li class="tools-power"><visualisation-medium></visualisation-medium></li>
          <li class="tools-power">SCALE</li>
          <li class="tools-power">Bioregion</li>
          <li class="tools-power">River Dee Watershed</li>
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
  data: () => ({
    liveStorytools: false
  }),
  methods: {
    viewStorytools (ev) {
      console.log(ev)
      console.log('event story tools')
      this.liveStorytools = !this.liveStorytools
    },
    filterCategory (ev) {
      console.log('type of data to filter on')
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

.story-stage {
  border: 2px solid green;
  margin-right: 1em;
  padding: 0.2em;
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
