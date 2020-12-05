<template>
  <div id="medium-view">
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
        <img alt="3D simulation" src="../../../assets/riverdeeshed3d.png">
      </template>
      <template v-slot:submit-form>
        <button>Close</button>
      </template>
    </medium-modal>
  </div>
</template>

<script>
// @ is an alias to /src
import MediumModal from '@/components/board/medium/mediumModal.vue'

export default {
  name: 'vis-medium',
  components: {
    MediumModal
  },
  data: () => ({
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
    mediumThreeD () {
      console.log()
      console.log('Three D modal please')
    },
    ThreeDView () {
      this.isModalVisible = true
    },
    closeModal () {
      this.isModalVisible = false
    }
  }
}
</script>

<style>
</style>
