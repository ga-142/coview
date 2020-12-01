<template>
  <div class="home h-100">
    <cases />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import news from "@/components/news.vue";
import { Component, Prop, Vue } from "vue-property-decorator";

import cases from "@/components/cases.vue";

export default Vue.extend({
  components: {
    cases
  }
});
</script>
