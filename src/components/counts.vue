<template>
  <div id="counts" class="container-fluid">
    <div class="row text-left px-4 pt-4" v-if="today">
      <div class="col-sm-12 col-md grey-border pt-2">
        <h2>Cases</h2>
        <h2 class="huge">
          {{ today.positive | numFormat }}
        </h2>
      </div>
      <div class="col-md col-sm-12 grey-border pt-2">
        <h2>Hospitalized</h2>
        <h2 class="huge">
          {{ today.hospitalizedCurrently | numFormat }}
        </h2>
      </div>
      <div class="col-md col-sm-12 grey-border pt-2">
        <h2>Deaths</h2>
        <h2 class="huge">
          {{ today.death | numFormat }}
        </h2>
      </div>

      <div class="col-md col-sm-12 grey-border pt-2">
        <h2>CFR</h2>
        <h2 class="huge">
          {{ Math.round((today.death / today.positive) * 10000) / 100 }}%
        </h2>
      </div>
      <div class="col-md col-sm-12 grey-border pt-2">
        <h5>
          Last Updated:
          {{ today.lastUpdateEt ? today.lastUpdateEt : today.date }}
        </h5>
        <h5>
          Data Quality Grade:
          {{ today.dataQualityGrade ? today.dataQualityGrade : "N/A" }}
        </h5>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    today: Object
  }
});
</script>
<style lang="scss" scoped>
#counts {
  h2 {
    display: block;
  }
  h2.huge {
    font-size: 4em;
    font-weight: 600;
  }
}
</style>
