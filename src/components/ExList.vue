<template>
  <!-- 搜索表单 -->
  <ex-form :isSearchForm="true" :labelWidth="formLabelWidth" :formItems="formItems" :formData="formData"
    @submitForm="submitForm" @resetForm="resetForm" />
  <!-- 操作按钮 -->
  <el-button-group>
    <template v-for="(button, index) in tableButtons">
      <el-button v-if="!button.children" :key="index + 'button'" :type="button.type" :icon="button.icon"
        @click="button.click">
        {{ button.text }}
      </el-button>
      <el-dropdown v-else :key="index + 'dropdown-button'">
        <el-button :type="button.type">
          {{ button.text }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="(childButton, childIndex) in button.children" :key="childIndex"
              @click="childButton.click">
              {{ childButton.text }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </template>
  </el-button-group>
  <!-- 表格 -->
  <el-config-provider :locale="locale">
    <el-table ref="tableRef" :data="records" style="width: 100%" :height="tableHeight"
      @filter-change="handleFilterChange" @selection-change="handleSelectionChange" :row-class-name="tableRowClassName"
      :border="tableBorder" :key="tableKey">
      <template v-for="(item, index) in tableColumns">
        <!-- 显示多选框 -->
        <el-table-column v-if="item.type === 'selection'" type="selection" width="50" fixed="left" align="center"
          :key="index + 'selection'" />
        <!-- 显示该行的索引（从 1 开始计算） -->
        <el-table-column v-else-if="item.type === 'index'" type="index" width="50" fixed="left" align="center"
          :key="index + 'index'" />
        <!-- 显示为一个可展开的按钮 -->
        <el-table-column v-else-if="item.type === 'expand'" type="expand" width="50" fixed="left" align="center"
          :key="index + 'expand'" />
        <!-- 自定义内容 -->
        <slot v-else-if="item.type === 'slot'" show-overflow-tooltip :name="item.slot" :fixed="item.fixed"
          :height="item.height">
        </slot>
        <!-- 常规字段 -->
        <el-table-column v-else show-overflow-tooltip v-bind="item" :min-width="item.minWidth || '150px'" :key="index">
        </el-table-column>
      </template>
    </el-table>
    <!-- 分页 -->
    <el-pagination ref="paginationRef" layout="total, sizes, prev, pager, next, jumper" :total="total"
      v-model:currentPage="current" v-model:page-size="size" :page-sizes="[10, 20, 30, 50, 100]" :default-page-size="10"
      :pager-count="5" @size-change="handleSizeChange" @current-change="handleCurrentChange" background prev-text="上一页"
      next-text="下一页">
    </el-pagination>
  </el-config-provider>
</template>

<script setup lang="ts">
import _ from 'lodash'
import { reactive, ref, unref, nextTick, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { Delete, Edit, CirclePlus } from '@element-plus/icons-vue'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { getBoundingClientRect } from '@/utils/dom.util'
import { HashMap, TableColumn, PagingQueryBody, PagingResult, FormItem } from '@/types'
import ExForm from '@/components/ExForm.vue'

const store = useStore()

const refreshTable = () => {
  console.log('刷新表格')
  pagingQueryBody.current = 1
  flag.value = true
  pageQuery(pagingQueryBody)
}
// 对外暴露属性或者方法
defineExpose({
  refreshTable
})

// 接收父组件传递的属性
const props = defineProps({
  formLabelWidth: {
    type: Number,
    default: () => 100
  },
  formItems: {
    type: Array as () => Array<FormItem>,
    default: () => [],
    required: true
  },
  formData: {
    type: Object as () => HashMap,
    default: function () {
      return {}
    }
  },
  tableKey: {
    type: Number
  },
  tableButtons: {
    type: Array as () => Array<any>
  },
  tableColumns: {
    type: Array as () => Array<TableColumn>
  },
  tableBorder: {
    type: Boolean
  },
  tableRowClassName: {
    type: Function
  },
  tablePageCurrent: {
    type: Number
  },
  tablePageSize: {
    type: Number
  }
})

// 接收父组件传递的方法
const emit = defineEmits(['pageQuery', 'handleSelectionChange'])

const locale = ref(zhCn)

const reservedHeight = 60
const tableRef = ref()
const tableHeight = ref(250)
const paginationRef = ref()
const records = ref<any[]>([])
const total = ref(1)
const current = ref(props.tablePageCurrent || 1)
const size = ref(props.tablePageSize || 20)
const pagingQueryBody = reactive<PagingQueryBody>({ current: current.value, size: size.value })
const flag = ref(false)

// 初始化默认筛选条件
_.forEach(Reflect.ownKeys(props.formData), key => {
  pagingQueryBody[key.toString()] = props.formData[key.toString()]
})

// 分页查询
const pageQuery = (pagingQueryBody: PagingQueryBody) => {
  emit('pageQuery', JSON.parse(JSON.stringify(pagingQueryBody)), (result: PagingResult<any>) => {
    records.value = result.records
    total.value = result.total
    current.value = result.current
    size.value = result.size
    flag.value = false
  })
}

// 改变页大小
const handleSizeChange = (val: number) => {
  pagingQueryBody.current = 1
  pagingQueryBody.size = val
  flag.value = true
  pageQuery(pagingQueryBody)
}
// 改变页码
const handleCurrentChange = (val: number) => {
  if (flag.value) {
    return
  }
  pagingQueryBody.current = val
  pagingQueryBody.size = size.value
  pageQuery(pagingQueryBody)
}

// 筛选数据
const handleFilterChange = (filterConditions: unknown) => {
  const filters = JSON.parse(JSON.stringify(filterConditions))
  if (_.isEmpty(filters)) {
    _.forEach(Reflect.ownKeys(pagingQueryBody), key => {
      Reflect.deleteProperty(pagingQueryBody, key)
    })
  } else {
    _.forEach(Reflect.ownKeys(filters), key => {
      if (filters[key]) {
        pagingQueryBody[key.toString()] = filters[key]
      } else {
        Reflect.deleteProperty(pagingQueryBody, key)
      }
    })
  }
  pagingQueryBody.current = 1
  pagingQueryBody.size = size.value
  return pageQuery(pagingQueryBody)
}

// 选中行
const multipleSelection = ref<any[]>([])
const handleSelectionChange = (val: any[]) => {
  multipleSelection.value = val
  emit('handleSelectionChange', multipleSelection.value)
}

// 搜索表单
const formData = reactive(props.formData)
const submitForm = (data: HashMap) => {
  handleFilterChange(data)
}
const resetForm = (data: HashMap) => {
  handleFilterChange(data)
}

async function computeTableHeight() {
  const tableProxy = unref(tableRef)
  const tableEle = tableProxy?.$el as Element
  const tableRect = getBoundingClientRect(tableEle) as DOMRect
  // console.log('tableRect', tableRect)

  tableHeight.value = window.innerHeight - tableRect.top - reservedHeight
  window.onresize = function () {
    tableHeight.value = window.innerHeight - tableRect.top - reservedHeight
  }
}

// 表格高度自适应
onMounted(() => {
  // nextTick 将回调推迟到下一个 DOM 更新周期之后执行
  nextTick(() => {
    computeTableHeight()
  })
})
watch(() => store.state.isExpandFormItem, () => {
  nextTick(() => {
    computeTableHeight()
  })
})

// 初始化表格
pageQuery(pagingQueryBody)
</script>

<style scoped lang="scss">
</style>
