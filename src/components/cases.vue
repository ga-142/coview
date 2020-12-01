<template>
  <div class="container-fluid p-sm-4 p-md-3 h-100">
    <div class="row h-100 preloader-row" v-if="loading">
      <div class="col-12 align-self-center">
        <img src="@/assets/preloader.gif" class="preloader" />
      </div>
    </div>

    <counts v-if="today && !loading" :today="today" />

    <div class="row px-4 pt-4" v-if="daily && !loading">
      <div class="col-12 col-lg-3 text-left p-3 ">
        <div class="select-box-wrap">
          <h5>State</h5>
          <DxSelectBox
            :search-enabled="true"
            v-if="states"
            :data-source="states"
            display-expr="name"
            value-expr="abbr"
            v-model="state"
            @ValueChanged="init()"
          />
        </div>
        <div class="select-box-wrap">
          <h5>
            Enable Data Aggregation
            <DxSwitch v-model="aggEnabled" />
          </h5>
        </div>
        <div class="select-box-wrap" v-if="aggEnabled">
          <h5>Aggregation Method</h5>
          <DxSelectBox
            :data-source="aggregationFunctions"
            v-model="currentFunction"
            display-expr="displayName"
            value-expr="func"
          />
        </div>
        <div class="select-box-wrap" v-if="aggEnabled">
          <h5>Aggregation Interval</h5>
          <DxSelectBox
            :data-source="aggregationIntervals"
            v-model="currentInterval"
            display-expr="displayName"
            value-expr="interval"
          />
        </div>
      </div>
      <div class="col-12 col-lg-9 p-3 pl-lg-5 ">
        <div class="chart-wrapper">
          <DxChart
            id="chart"
            :data-source="daily"
            @legend-click="legendClickHandler($event)"
            :size="{ height: 500 }"
          >
            <DxCommonSeriesSettings :type="type" argument-field="date" />
            <DxCommonAxisSettings>
              <DxLabel :font="labelFont" />
            </DxCommonAxisSettings>
            <DxSeries
              v-for="(series, key) in dataSeries"
              :key="`${aggKey}${key}-aggKey`"
              :value-field="series.value"
              :name="series.name"
              :color="series.color"
              :visible="series.visible"
            >
              <DxAggregation :enabled="aggEnabled" :method="currentFunction" />
            </DxSeries>
            <DxMargin :bottom="20" />
            <DxArgumentAxis
              :aggregation-interval="currentInterval"
              :value-margins-enabled="false"
              argument-type="datetime"
            >
              <DxGrid :visible="false" />
            </DxArgumentAxis>
            <DxLegend
              :paddingLeftRight="30"
              :paddingTopBottom="30"
              vertical-alignment="bottom"
              horizontal-alignment="center"
              item-text-position="right"
              backgroundColor="#333"
              :columnItemSpacing="70"
              :font="legendFont"
              :markerSize="15"
            />
            <DxExport :enabled="false" />
            <DxTitle :visible="false">
              <!-- <DxSubtitle text="(Millions of Tons, Oil Equivalent)" /> -->
            </DxTitle>
            <DxTooltip :enabled="true" :customizeTooltip="customizeTooltip" />
          </DxChart>
          <p>*Click legend to show / hide series</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { ZoomCenterTransition } from "vue2-transitions";
import apiService from "@/services/apiService";
import {
  DxChart,
  DxSeries,
  DxArgumentAxis,
  DxCommonAxisSettings,
  DxLabel,
  DxCommonSeriesSettings,
  DxExport,
  DxGrid,
  DxMargin,
  DxLegend,
  DxTitle,
  DxTooltip,
  DxAggregation
} from "devextreme-vue/chart";
import DxSelectBox from "devextreme-vue/select-box";
import { DxSwitch } from "devextreme-vue/switch";
import counts from "@/components/counts.vue";
import data from "@/data/localdata.json";
export default Vue.extend({
  components: {
    DxChart,
    DxSeries,
    DxArgumentAxis,
    DxCommonSeriesSettings,
    DxLabel,
    DxCommonAxisSettings,
    DxExport,
    DxGrid,
    DxMargin,
    DxLegend,
    DxTitle,
    DxSelectBox,
    DxTooltip,
    DxAggregation,
    DxSwitch,
    counts
  },
  data() {
    return {
      labelFont: {
        family: "Open Sans",
        size: 18,
        weight: 400
      },

      legendFont: {
        family: "Open Sans",
        size: 18,
        weight: 400
      },
      aggregationIntervals: data.intervals,
      currentInterval: "week",
      aggregationFunctions: data.functions,
      currentFunction: "avg",
      aggKey: 0,
      aggEnabled: false,
      currentAgg: "avg",
      loading: true,
      daily: null,
      dataSeries: data.series,
      type: "spline",
      pallete: "Material",
      state: "USA",
      states: data.states
    };
  },
  computed: {
    today() {
      if (this.daily) {
        return this.daily[this.daily.length - 1];
      }
      return null;
    }
  },
  methods: {
    customizeTooltip(e) {
      if (e && e.valueText && e.seriesName) {
        e.valueText = e.seriesName + " " + e.valueText;
      }
      return e;
    },
    formatDate(date) {
      if (date) {
        date = `${date}`;
        const year = date.slice(0, 4);
        const month = date.slice(4, 6);
        const day = date.slice(6, 8);
        return `${year}-${month}-${day}`;
      }

      return date;
    },
    changeAgg(e) {
      this.currentAgg = e.value;
      this.aggKey++;
    },
    dataIn(data) {
      for (const key in data.reverse()) {
        data[key].date = this.formatDate(data[key].date);
        data[key].id = key;
        if (data[key].totalTestResultsIncrease < 0) {
          data[key].totalTestResultsIncrease =
            data[key].totalTestResultsIncrease * -1;
        }
        if (data[key].hospitalizedIncrease < 0) {
          data[key].hospitalizedIncrease = data[key].hospitalizedIncrease * -1;
        }
      }
      return data;
    },
    async init() {
      this.loading = true;
      let res;
      if (this.state === "USA") {
        res = await apiService.getUSA();
      } else {
        res = await apiService.getState(this.state);
      }
      this.daily = await this.dataIn(res.data);
      this.loading = false;
    },
    legendClickHandler(e: any) {
      if (e && e.target && e.target.name) {
        const series = this.dataSeries.find(itm => {
          return itm.name === e.target.name;
        });
        if (series) {
          series.visible = !series.visible;
        }
      }
    }
  },
  created() {
    this.init();
  }
});
</script>
<style lang="scss" scoped>
.select-box-wrap {
  display: block;
  position: relative;
  padding: 0.75em 0;
}
.preloader {
  display: block;
  width: 7em;
  margin: 0 auto;
}
.chart-wrapper {
  display: block;
  width: 100%;
}
.preloader-row {
  margin-top: -66px;
}
.chart-wrapper ::v-deep .dxc-item g {
  cursor: pointer;
}
</style>
