<template>
  <el-card shadow="never">
    <el-row>
      <el-col :span="14">
        <div class="flex items-center">
          <div>
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
          </div>
          <div>
            <div class="greeting-message">{{ greetingMessage }}</div>
          </div>
        </div>
      </el-col>
      <el-col :span="7" :offset="3">
        <div class="flex items-center text-center">
          <el-space wrap :size="30" spacer="|">
            <div class="to-do-items">
              <div class="title">待办事项</div>
              <div class="count">10</div>
            </div>
            <div class="unread-message">
              <div class="title">未读消息</div>
              <div class="count">3</div>
            </div>
          </el-space>
        </div>
      </el-col>
    </el-row>
  </el-card>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span>快捷操作</span>
      </div>
    </template>
    <div class="flex items-center text-center toolbar">
      <el-space wrap :size="50">
        <div class="item">
          <div class="icon icon-to-do">
            <el-icon>
              <List />
            </el-icon>
          </div>
          <div class="text">待办事项</div>
        </div>
        <div class="item">
          <div class="icon icon-statistics">
            <el-icon>
              <Histogram />
            </el-icon>
          </div>
          <div class="text">统计分析</div>
        </div>
        <div class="item">
          <div class="icon icon-message">
            <el-icon>
              <Message />
            </el-icon>
          </div>
          <div class="text">未读消息</div>
        </div>
        <div class="item">
          <div class="icon icon-profile">
            <el-icon>
              <Avatar />
            </el-icon>
          </div>
          <div class="text">个人中心</div>
        </div>
      </el-space>
    </div>
  </el-card>
  <el-row :gutter="8">
    <el-col :span="12">
      <el-card shadow="never">
        <template #header>
          <div class="card-header">
            <span>待办事项</span>
            <el-button class="button" link>更多</el-button>
          </div>
        </template>
        <el-table :data="toDoItemsConfig.data" style="width: 100%" @row-click="toDoItemsConfig.handleRowClick">
          <el-table-column prop="title" label="标题" />
          <el-table-column prop="status" label="状态" width="120" />
          <el-table-column prop="lastSubmitTime" label="最后提交时间" width="180" />
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card shadow="never">
        <template #header>
          <div class="card-header">
            <span>系统公告</span>
            <el-button class="button" link>更多</el-button>
          </div>
        </template>
        <el-table :data="systemNotificationConfig.data" style="width: 100%"
          @row-click="systemNotificationConfig.handleRowClick">
          <el-table-column prop="title" label="标题" />
          <el-table-column prop="date" label="发布日期" width="180" />
        </el-table>
      </el-card>
    </el-col>
  </el-row>
  <el-card shadow="never" class="mt-8">
    <template #header>
      <div class="card-header">
        <span>流量统计</span>
      </div>
    </template>
    <ex-chart :width="chartConfig.width" :height="chartConfig.height" :option="chartConfig.option">
    </ex-chart>
  </el-card>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { ElMessageBox, ElNotification } from 'element-plus'
import ExChart from '@/components/ExChart.vue'

const nickname = '初冬十月'
const greetingMessage = ref('')
const getGreeting = () => {
  let greeting: string
  const hour = new Date().getHours()
  if (hour > 5 && hour <= 8) {
    // 早晨
    greeting = `早上好，${nickname}，开始您一天的工作吧！`
  } else if (hour > 8 && hour <= 11) {
    // 上午
    greeting = `上午好，${nickname}，今天也要努力哦！`
  } else if (hour > 11 && hour <= 13) {
    // 中午
    greeting = `中午好，${nickname}，再忙也要好好吃饭、午休呀！`
  } else if (hour > 13 && hour <= 16) {
    // 下午
    greeting = `下午好，${nickname}，好好工作哦！`
  } else if (hour > 16 && hour <= 19) {
    // 傍晚
    greeting = `傍晚好，${nickname}，打起精神，尽快完成工作，早点回家吃饭吧！`
  } else if (hour > 19 && hour <= 24) {
    // 晚上
    greeting = `晚上好，${nickname}，劳逸结合，干活不累！`
  } else {
    // 凌晨
    greeting = `夜已深，${nickname}，请注意休息哦！`
  }
  return greeting
}
onMounted(() => {
  greetingMessage.value = getGreeting()
  setInterval(() => {
    const message = getGreeting()
    if (greetingMessage.value !== message) {
      greetingMessage.value = message
    }
  }, 10000)

  setInterval(() => {
    ElNotification({
      title: '待办提醒',
      message: '您有新的待办事项，请及时处理！',
      position: 'bottom-right',
      type: 'warning'
    })
  }, 10000)
})

const toDoItemsConfig = {
  data: [
    {
      title: '待办事项待办事项',
      status: '1',
      lastHandleTime: '2022-07-01 00:07:32',
      lastSubmitTime: '2022-07-01 00:07:32'
    },
    {
      title: '待办事项待办事项',
      status: '2',
      lastHandleTime: '2022-07-01 00:07:32',
      lastSubmitTime: '2022-07-01 00:07:32'
    },
    {
      title: '待办事项待办事项',
      status: '1',
      lastHandleTime: '2022-07-01 00:07:32',
      lastSubmitTime: '2022-07-01 00:07:32'
    },
    {
      title: '待办事项待办事项',
      status: '3',
      lastHandleTime: '2022-07-01 00:07:32',
      lastSubmitTime: '2022-07-01 00:07:32'
    }
  ],
  handleRowClick: (row: any, column: any, event: any) => {
    ElMessageBox.alert('待办事项内容待办事项内容', '待办事项详情', {
      confirmButtonText: '处理',
      showClose: false
    })
  }
}

const systemNotificationConfig = {
  data: [
    {
      title: '系统公告标题系统公告标题',
      date: '2022-06-30'
    },
    {
      title: '系统公告标题系统公告标题',
      date: '2022-06-30'
    },
    {
      title: '系统公告标题系统公告标题',
      date: '2022-06-30'
    },
    {
      title: '系统公告标题系统公告标题',
      date: '2022-06-30'
    }
  ],
  handleRowClick: (row: any, column: any, event: any) => {
    ElMessageBox.alert('系统公告内容系统公告内容', '系统公告详情', {
      confirmButtonText: '我知道了',
      showClose: false
    })
  }
}

function randomArray(len: number, min: number, max: number): number[] {
  return Array.from({ length: len }, v => Math.floor(Math.random() * (max - min)) + min)
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
<style lang="scss" scoped>
.mt-8 {
  margin-top: 8px;
}

.el-card:not(:last-child) {
  margin-bottom: 8px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.greeting-message {
  font-size: 1.25rem;
  line-height: 1.75rem;
  padding-left: 1rem;
}

.to-do-items .title,
.unread-message .title {
  font-size: 1.25rem;
}

.to-do-items .count,
.unread-message .count {
  padding-top: 3px;
}

.toolbar {
  cursor: pointer;

  .item {
    .icon {
      &.icon-to-do {
        color: rgb(255, 192, 105);
      }

      &.icon-statistics {
        color: rgb(105, 192, 255);
      }

      &.icon-message {
        color: rgb(92, 219, 211);
      }

      &.icon-profile {
        color: #909399;
      }

      .el-icon {
        font-size: 36px;
      }
    }

    .text {
      font-size: 14px;
    }
  }
}
</style>
