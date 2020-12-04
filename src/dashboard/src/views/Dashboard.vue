<template>
  <div class="dashboard">
    <header>Dashboard</header>
    <div id="tools-holder">
      <div id="tools-top">
        <ul>
          <li class="tools-power">SCALE</li>
          <li class="tools-power">Bioregion</li>
          <li class="tools-power">River Dee Watershed</li>
          <li class="tools-power"><a @click.prevent="viewStorytools" href="" id="story-button">Story</a></li>
        </ul>
      </div>
      <div v-if="liveStorytools === true" id="story-board">
        <ul>
          <li class="story-stage"><a @click.prevent="viewStage" href="" id="story-button">50 years ago</a></li>
          <li class="story-stage">20 years ago</li>
          <li class="story-stage"><a @click.prevent="viewStage" href="" id="story-button">Now</a></li>
          <li class="story-stage-future">20 years future</li>
          <li class="story-stage-future"><a @click.prevent="viewStage" href="" id="story-button">50 years future</a></li>
          <li class="tools-stage"><a @click.prevent="addStorystage" href="" id="story-button">add</a></li>
          <li><button @click.prevent="startStory" class="button is-primary">Play story</button></li>
          <li class="tools-story">Record Story</li>
        </ul>
      </div>
      <div id="acitve-board">
        <div id="map-location">
          <!-- <div v-if="mapState === true" >
            <img alt="watershed" src="../assets/riverdeeshed.png">
          </div> -->
          <map-location></map-location>
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
      </div>
      <data-flow></data-flow>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import MapLocation from '@/components/board/map/mapLocation.vue'
import DataFlow from '@/components/board/datatools/dataFlow.vue'

export default {
  name: 'Dashboard',
  components: {
    MapLocation,
    DataFlow
  },
  data: () => ({
    liveStorytools: false
  }),
  methods: {
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
  padding: 1em;
}

.story-stage-future {
  border: 2px solid orange;
  margin-right: 1em;
  padding: 1em;
}

#filter-tools {
  display: inline;
}

#filter-tools ul li {
  border: 1px solid lightgrey;
  margin: 1em;
}

#map-location {
  display: inline;
}
</style>
