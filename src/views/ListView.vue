<template>
  <ex-form :isSearchForm="true" :formItems="formItems" :formData="formData" @submitForm="submitForm"
    @resetForm="resetForm" />
  <el-config-provider :locale="locale">
    <el-table :data="records" style="width: 100%" :height="tableHeight" ref="tableRef" @filter-change="filterAll">
      <el-table-column fixed type="selection" width="55" />
      <el-table-column fixed prop="staffNumber" label="工号" width="100" column-key="staffNumber" />
      <el-table-column fixed prop="name" label="姓名" width="100" />
      <!-- :filter-method="filterSex" -->
      <el-table-column prop="sex" label="性别" width="100" :formatter="formatterSex" :filters="[
        { text: '男', value: 'M' },
        { text: '女', value: 'F' }
      ]" column-key="sex" />
      <el-table-column prop="birthday" label="出生日期" width="150" />
      <el-table-column prop="idcard" label="身份证号" width="180" />
      <el-table-column prop="mobile" label="手机号码" width="150" />
      <el-table-column prop="email" label="电子邮箱" width="200" />
      <el-table-column prop="orgName" label="所属组织" width="250" />
    </el-table>
    <el-pagination ref="paginationRef" layout="total, sizes, prev, pager, next, jumper" :total="total"
      v-model:currentPage="current" v-model:page-size="size" :page-sizes="[10, 20, 30, 50, 100]" :default-page-size="10"
      :pager-count="5" @size-change="handleSizeChange" @current-change="handleCurrentChange" background prev-text="上一页"
      next-text="下一页">
    </el-pagination>
  </el-config-provider>
</template>

<script setup lang="ts">
import _ from 'lodash'
import { reactive, ref, unref, nextTick, onMounted } from 'vue'
import { TableColumnCtx } from 'element-plus/lib/components/table/src/table-column/defaults'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { getBoundingClientRect } from '@/utils/dom.util'
import { staffs } from '@/api'
import { HashMap, IPageQueryData, FormItem, IPageResult } from '@/types'
import ExForm from '@/components/ExForm.vue'
import { IStaff } from '@/mock/staff'

const locale = ref(zhCn)

const reservedHeight = 60
const tableRef = ref()
const tableHeight = ref(250)
const paginationRef = ref()
const records = ref<IStaff[]>([])
const total = ref(1)
const current = ref(1)
const size = ref(20)
const searchData = reactive<IPageQueryData>({ current: current.value, size: size.value })
const flag = ref(false)

async function computeTableHeight() {
  const tableProxy = unref(tableRef)
  const tableEle = tableProxy?.$el as Element
  const tableRect = getBoundingClientRect(tableEle) as DOMRect

  tableHeight.value = window.innerHeight - tableRect.top - reservedHeight
  window.onresize = function () {
    tableHeight.value = window.innerHeight - tableRect.top - reservedHeight
  }
}

onMounted(() => {
  // nextTick 将回调推迟到下一个 DOM 更新周期之后执行
  nextTick(() => {
    computeTableHeight()
  })
})

const pageQuery = (searchData: IPageQueryData) => {
  staffs.pageQuery(JSON.parse(JSON.stringify(searchData))).then(res => {
    const result: IPageResult<IStaff> = res.data.data
    records.value = result.records
    total.value = result.total
    current.value = result.current
    size.value = result.size
    flag.value = false
  })
}

const handleSizeChange = (val: number) => {
  searchData.current = 1
  searchData.size = val
  flag.value = true
  pageQuery(searchData)
}
const handleCurrentChange = (val: number) => {
  if (flag.value) {
    return
  }
  searchData.current = val
  searchData.size = size.value
  pageQuery(searchData)
}

// 筛选全部
const filterAll = (conditions: unknown) => {
  const filters = JSON.parse(JSON.stringify(conditions))
  if (_.isEmpty(filters)) {
    _.forEach(Reflect.ownKeys(searchData), key => {
      Reflect.deleteProperty(searchData, key)
    })
  } else {
    _.forEach(Reflect.ownKeys(filters), key => {
      if (filters[key]) {
        searchData[key.toString()] = filters[key]
      } else {
        Reflect.deleteProperty(searchData, key)
      }
    })
  }
  searchData.current = 1
  searchData.size = size.value
  return pageQuery(searchData)
}

// 筛选性别
const filterSex = (
  value: string,
  row: { [propName: string]: unknown },
  column: TableColumnCtx<{ [propName: string]: unknown }>
) => {
  // 筛选当页数据
  const property = column.property
  return row[property] === value
}

// 格式化列
const formatterSex = (row: { sex: string; }) => {
  return row.sex === 'M' ? '男' : '女'
}

// 搜索表单
const formItems: FormItem[] = [
  {
    type: 'text',
    prop: 'staffNumber',
    label: '工号',
    placeholder: '请输入工号'
  },
  {
    type: 'select',
    prop: 'sex',
    label: '性别',
    placeholder: '全部',
    options: [
      { text: '全部', value: '' },
      { text: '男', value: 'M' },
      { text: '女', value: 'F' }
    ]
  }
]
const formData: HashMap = reactive({})
const submitForm = (data: { [propName: string]: unknown }) => {
  filterAll(data)
}
const resetForm = (data: { [propName: string]: unknown }) => {
  filterAll(data)
}

// 初始化表格
pageQuery(searchData)
</script>

<style scoped lang="scss">
</style>
