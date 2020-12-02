<template>
  <div id="app" class="h-100">
    <div id="nav">
      <h1 class="extra-bold text-left"><i class="fas fa-virus"></i> Coview</h1>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
    <DxPopup
      :visible="!tutorial"
      :drag-enabled="false"
      :close-on-outside-click="false"
      :show-title="false"
      :width="popupWidth"
      :height="popupHeight"
      title="Information"
    >
      <div class="tut-wrap p-2">
        <h1 class="text-center">Tutorial</h1>
        <fade-transition group>
          <div key="tut1" v-if="tutPhase === 0">
            <p>Select a specific state or view entire United States</p>
            <img src="@/assets/select-min.jpg" rel="preload" />
          </div>
          <div key="tut2" v-if="tutPhase === 1">
            <p class="small">
              Enable data aggregation, helps smooth the chart. You can change
              both the aggregation interval and function.
            </p>
            <img src="@/assets/aggs-min.jpg" rel="preload" />
          </div>
          <div key="tut3" v-if="tutPhase === 2">
            <p class="small">
              <strong>Important:</strong> Show or hide a data series by clicking
              the corresponding legend; this important because some series are
              not really visible at the same time as others.
            </p>
            <img src="@/assets/legend-min.jpg" rel="preload" />
          </div>
        </fade-transition>
        <div class="row tut-controls">
          <div class="col text-left">
            <div v-if="tutPhase > 0" @click="tutPhase--" class="tut-prev">
              <i class="fas fa-arrow-alt-circle-left"></i> Previous
            </div>
          </div>
          <div class="col text-right">
            <div v-if="tutPhase < 2" @click="tutPhase++" class="tut-next">
              Next <i class="fas fa-arrow-alt-circle-right"></i>
            </div>
            <div v-if="tutPhase === 2" @click="gotIt" class="tut-next">
              Got It! <i class="fas fa-thumbs-up"></i>
            </div>
          </div>
        </div>
      </div>
    </DxPopup>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { DxPopup } from "devextreme-vue/popup";
import { FadeTransition } from "vue2-transitions";

export default Vue.extend({
  components: {
    DxPopup,
    FadeTransition
  },
  data() {
    return {
      tutorial: false,
      windowWidth: null,
      windowHeight: null,
      tutPhase: 0
    };
  },
  computed: {
    popupWidth() {
      if (this.windowWidth) {
        if (this.windowWidth > 500) {
          return 500;
        }
        return this.windowWidth - 30;
      }
      return null;
    },
    popupHeight() {
      if (this.windowHeight) {
        if (this.windowHeight > 600) {
          return 600;
        }
        return this.windowHeight - 30;
      }
      return null;
    }
  },
  methods: {
    gotIt() {
      this.tutorial = true;
      localStorage.setItem("tutorial", JSON.stringify(this.tutorial));
    },
    getWindowWidth(event) {
      this.windowWidth = document.documentElement.clientWidth;
    },
    getWindowHeight(event) {
      this.windowHeight = document.documentElement.clientHeight;
    },
    init() {
      this.tutorial = JSON.parse(localStorage.getItem("tutorial"));
    }
  },
  created() {
    this.init();
  },
  mounted() {
    this.getWindowWidth();
    this.getWindowHeight();
    window.addEventListener("resize", this.getWindowWidth);
    window.addEventListener("resize", this.getWindowHeight);
  }
});
</script>
<style>
#app {
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #dedede;
}
.grey-border {
  border: solid 1px #555;
}
h1,
h2,
h3,
h4,
h5 {
  color: #dedede;
}
#nav h1.extra-bold {
  display: inline-block;
  font-weight: 800;
  margin-right: 3em;
  margin-bottom: 0;
}
#nav h1.extra-bold i {
  color: #ce463f;
}
#nav {
  text-align: left;
  padding: 13px 30px;
  background-color: #202020;
}

#nav a {
  padding: 0 1em;
  font-size: 1.3em;
  font-weight: bold;
  color: #dedede;
}

#nav a.router-link-exact-active {
  color: #f4b25c;
}
html,
body {
  background-color: #2a2a2a;
  height: 100%;
}
.h-100 {
  height: 100%;
}
.tut-wrap {
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
}
.tut-wrap img {
  display: block;
  max-width: 100%;
  margin: 0.6em 0;
}
.tut-wrap p {
  text-align: center;
  padding: 0.5em;
  font-size: 1.3em;
}
.tut-wrap p.small {
  font-size: 1.15em;
}
.tut-controls {
  position: absolute;
  width: 100%;
  bottom: 0;
}

.tut-next,
.tut-prev {
  font-size: 1.5em;
  padding: 1em;
  cursor: pointer;
}
@media only screen and (max-width: 600px) {
  .tut-controls {
    font-size: 0.7em;
  }
}
</style>
