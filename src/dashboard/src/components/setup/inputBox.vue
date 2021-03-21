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
    <div v-if="querylist" id="search results">
      <!-- Results {{ querylist }} -->
      <div id="result-list" v-if="querylist.data !== undefined">
        <ul  v-for="item of querylist.data[1]" :key='item.id'>
          <li @click="selectEntry(item)">{{ item }}</li>
        </ul>
      </div>
      <div id="selected-place">
        Selected == {{ selectedPlace }}
      </div>
    </div>
    <div id="wikipage-page" v-if="wikipage">
      <div id="bioregion-message" v-if="selectedPlace.length > 2">
        <div id="message-postive" v-if="matchMapData === true">
          OK, display the map here and the toolbars
          <life-board></life-board>
        </div>
        <div id="message-notready" v-if="matchMapData === false">
          There is no bioregion prepared for this place.  Follow these steps to build out a map. . .
          <button @click.prevent="buildMap" class="button is-primary">Build map</button>
        </div>
        <div id="build-new-bioregion" v-if="newBuildStart === true">
          <ul>
            <li>Place</li>
            <li>Communities</li>
            <li>River</li>
            <li>Watershed</li>
            <li>Data Science Stories</li>
          </ul>
        </div>
      </div>
      <div v-html="wikipage">
      </div>
    </div>
    <div id="search results">
      river lists
      {{ rawRiverpage }}
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import LifeBoard from '@/components/dashboard/Lifeboard.vue'

export default {
  name: 'inputbox',
  components: {
    LifeBoard
  },
  data: () => ({
    biointerest:
    {
      text: '',
      forum: ''
    },
    wikipage: {},
    querylist: [],
    selectedPlace: '',
    matchMapData: false,
    rawRiverpage: '',
    newBuildStart: false
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
    },
    async selectEntry (place) {
      console.log('place selected')
      console.log(place)
      this.selectedPlace = place
      // query for specific wikipedia page METHOD 1
      let url2 = 'https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=5&gsrsearch=River_Dee,_Aberdeenshire'
      let pageExtract = await axios.get(url2)
      console.log(pageExtract)
      // look up wikipedia page
      // https://en.wikipedia.org/w/api.php?action=query&titles=belgrade&prop=extracts%7Cpageimages%7Cinfo&pithumbsize=400&inprop=url&redirects=&format=json&origin=*
      // wikipedia page info API call
      let urlpageQuery = 'https://en.wikipedia.org/w/api.php?action=query&titles=' + place + '&prop=extracts%7Cpageimages%7Cinfo&pithumbsize=400&inprop=url&redirects=&format=json&origin=*'
      // console.log(urlpageQuery)
      let rawWikipediaData = await axios.get(urlpageQuery)
      // need to extract
      let pageID = Object.keys(rawWikipediaData.data.query.pages)
      // console.log(pageID)
      this.wikipage = rawWikipediaData.data.query.pages[pageID[0]].extract
      // console.log(this.wikipage)
      // does a river, watershed, tributaries etc. mapping data exists?
      this.checkBioregionDataMap(pageID[0])
    },
    checkBioregionDataMap (wikiID) {
      console.log('check for bioregion map data')
      console.log(wikiID)
      let bioMapKeys = [{ wikid: '415350' }, { wikid: '166836' }, { wikid: '6668805' }, { wikid: 1237 }, { wikid: 1238 }]
      this.matchMapData = bioMapKeys.some(u => u.wikid === wikiID)
      console.log(this.matchMapData)
    },
    async lookupRiversScotland () {
      console.log('lookup rivers')
      // https://en.wikipedia.org/wiki/List_of_rivers_of_Scotland
      let rivers = 'List_of_rivers_of_Scotland'
      let urlriverQuery = 'https://en.wikipedia.org/w/api.php?action=query&titles=' + rivers + '&prop=extracts%7Cpageimages%7Cinfo&pithumbsize=400&inprop=url&redirects=&format=json&origin=*'
      // console.log(urlriverQuery)
      this.rawRiverpage = await axios.get(urlriverQuery)
    },
    buildMap () {
      console.log('buildmap')
      this.newBuildStart = !this.newBuildStart
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

#message-postive {
  border: 2px solid green;
}

#message-notready {
  border: 2px solid orange;
}

#wikipage-page {
  border: 1px solid red;
  height: 960px;
  overflow: scroll;
}
</style>
