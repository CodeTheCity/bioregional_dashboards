<template>
  <div class="input-box">
    <header>Please enter the name of the local river</header>
    <div id="prime-bioregion">
      <form id="bioregion_form" name="bioregion_form" method="post" action="#">
        <ul>
          <li class="bioregion-items">
            River name:
            <textarea required="" v-model="biointerest.text" placeholder="location, land, soil, birds">dfd</textarea>
          </li>
        </ul>
      </form>
      <button @click.prevent="startBuild" class="button is-primary">Build bioregion</button>
    </div>
    <div v-if="wikipage.data">
      <div v-html="wikipage.data.query.pages[415350].extract">
      </div>
    </div>
    <div id="search results">
      Results {{ querylist }}
    </div>
      wikipedia -- {{ wikipage }}
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'inputbox',
  components: {
  },
  data: () => ({
    biointerest:
    {
      text: '',
      forum: ''
    },
    wikipage: {},
    querylist: []
  }),
  methods: {
    async startBuild () {
      console.log('start build bioergion')
      // move to lifeboard visualisation
      // this.$router.push('dashboard')
      let inputQuery = this.biointerest.text
      // let wikipediaQuery = 'https://en.wikipedia.org/w/api.php?action=opensearch&search={' + inputQuery + '}&format=json'
      /* let wikipediaQuery = 'https://en.wikipedia.org/w/api.php?action=opensearch&search={River_Dee,_Aberdeenshire}&format=json'
      let responseWikipedia = await fetch(wikipediaQuery)
      console.log('response')
      console.log(responseWikipedia) */
      //  "https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=5&gsrsearch='New_England_Patriots'"
      let url = 'https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&search={ ' + inputQuery + '}&format=json'
      this.querylist = await axios.get(url)
      console.log(this.queryWikiResults)
      axios.get(url)
        .then(
          response => console.log(response.data)
          // this.querylist = response.data
        )
      let url2 = 'https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=5&gsrsearch=River_Dee,_Aberdeenshire'
      axios.get(url2)
        .then(
          response => response.data
        )
      // https://en.wikipedia.org/w/api.php?action=query&titles=belgrade&prop=extracts%7Cpageimages%7Cinfo&pithumbsize=400&inprop=url&redirects=&format=json&origin=*
      let url3 = 'https://en.wikipedia.org/w/api.php?action=query&titles=River_Dee,_Aberdeenshire&prop=extracts%7Cpageimages%7Cinfo&pithumbsize=400&inprop=url&redirects=&format=json&origin=*'
      this.wikipage = await axios.get(url3)
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
