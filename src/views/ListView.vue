<template>
  <el-config-provider :locale="locale">
    <el-table :data="records" style="width: 100%" :height="tableHeight" ref="tableRef">
      <el-table-column fixed type="selection" width="55" />
      <el-table-column fixed prop="staffNumber" label="工号" width="100" />
      <el-table-column fixed prop="name" label="姓名" width="100" />
      <el-table-column prop="sex" label="性别" width="100" :formatter="formatterSex" />
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
import { ref, unref, nextTick, onMounted } from 'vue'
import { getBoundingClientRect } from '@/utils/dom.util'
import { listStaffs } from '@/api'
import { IPageResult } from '@/types'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import _ from 'lodash'

const locale = ref(zhCn)
const tableRef = ref()
const tableHeight = ref(250)
const paginationRef = ref()
const reservedHeight = 60

const records = ref<object[]>([])
const total = ref(1)
const current = ref(1)
const size = ref(20)

const pageQuery = (pageIndex: number, pageSize: number, searchData?: object) => {
  listStaffs.then(res => {
    const result: IPageResult = res.data.data
    records.value = _.chunk(result.records, pageSize)[pageIndex - 1]
    total.value = result.total
    // current.value = result.current
    // size.value = result.size
  })
}

pageQuery(current.value, size.value)

const handleSizeChange = (val: number) => {
  pageQuery(current.value, val)
}
const handleCurrentChange = (val: number) => {
  pageQuery(val, size.value)
}

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

const formatterSex = (row: { sex: string; }) => {
  return row.sex === '0' ? '男' : '女'
}
</script>

<style scoped lang="scss">
</style>
