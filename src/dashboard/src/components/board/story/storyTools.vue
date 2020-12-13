<template>
  <div class="story-tools-holder">
    <ul v-for='stage in storyStages' :key='stage.id'>
      <li class="story-stage">
        <story-stage :stageID="stage"></story-stage>
      </li>
    </ul>
    <div class="clearFloat"></div>
    <ul>
      <li class="tools-stage"><a @click.prevent="addStorystage" href="" id="story-button">add</a></li>
      <li><button @click.prevent="startStory" class="button is-primary">Play story</button></li>
      <li class="tools-story">Record Story</li>
    </ul>
    <story-buildstage :stageActive="addStageactive" :stageID="stage"></story-buildstage>
  </div>
</template>

<script>
// @ is an alias to /src
import StoryBuildstage from '@/components/board/story/buildStage.vue'
import StoryStage from '@/components/board/story/addStage.vue'

export default {
  name: 'StoryTools',
  components: {
    StoryStage,
    StoryBuildstage
  },
  computed: {
    storyStages () {
      return this.$store.state.storyStages
    }
  },
  data: () => ({
    addStageactive: false
  }),
  methods: {
    addStorystage (ev) {
      console.log(ev)
      console.log('add story stage')
      this.addStageactive = !this.addStageactive
    }
  }
}
</script>

<style>
.clearFloat {
  clear: both;
}
</style>
