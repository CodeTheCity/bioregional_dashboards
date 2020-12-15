<template>
  <div class="stage-story-holder">
    <div id="stage-display">
      <div id="stage-reference">
        {{ stageID.refcontract }}
      </div>
      <div id="stage-name">
        {{ stageID.name }}
      </div>
      <div v-if="stageID.text" id="stage-text">
       {{ stageID.text }}
      </div>

      <div v-if="stageID.data" id="stage-data">
       {{ stageID.data }} <a href="" class="data-vis" @click.prevent="viewOnmap">view to map</a>
      </div>

    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'stage-view',
  components: {
  },
  props: {
    stageID: Object
  },
  data: () => ({
  }),
  methods: {
    viewOnmap () {
      console.log('view data on map')
    }
  }
}
</script>

<style>
#stage-story-holder {
  float: left;
}

#setup-tools {

}

#stage-display {
  float: left;
  min-height: 100px;
  width: 200px;
  border: 2px solid lightgrey;
}
</style>
