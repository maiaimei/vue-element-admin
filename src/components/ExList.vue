<template>
  <!-- 搜索表单 -->
  <ex-form ref="searchFormRef" v-if="formItems.length > 0" :isSearchForm="true" :items="formItems" :model="formData"
    @submitForm="submitForm" @resetForm="resetForm" :labelWidth="formLabelWidth" />
  <!-- 操作按钮 -->
  <ex-toolbar :buttons="tableButtons"></ex-toolbar>
  <!-- 表格 -->
  <el-config-provider :locale="locale">
    <el-table ref="tableRef" :key="tableKey" :data="records" :border="tableBorder" style="width: 100%"
      :height="tableHeight" @filter-change="handleFilterChange" @selection-change="handleSelectionChange"
      :row-class-name="tableRowClassName" :class="{ hide: !visible }">
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
      next-text="下一页" :class="{ hide: !visible }">
    </el-pagination>
  </el-config-provider>
</template>

<script setup lang="ts">
import _ from 'lodash'
import { reactive, ref, unref, nextTick, onMounted, onActivated, onDeactivated, watch } from 'vue'
import { ElTable, ElPagination } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { getBoundingClientRect } from '@/utils/dom.util'
import { HashMap, PagingQueryBody, PagingResult, TableColumn, FormItem } from '@/types'
import ExForm from './ExForm.vue'
import ExToolbar from './ExToolbar.vue'
import useResizeTable from '@/hooks/useResizeTable'

const locale = ref(zhCn)

// 接收父组件传递的属性
const props = defineProps({
  formLabelWidth: {
    type: Number,
    default: () => 100
  },
  formItems: {
    type: Array as () => Array<FormItem>,
    default: () => []
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
    type: Array as () => Array<TableColumn>,
    required: true
  },
  tableBorder: {
    type: Boolean
  },
  tableRowClassName: {
    type: Object as () => any
  },
  currentPageNumber: {
    type: Number
  },
  pageSize: {
    type: Number
  }
})

// 接收父组件传递的方法
const emit = defineEmits(['pageQuery', 'handleSelectionChange'])

const tableHeight = ref(250)
const tableRef = ref<InstanceType<typeof ElTable>>()
const paginationRef = ref<InstanceType<typeof ElPagination>>()

const records = ref<any[]>([])
const total = ref(1)
const current = ref(props.currentPageNumber || 1)
const size = ref(props.pageSize || 20)

const pagingQueryBody = reactive<PagingQueryBody>({ current: current.value, size: size.value })
const isChangePageSize = ref(false)

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
    isChangePageSize.value = false
  })
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

// 改变页码
const handleSizeChange = (val: number) => {
  pagingQueryBody.current = 1
  pagingQueryBody.size = val
  isChangePageSize.value = true
  pageQuery(pagingQueryBody)
}

// 改变页码
const handleCurrentChange = (val: number) => {
  if (isChangePageSize.value) {
    return
  }
  pagingQueryBody.current = val
  pagingQueryBody.size = size.value
  pageQuery(pagingQueryBody)
}

// 选中行
const multipleSelection = ref<any[]>([])
const handleSelectionChange = (val: any[]) => {
  multipleSelection.value = val
  emit('handleSelectionChange', multipleSelection.value)
}

// 搜索表单
const formData = reactive(props.formData)
// 查询操作
const submitForm = (data: HashMap) => {
  handleFilterChange(data)
}
// 重置操作
const resetForm = (data: HashMap) => {
  handleFilterChange(data)
}

const refreshTable = () => {
  pagingQueryBody.current = 1
  isChangePageSize.value = true
  pageQuery(pagingQueryBody)
}

// 表格高度自适应
const visible = ref(true)
const isActivated = ref(true)
const otherHeights = 60
function resizeTable() {
  if (isActivated.value) {
    const tableProxy = unref(tableRef)
    const tableEle = tableProxy?.$el as Element
    const tableRect = getBoundingClientRect(tableEle) as DOMRect

    tableHeight.value = window.innerHeight - tableRect.top - otherHeights
    visible.value = true
  }
}

onActivated(() => {
  isActivated.value = true
  nextTick(() => {
    resizeTable()
  })
})
onDeactivated(() => {
  isActivated.value = false
  visible.value = false
})

// 调整浏览器窗口大小时触发表格高度自适应
onMounted(() => {
  nextTick(() => {
    resizeTable()
  })
})

// 展开或收起隐藏表单项触发表格高度自适应
const searchFormRef: any = ref(null)
watch(() => searchFormRef?.value?.isExpandFormItem, () => {
  nextTick(() => {
    resizeTable()
  })
})

// 初始化表格
pageQuery(pagingQueryBody)

// 对外暴露属性或者方法
defineExpose({
  refreshTable,
  resizeTable
})

useResizeTable()
</script>

<style scoped lang="scss">
.hide {
  visibility: hidden
}
</style>
