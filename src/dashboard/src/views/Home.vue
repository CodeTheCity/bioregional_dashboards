<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome, what kind of dashboard would you like to build?"/>
    <Start-Dashboard></Start-Dashboard>
    <Clone-Dashboard></Clone-Dashboard>
    <Match-Bioregion></Match-Bioregion>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import StartDashboard from '@/components/setup/inputBox.vue'
import CloneDashboard from '@/components/setup/cloneBoard.vue'
import MatchBioregion from '@/components/setup/matchBioregion.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    StartDashboard,
    CloneDashboard,
    MatchBioregion
  }
}
</script>
