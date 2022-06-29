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

</script>

<style scoped lang="scss">
</style>
