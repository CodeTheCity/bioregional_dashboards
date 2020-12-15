<template>
  <div class="input-box">
    <header>Please enter location and topic of interest:</header>
    <div id="prime-bioregion">
      <form id="bioregion_form" name="bioregion_form" method="post" action="#">
        <ul>
          <li class="bioregion-items">
            Prime question:
            <textarea required="" v-model="biointerest.text" placeholder="location, land, soil, birds">dfd</textarea>
          </li>
        </ul>
      </form>
      <button @click.prevent="startBuild" class="button is-primary">Build bioregion</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'inputbox',
  components: {
  },
  data: () => ({
    biointerest:
    {
      text: '',
      forum: ''
    }
  }),
  methods: {
    startBuild () {
      // move to lifeboard visualisation
      this.$router.push('dashboard')
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.input-box  {
  display: block;
  border: 1px solid green;
  text-align: center;
}

#prime-bioregion {
  display: block;
  text-align: center;
}

.bioregion-items li {
  height: 30px;
  width: 600px;
}
</style>
