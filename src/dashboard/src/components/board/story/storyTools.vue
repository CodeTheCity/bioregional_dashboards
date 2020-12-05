<template>
  <div class="story-tools-holder">
    <ul v-for='stage in storyStages' :key='stage.id'>
      <li class="story-stage"><a @click.prevent="viewStage" href="" id="story-button">Date or Type of stage years</a> {{ stage.id }}</li>
      <!-- <li class="story-stage"><a @click.prevent="viewStage" href="" id="story-button">50 years ago</a></li>
      <li class="story-stage">20 years ago</li>
      <li class="story-stage"><a @click.prevent="viewStage" href="" id="story-button">Now</a></li>
      <li class="story-stage-future">20 years future</li>
      <li class="story-stage-future"><a @click.prevent="viewStage" href="" id="story-button">50 years future</a></li>
       -->
    </ul>
    <ul>
      <li class="tools-stage"><a @click.prevent="addStorystage" href="" id="story-button">add</a></li>
      <li><button @click.prevent="startStory" class="button is-primary">Play story</button></li>
      <li class="tools-story">Record Story</li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'StoryTools',
  components: {
  },
  data: () => ({
    storyStages: []
  }),
  methods: {
    addStorystage (ev) {
      console.log(ev)
      console.log('add story stage')
      let prepareStage = {}
      prepareStage.id = 1
      prepareStage.text = '50 years ago'
      prepareStage.stagetype = 'observation'
      this.storyStages.push(prepareStage)
    }
  }
}
</script>

<style>
.story-stage-future {
  border: 2px solid orange;
  margin-right: 0.2em;
  padding: 1em;
}
</style>
