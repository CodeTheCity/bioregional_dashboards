<template>
  <div class="dashboard">
    <header>Dashboard</header>
    <div id="tools-holder">
      <div id="tools-top">
        <ul>
          <li class="tools-power">SCALE</li>
          <li class="tools-power">Bioregion</li>
          <li class="tools-power">River Dee Watershed</li>
          <li class="tools-power">Add</li>
          <li class="tools-power">Story</li>
        </ul>
      </div>
      <div id="story-board">
        <ul>
          <li class="story-stage">50 years ago</li>
          <li class="story-stage">20 years ago</li>
          <li class="story-stage">This year</li>
          <li class="story-stage-future">20 years future</li>
          <li class="story-stage-future">50 years future</li>
          <li><button @click.prevent="startStory" class="button is-primary">Play story</button></li>
          <li class="tools-story">Record Story</li>
        </ul>
      </div>
      <div id="acitve-board">
        <img alt="Vue logo" src="../assets/riverdeeshed.png">
        <div id="filter-tools">
          <ul>
            <li class="tools-filter">Waterflow</li>
            <li class="tools-filter">Rainfall</li>
            <li class="tools-power">Brids</li>
            <li class="tools-power">Soil</li>
            <li class="tools-power">ADD</li>
          </ul>
        </div>
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

<style>
.moveable {
  display: inline-block;
  border: 2px solid red;
}

ul li {
  display: inline;
}

.tools-power {
  margin: 1em;
}

.story-stage {
  border: 2px solid green;
  margin-right: 1em;
  padding: 1em;
}

.story-stage-future {
  border: 2px solid orange;
  margin-right: 1em;
  padding: 1em;
}

#filter-tools {
  display: inline;
}

</style>
