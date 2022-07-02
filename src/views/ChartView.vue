<template>
  <el-row>
    <el-col :span="12">
      <ex-chart :width="barChartConfig.width" :height="barChartConfig.height" :option="barChartConfig.option">
      </ex-chart>
    </el-col>
    <el-col :span="12">
      <ex-chart :width="lineChartConfig.width" :height="lineChartConfig.height" :option="lineChartConfig.option">
      </ex-chart>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="8">
      <ex-chart :width="pieChartConfig.width" :height="pieChartConfig.height" :option="pieChartConfig.option">
      </ex-chart>
    </el-col>
    <el-col :span="8">
      <ex-chart :width="donutChartConfig.width" :height="donutChartConfig.height" :option="donutChartConfig.option">
      </ex-chart>
    </el-col>
    <el-col :span="8">
      <ex-chart :width="roseChartConfig.width" :height="roseChartConfig.height" :option="roseChartConfig.option">
      </ex-chart>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="24">
      <ex-chart :width="chartConfig.width" :height="chartConfig.height" :option="chartConfig.option">
      </ex-chart>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import ExChart from '@/components/ExChart.vue'

// 柱状图
const barChartConfig = {
  width: '100%',
  height: '300px',
  option: {
    xAxis: {
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {},
    series: [
      {
        type: 'bar',
        data: [23, 24, 18, 25, 27, 28, 25]
      }
    ]
  }
}

// 折线图
const lineChartConfig = {
  width: '100%',
  height: '300px',
  option: {
    xAxis: {
      type: 'category',
      data: ['A', 'B', 'C']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150],
        type: 'line'
      }
    ]
  }
}

// 饼图
const pieChartConfig = {
  width: '100%',
  height: '300px',
  option: {
    series: [
      {
        type: 'pie',
        data: [
          {
            value: 335,
            name: '直接访问'
          },
          {
            value: 234,
            name: '联盟广告'
          },
          {
            value: 1548,
            name: '搜索引擎'
          }
        ]
      }
    ]
  }
}

// 圆环图
const donutChartConfig = {
  width: '100%',
  height: '300px',
  option: {
    // title: {
    //   text: '圆环图的例子',
    //   left: 'center',
    //   top: 'center'
    // },
    series: [
      {
        type: 'pie',
        data: [
          {
            value: 335,
            name: 'A'
          },
          {
            value: 234,
            name: 'B'
          },
          {
            value: 1548,
            name: 'C'
          }
        ],
        radius: ['40%', '70%']
      }
    ]
  }
}

// 南丁格尔图（玫瑰图）
const roseChartConfig = {
  width: '100%',
  height: '300px',
  option: {
    series: [
      {
        type: 'pie',
        data: [
          {
            value: 100,
            name: 'A'
          },
          {
            value: 200,
            name: 'B'
          },
          {
            value: 300,
            name: 'C'
          },
          {
            value: 400,
            name: 'D'
          },
          {
            value: 500,
            name: 'E'
          }
        ],
        roseType: 'area'
      }
    ]
  }
}

const chartConfig = {
  width: '100%',
  height: '300px',
  option: {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        lineStyle: {
          width: 1,
          color: '#019680'
        }
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: [
        '6:00',
        '7:00',
        '8:00',
        '9:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
        '19:00',
        '20:00',
        '21:00',
        '22:00',
        '23:00'
      ],
      splitLine: {
        show: true,
        lineStyle: {
          width: 1,
          type: 'solid',
          color: 'rgba(226,226,226,0.5)'
        }
      },
      axisTick: {
        show: false
      }
    },
    yAxis: [
      {
        type: 'value',
        max: 80000,
        splitNumber: 4,
        axisTick: {
          show: false
        },
        splitArea: {
          show: true,
          areaStyle: {
            color: ['rgba(255,255,255,0.2)', 'rgba(226,226,226,0.2)']
          }
        }
      }
    ],
    grid: { left: '1%', right: '1%', top: '2  %', bottom: 0, containLabel: true },
    series: [
      {
        smooth: true,
        data: [
          111, 222, 4000, 18000, 33333, 55555, 66666, 33333, 14000, 36000, 66666, 44444,
          22222, 11111, 4000, 2000, 500, 333, 222, 111
        ],
        type: 'line',
        areaStyle: {},
        itemStyle: {
          color: '#5ab1ef'
        }
      },
      {
        smooth: true,
        data: [
          33, 66, 88, 333, 3333, 5000, 18000, 3000, 1200, 13000, 22000, 11000, 2221, 1201,
          390, 198, 60, 30, 22, 11
        ],
        type: 'line',
        areaStyle: {},
        itemStyle: {
          color: '#019680'
        }
      }
    ]
  }
}

</script>

<style scoped lang="scss">
</style>
