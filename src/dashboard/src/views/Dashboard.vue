<template>
  <div class="dashboard">
    <header>Dashboard</header>
    <div id="tools-holder">
      <div id="tools-top">
        Top board
      </div>
      <div id="acitve-board">
        <img alt="Vue logo" src="../assets/riverdeeshed.png">
      </div>
      <div id="bottom-tools">
        <header>Bottom tools</header>
        <Moveable
          class="moveable"
          v-bind="moveable"
          @drag="handleDrag"
          @resize="handleResize"
          @scale="handleScale"
          @rotate="handleRotate"
          @warp="handleWarp"
        >
          <span>Vue Moveable</span>
        </Moveable>
        <div class="buttons able">
          <a
            href="#"
            v-for="(state, key) in states"
            :key="key"
            :class="{ selected: currentState === key }"
            @click="currentState = key"
          >{{ state }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Moveable from '@/components/board/moveable/moveable.vue'

export default {
  name: 'Dashboard',
  components: {
    Moveable
  },
  data: () => ({
    moveable: {
      draggable: true,
      throttleDrag: 1,
      resizable: false,
      throttleResize: 1,
      keepRatio: false,
      scalable: true,
      throttleScale: 0.01,
      rotatable: true,
      throttleRotate: 0.2,
      pinchable: true,
      origin: false
    },
    states: {
      scalable: 'Scalable',
      resizable: 'Resizable',
      warpable: 'Warpable'
    },
    currentState: 'scalable'
  }),
  methods: {
    handleDrag ({ target, transform }) {
      console.log('onDrag', transform)
      target.style.transform = transform
    },
    handleResize ({ target, width, height }) {
      console.log('onResize', width, height)
      target.style.width = `${width}px`
      target.style.height = `${height}px`
    },
    handleScale ({ target, transform }) {
      console.log('onScale', transform)
      target.style.transform = transform
    },
    handleRotate ({ target, transform }) {
      console.log('onRotate', transform)
      target.style.transform = transform
    },
    handleWarp ({ target, transform }) {
      console.log('onWarp', transform)
      target.style.transform = transform
    },
    clearAllStates () {
      Object.keys(this.states).forEach((key) => {
        this.moveable[key] = false
      })
    }
  },
  watch: {
    currentState (newState) {
      this.clearAllStates()
      this.moveable[newState] = true
    }
  }
}
</script>
