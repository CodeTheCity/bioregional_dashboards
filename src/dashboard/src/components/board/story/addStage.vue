<template>
  <div class="stage-story-holder">
    <div id="stage-display">
      {{ stageID }}
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
