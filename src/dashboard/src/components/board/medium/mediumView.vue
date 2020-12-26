<template>
  <div id="medium-view"> --{{ mapAPI }}
    <button type="button" class="btn" @click="TwoDView()">{{ mediumTwoD.text }}</button>
    <button type="button" class="btn" @click="ThreeDView()">{{ medium3D.text }}</button>
    <button type="button" class="btn" @click="AugReality()">{{ mediumAug.text }}</button>
    <medium-modal v-show="isModalVisible" @close="closeModal">
      <template v-slot:header>
      <!-- The code below goes into the header slot -->
        Medium
      </template>
      <template v-slot:title-form>
        3D view & simulation
      </template>
      <template v-slot:input-form>
        <!-- <img alt="3D simulation" src="../../../assets/riverdeeshed3d.png"> -->
        <div style="position: absolute; width: 80%; height: 50%;" id="container"></div>
      </template>
      <template v-slot:submit-form>
      </template>
    </medium-modal>
  </div>
</template>

<script>
// @ is an alias to /src
import MediumModal from '@/components/board/medium/mediumModal.vue'
import Procedural from 'procedural-gl'

export default {
  name: 'vis-medium',
  components: {
    MediumModal
  },
  data: () => ({
    mapAPI: 'test',
    mediumTwoD:
    {
      text: '2D',
      medium: 'twod'
    },
    medium3D:
    {
      text: '3D',
      medium: 'threed'
    },
    mediumAug:
    {
      text: 'AR',
      medium: 'augreality'
    },
    isModalVisible: false
  }),
  methods: {
    mediumAR () {
      console.log('AR please')
    },
    ThreeDView () {
      // toggle off 2d map
      this.$store.dispatch('actionHideMap', false)
      this.isModalVisible = true
      let container = document.getElementById('container')
      let NASADEM_APIKEY = '1816d9f03375642d8a3b30f8ca1e85ba1'
      let LINZ_APIKEY = 'tc6koslEGHaZXA5jLNDE'
      let datasource = {
        elevation: {
          apiKey: NASADEM_APIKEY
        },
        imagery: {
          apiKey: LINZ_APIKEY,
          urlFormat: 'https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key={apiKey}',
          attribution: '<a href="https://www.maptiler.com/copyright/">Maptiler</a> <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }
      }
      Procedural.init({ container, datasource })
      Procedural.setRotationControlVisible(true)

      // Load real-world location 57.0740532,-2.7823562,14z
      const deeWatershed = { latitude: 57.0740532, longitude: -2.7823562 }
      Procedural.displayLocation(deeWatershed)
      let featureCollection = {
        'name': 'example',
        'type': 'FeatureCollection',
        'features': [
          {
            'id': 0,
            'type': 'Feature',
            'geometry': {
              'type': 'LineString',
              'coordinates': [
                [-2.080536, 57.159334], [-2.1492, 57.159334], [-2.212372, 57.135494], [-2.342834, 57.161568], [-2.481537, 57.182413], [-2.536469, 57.183902], [-2.669678, 57.176459], [-2.671051, 57.156354], [-2.698517, 57.142946], [-2.739716, 57.148906], [-2.793274, 57.157099], [-2.839966, 57.179436], [-2.90863, 57.175714], [-2.980042, 57.170503], [-3.014374, 57.158589], [-3.048706, 57.154865], [-3.059692, 57.15114], [-3.081665, 57.146671], [-3.124237, 57.128786], [-3.138657, 57.125805], [-3.221054, 57.12655], [-3.337784, 57.107911], [-3.402328, 57.088515], [-3.46344, 57.084411], [-3.494339, 57.078814], [-3.691406, 57.058657], [-3.795776, 57.058657], [-3.812256, 57.007842], [-3.817749, 56.991387], [-3.79303, 56.976421], [-3.78479, 56.915], [-3.650208, 56.907503], [-3.496399, 56.937483], [-3.408508, 56.956957], [-3.370056, 56.928491], [-3.218994, 56.943476], [-3.109131, 56.944974], [-2.938843, 56.944974], [-2.919617, 56.932987], [-2.892151, 56.923995], [-2.815247, 56.909002], [-2.790527, 56.907503], [-2.455444, 56.983905], [-2.323608, 57.007842], [-2.186279, 57.06015], [-2.084656, 57.095976], [-2.080536, 57.159334]
              ]
            },
            'properties': {
              'color': '#f30e32'
            }
          }
        ]
      }
      Procedural.addOverlay(featureCollection)
    },
    closeModal () {
      this.isModalVisible = false
    }
  }
}
</script>

<style>
</style>
