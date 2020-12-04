<template>
  <div id="data-flow">
    <div id="water-tools">
      <header>Data tools</header>
      <Moveable
        class="moveable"
        v-bind="moveable"
        @drag="handleDrag"
        @resize="handleResize"
        @scale="handleScale"
        @rotate="handleRotate"
        @warp="handleWarp"
      >
        <span>
          <iframe frameborder="0" width="300" height="446" src="https://gaugemap.blob.core.windows.net/gaugemapwidgets/4250-2442-1-300x446.html"></iframe>
        </span>
      </Moveable>
      <Moveable
        class="moveable"
        v-bind="moveable"
        @drag="handleDrag"
        @resize="handleResize"
        @scale="handleScale"
        @rotate="handleRotate"
        @warp="handleWarp"
      >
        <span>
          <iframe frameborder="0" width="300" height="446" src="https://gaugemap.blob.core.windows.net/gaugemapwidgets/4297-2489-1-300x446.html"></iframe>
        </span>
      </Moveable>
      <Moveable
        class="moveable"
        v-bind="moveable"
        @drag="handleDrag"
        @resize="handleResize"
        @scale="handleScale"
        @rotate="handleRotate"
        @warp="handleWarp"
      >
        <span>
          <iframe frameborder="0" width="300" height="446" src="https://gaugemap.blob.core.windows.net/gaugemapwidgets/4148-2341-1-300x446.html"></iframe>
        </span>
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
    <!-- <div id="bottom-tools-waterflow">
      <header>Bottom tools waterflow</header>
      <Moveable
        class="moveable"
        v-bind="moveable"
        @drag="handleDrag"
        @resize="handleResize"
        @scale="handleScale"
        @rotate="handleRotate"
        @warp="handleWarp"
      >
        <span>
          <img alt="tools" src="../../assets/deeflow1.png">
        </span>
      </Moveable>
      <Moveable
        class="moveable"
        v-bind="moveable"
        @drag="handleDrag"
        @resize="handleResize"
        @scale="handleScale"
        @rotate="handleRotate"
        @warp="handleWarp"
      >
        <span>
          <img alt="tools" src="../../assets/deeflow2.png">
        </span>
      </Moveable>
      <Moveable
        class="moveable"
        v-bind="moveable"
        @drag="handleDrag"
        @resize="handleResize"
        @scale="handleScale"
        @rotate="handleRotate"
        @warp="handleWarp"
      >
        <span>
          <img alt="tools" src="../../assets/1993dashboard.png">
        </span>
      </Moveable>
    </div>
    <div id="bottom-tools-birds">
      <header>Bottom tools birds</header>
      <Moveable
        class="moveable"
        v-bind="moveable"
        @drag="handleDrag"
        @resize="handleResize"
        @scale="handleScale"
        @rotate="handleRotate"
        @warp="handleWarp"
      >
        <span>
          <img alt="tools" src="../../assets/birdscot183-1960.png">
        </span>
      </Moveable>
      <Moveable
        class="moveable"
        v-bind="moveable"
        @drag="handleDrag"
        @resize="handleResize"
        @scale="handleScale"
        @rotate="handleRotate"
        @warp="handleWarp"
      >
        <span>
          <img alt="tools" src="../../assets/19883-1980.png">
        </span>
      </Moveable>
      <Moveable
        class="moveable"
        v-bind="moveable"
        @drag="handleDrag"
        @resize="handleResize"
        @scale="handleScale"
        @rotate="handleRotate"
        @warp="handleWarp"
      >
        <span>
          <img alt="tools" src="../../assets/birdscotland1883-2010.png">
        </span>
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
    </div> -->
  </div>
</template>

<script>
// @ is an alias to /src
import Moveable from '@/components/board/moveable/moveable.vue'

export default {
  name: 'data-flow',
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
    currentState: 'scalable',
    liveStorytools: false,
    mapState: true
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
    },
    viewStage (ev) {
      console.log(ev)
      console.log('stage clicked')
      this.mapState = !this.mapState
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

<style>
</style>
