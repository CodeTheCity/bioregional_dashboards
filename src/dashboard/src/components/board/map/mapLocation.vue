<template>
  <div id="open-map">
    <div id="map-tools">
      <p>First marker is placed at {{ withPopup.lat }}, {{ withPopup.lng }}</p>
      <p>Center is at {{ currentCenter }} and the zoom is: {{ currentZoom }}</p>
      <button @click='showLongText'>
        Toggle long popup
      </button>
      <button @click="mapView2D">
        Toggle map
      </button>
      <span v-if="loading">Loading...</span>
      <label for="checkbox">GeoJSON Visibility</label>
      <input
        id="checkbox"
        v-model="show"
        type="checkbox"
      >
      <label for="checkboxTooltip">Enable tooltip</label>
      <input
        id="checkboxTooltip"
        v-model="enableTooltip"
        type="checkbox"
      >
      <input
        v-model="fillColor"
        type="color"
      >
      <br>
    </div>
    <l-map class="live-map"
      v-if='showMap'
      :zoom='zoom'
      :center='center'
      :options='mapOptions'
      @update:center='centerUpdate'
      @update:zoom='zoomUpdate'
    >
      <l-tile-layer
        :url='url'
        :attribution='attribution'
      />
      <l-geo-json
        v-if="show"
        :geojson="geojson"
        :options="options"
        :options-style="styleFunction"
      />
      <ul v-for="daVis of dataPoints" :key="daVis.id">
        <l-marker :lat-lng="prepLatLong(daVis.latlong)">
          <l-popup>
            <!-- <div @click="innerClick(daVis)">
              Click to view data
              <p v-show='showParagraph'>
                {{ daVis }}
              </p>
            </div> -->
            <div v-html="daVis.embed" id="vis-content">
            </div>
          </l-popup>
        </l-marker>
      </ul>
      <!-- <l-marker :lat-lng='withPopup'>
        <l-popup>
          <div @click='innerClick'>
            Click to view full chart
            <p v-show='showParagraph'>
              River Dee
            </p>
          </div>
        </l-popup>
      </l-marker> -->
      <!-- <l-marker :lat-lng='withTooltip'>
        <l-tooltip :options='{ permanent: true, interactive: true }'>
          <div @click='innerClick'>
            I am a tooltip
            <p v-show='showParagraph'>
              River Dee Water Shed
            </p>
          </div>
        </l-tooltip>
      </l-marker> -->
    </l-map>
  </div>
</template>

<script>
// @ is an alias to /src
import { latLng, Icon } from 'leaflet'
import { LMap, LTileLayer, LMarker, LPopup, LGeoJson } from 'vue2-leaflet'
import 'leaflet/dist/leaflet.css'

delete Icon.Default.prototype._getIconUrl
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

export default {
  name: 'Map',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    // LTooltip,
    LGeoJson
  },
  created: function () {
    this.firstSetBioregion()
  },
  computed: {
    loading () {
      return this.$store.state.loading
    },
    showMap () {
      return this.$store.state.twoDmapview
    },
    currentZoom () {
      return this.$store.state.zoomLive
    },
    zoom () {
      return this.$store.state.zoomLive
    },
    geojson () {
      if (this.$store.state.liveGEOJSON.type === 'FeatureCollection') {
        return this.$store.state.liveGEOJSON
      } else {
        return null
      }
    },
    dataPoints () {
      return this.$store.state.liveDataLocation
    },
    options () {
      return {
        // onEachFeature: this.onEachFeatureFunction
      }
    },
    styleFunction () {
      const fillColor = this.fillColor // important! need touch fillColor in computed for re-calculate when change fillColor
      return () => {
        return {
          weight: 2,
          color: '#7F98E4',
          opacity: 1,
          fillColor: fillColor,
          fillOpacity: 0.3
        }
      }
    },
    onEachFeatureFunction () {
      if (!this.enableTooltip) {
        return () => {}
      }
      return (feature, layer) => {
        layer.bindTooltip(
          '<div>code:' +
            feature.properties.code +
            '</div><div>nom: ' +
            feature.properties.nom +
            '</div>',
          { permanent: false, sticky: true }
        )
      }
    }
  },
  data () {
    return {
      // loading: false,
      show: true,
      enableTooltip: true,
      // zoom: 2,
      center: latLng(57.0771542, -2.7823257),
      // geojson: null,
      fillColor: '#7F98E4',
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      withPopup: latLng(57.077154, -2.782325),
      withTooltip: latLng(57.077154, -2.782325),
      // currentZoom: 11.5,
      currentCenter: latLng(57.077154, -2.782325),
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5
      },
      // showMap: true,
      embedLive: ''
    }
  },
  methods: {
    firstSetBioregion () {
      this.$store.dispatch('actionBioregion')
    },
    mapView2D (ms) {
      this.$store.dispatch('actionHideMap')
    },
    zoomUpdate (zoom) {
      this.currentZoom = zoom
    },
    centerUpdate (center) {
      this.currentCenter = center
    },
    showLongText () {
      this.showParagraph = !this.showParagraph
    },
    innerClick (dpv) {
      console.log('update embed')
      console.log(dpv)
      // alert('Data: ' + dpv.name + ' ' + dpv.data)
      this.embedLive = dpv.embed
    },
    prepLatLong (latlong) {
      return latLng(latlong)
    }
  }
}
</script>

<style>
#open-map {
  height: 600px;
  width: auto;
  margin: 2em;
  border: 1px solid black;
  overflow: scroll;
}

#map-tools {
  min-height: 100px;
  /* overflow: auto; */
}

.live-map {
}
</style>
