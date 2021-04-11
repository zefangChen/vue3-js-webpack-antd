<template>
  <div class="wrap">
    <a-card title="柱状图" style="margin-bottom: 20px;">
      <v-chart style="height: 400px;" :option="barChartData" autoresize />
    </a-card>

    <a-card title="饼图" style="margin-bottom: 20px;">
      <v-chart style="height: 400px;" :option="pieChartData" autoresize />
    </a-card>

    <a-card title="折线图1" style="margin-bottom: 20px;">
      <div>
        <v-chart style="height: 400px;" :option="lineChartData" autoresize />
      </div>
    </a-card>

    <a-card title="折线图2" style="margin-bottom: 20px;">
      <div>
        <v-chart style="height: 400px;" :option="lineOptions" autoresize />
      </div>
    </a-card>

  </div>
</template>

<script>
import {
  defineComponent,
  reactive,
  toRefs,
  nextTick,
  onMounted
} from "vue";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart, LineChart, BarChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  PolarComponent
} from "echarts/components";
import VChart from "vue-echarts";
import { useStore } from "vuex";

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  LineChart,
  PolarComponent,
  BarChart
]);

export default defineComponent({
  name: "index",
  components: {
    VChart
  },
  setup() {
    const store = useStore()

    let getData = () => {
      let data = [];
      for (let i = 0; i <= 360; i++) {
        let t = i / 180 * Math.PI;
        let r = Math.sin(2 * t) * Math.cos(2 * t);
        data.push([r, i]);
      }

      return data;
    };

    let refData = reactive({
      barChartData: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          barWidth: '30px',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }]
      },
      pieChartData: {
        title: {
          text: "Traffic Sources",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
          {
            name: "Traffic Sources",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "Direct" },
              { value: 310, name: "Email" },
              { value: 234, name: "Ad Networks" },
              { value: 135, name: "Video Ads" },
              { value: 1548, name: "Search Engines" }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      },
      lineChartData: {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: "line",
          smooth: true
        }]
      },
      lineOptions: {
        darkMode: true,
        backgroundColor: '#100C2A',
        title: {
          text: ''
        },
        legend: {
          data: ['line']
        },
        polar: {
          center: ['50%', '54%']
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        angleAxis: {
          type: 'value',
          startAngle: 0
        },
        radiusAxis: {
          min: 0
        },
        series: [{
          coordinateSystem: 'polar',
          name: 'line',
          type: 'line',
          showSymbol: false,
          data: getData()
        }],
        animationDuration: 2000
      }
    });

    let setBreadcrumb = ()=>{
      let breadcrumbList = [
        {path: '', name: '', mete: {title: '组件示例'}},
        {path: '/component/table', name: 'table', mete: {title: '表格'}},
      ]
      store.commit('setBreadcrumb', breadcrumbList)
    }

    onMounted(() => {
      setBreadcrumb()
    })

    return {
      ...toRefs(refData)
    };
  }

});
</script>

<style lang="less" scoped>

</style>
