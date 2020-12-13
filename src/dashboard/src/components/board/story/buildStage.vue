<template>
  <div class="stage-build-holder">
    <div id="setup-tools">
      <form id="stage-name">
        <label>Stage Name</label>
        <input name="query" v-model="stageName">
        <label for="stagetype-select">type</label>
        <select class="select-stage-id" id="stage-mapping-build" @change="statetypeSelect" v-model="stageType">
          <!-- <option value="none" selected="">please select</option> -->
          <option v-for="stype in stagetypeList" :key="stype.id" v-bind:value="stype">
            {{ stype.name }}
          </option>
        </select>
      </form>
      <div v-if="stageType.id === 0" >
        text box - please write story
        <form id="stage_form" name="stage_form" method="post" action="#">
          <ul>
            <li class="stage-text">
              <textarea required="" v-model="stageText" placeholder="write story"></textarea>
            </li>
          </ul>
        </form>
      </div>
      <div v-if="stageType.id === 1" >
        data
      </div>
      <div v-if="stageType.id === 2" >
        Image
      </div>
      <div v-if="stageType.id === 3" >
        Experiment
      </div>
    </div>
    <div v-if="stageActive === true" id="stage-display-preview">
      <header>Stage {{ stageID }} </header>
      <ul>
        <li>
          Stage name: {{ stageName }}
        </li>
        <li>
          Type: {{ stageType }}
        </li>
        <li>
          Text: {{ stageText }}
        </li>
      </ul>
      <button @click.prevent="saveStage" class="button is-primary">Save</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'stage-build',
  components: {
  },
  props: {
    stageID: Object,
    stageActive: null
  },
  data: () => ({
    stageName: '',
    stageType: '',
    stagetypeList:
    [
      { id: 0, name: 'Text' },
      { id: 1, name: 'Data' },
      { id: 2, name: 'Image' },
      { id: 3, name: 'Experiment' }
    ],
    stageText: ''
  }),
  methods: {
    saveStage (ev) {
      console.log(ev)
      console.log('save stage')
      let prepareStage = {}
      prepareStage.type =
      prepareStage.text =
      prepareStage.data =
      prepareStage.image =
      prepareStage.Experiment =
      this.$store.dispatch('actionNewsage', prepareStage)
    }
  }
}
</script>

<style>
#stage-story-holder {
}

#setup-tools {

}

#stage-display-preview {
  border: 2px solid lightgrey;
}
</style>
