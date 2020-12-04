<template>
  <div id="open-map">
    <div id="map-tools">
      <p>First marker is placed at {{ withPopup.lat }}, {{ withPopup.lng }}</p>
      <p>Center is at {{ currentCenter }} and the zoom is: {{ currentZoom }}</p>
      <button @click='showLongText'>
        Toggle long popup
      </button>
      <button @click='showMap = !showMap'>
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
    <l-map
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
      <l-marker :lat-lng='withPopup'>
        <l-popup>
          <div @click='innerClick'>
            I am a popup
            <p v-show='showParagraph'>
              River Dee
            </p>
          </div>
        </l-popup>
      </l-marker>
      <l-marker :lat-lng='withTooltip'>
        <l-tooltip :options='{ permanent: true, interactive: true }'>
          <div @click='innerClick'>
            I am a tooltip
            <p v-show='showParagraph'>
              River Dee Water Shed
            </p>
          </div>
        </l-tooltip>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
// @ is an alias to /src
import { latLng } from 'leaflet'
import { LMap, LTileLayer, LMarker, LPopup, LTooltip, LGeoJson } from 'vue2-leaflet'
import 'leaflet/dist/leaflet.css'

export default {
  name: 'Map',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LTooltip,
    LGeoJson
  },
  data () {
    return {
      loading: false,
      show: true,
      enableTooltip: true,
      zoom: 13,
      center: latLng(57.0771542, -2.7823257),
      geojson: null,
      fillColor: '#e4ce7f',
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      withPopup: latLng(57.077154, -2.782325),
      withTooltip: latLng(57.077154, -2.782325),
      currentZoom: 11.5,
      currentCenter: latLng(57.077154, -2.782325),
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5
      },
      showMap: true
    }
  },
  computed: {
    options () {
      return {
        onEachFeature: this.onEachFeatureFunction
      }
    },
    styleFunction () {
      const fillColor = this.fillColor // important! need touch fillColor in computed for re-calculate when change fillColor
      return () => {
        return {
          weight: 2,
          color: '#ECEFF1',
          opacity: 1,
          fillColor: fillColor,
          fillOpacity: 1
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
  async created () {
    this.loading = true
    const response = await fetch('https://github.com/CodeTheCity/bioregional_dashboards/blob/main/data/geojsonshed/geoman.json')
    const data = await response.json()
    this.geojson = data
    this.loading = false
  },
  methods: {
    zoomUpdate (zoom) {
      this.currentZoom = zoom
    },
    centerUpdate (center) {
      this.currentCenter = center
    },
    showLongText () {
      this.showParagraph = !this.showParagraph
    },
    innerClick () {
      alert('River Dee Water Shed')
    }
  }
}
</script>

<style>
#open-map {
  height: 800px;
  width: 1200px;
  border: 1px solid black;
}

#map-tools {
  height: 200px;
  /* overflow: auto; */
}
</style>
