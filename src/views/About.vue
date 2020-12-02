<template>
  <div class="about container">
    <div class="row p-4">
      <div class="col text-left">
        <h1 class="mb-3">About Coview</h1>
        <p>
          Coview is a US Covid-19 tracking dashboard utilizing data from
          <a href="https://covidtracking.com/">The Covid Tracking Project</a>,
          <a href="https://vuejs.org/">Vue.js</a> &
          <a href="https://js.devexpress.com/">DevExtreme</a>. Coview was
          created over a weekend primarily because the creator is currently
          under lockdown restrictions, and the bars are closed. Coview is
          strictly for entertainment purposes only, and the author accepts no
          responsibility for the accuracy or use of the data provided.
        </p>
        <p>
          This work is licensed under a
          <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
            >Attribution-NonCommercial-ShareAlike 4.0 International.</a
          >
          The code base is available on
          <a href="https://github.com/ga-142/coview">Github</a>.
        </p>
        <h3>Features</h3>
        <img src="@/assets/coview-min.png" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>
<style lang="scss" scoped>
img {
  display: block;
  max-width: 100%;
  height: auto;
  padding: 1em 0;
}
</style>
