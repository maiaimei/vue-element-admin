<template>
  <ex-list ref="todoRef" :tableButtons="tableButtons" :tableColumns="tableColumns" :formLabelWidth="100"
    :formItems="formItems" :formData="formData" @pageQuery="pageQuery" @handleSelectionChange="handleSelectionChange"
    :pageSize="50">
  </ex-list>
</template>

<script setup lang="ts">
import ExList from '@/components/ExList.vue'
import _ from 'lodash'
import { reactive, ref, getCurrentInstance, onMounted } from 'vue'
import { TableColumnCtx } from 'element-plus/lib/components/table/src/table-column/defaults'
import { ElMessage, ElMessageBox } from 'element-plus'
import { HashMap, TableColumn, PagingResult, FormItem } from '@/types'
import { WorkItem } from '@/mock/workitem'
import { todoitems } from '@/api'

let currentInstance: any
onMounted(() => {
  currentInstance = getCurrentInstance()
})

// 新增、修改、删除、上下移等操作后刷新表格
const refreshTable = () => {
  currentInstance.ctx.$refs.todoRef.refreshTable()
}

// 选中行
const selectRows = ref<WorkItem[]>([])
const handleSelectionChange = (rows: WorkItem[]) => {
  selectRows.value = JSON.parse(JSON.stringify(rows))
}

// 分页查询
const pageQuery = (pagingQueryBody: HashMap, success: any) => {
  todoitems.pageQuery(pagingQueryBody).then(res => {
    const result: PagingResult<WorkItem> = res.data.data
    success(result)
  })
}

const tableButtons = [
  {
    text: '刷新',
    type: 'primary',
    icon: 'Refresh',
    click: () => {
      refreshTable()
    }
  },
  {
    text: '同意',
    click: () => {
      if (_.isEmpty(selectRows.value) || selectRows.value.length > 1) {
        ElMessageBox.alert('请选择一条数据', '温馨提示')
        return
      }
      ElMessageBox.confirm(
        '确认审批通过吗？',
        '温馨提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          ElMessage({
            type: 'success',
            message: '操作成功'
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '操作失败'
          })
        })
      refreshTable()
    }
  },
  {
    text: '退回',
    click: () => {
      if (_.isEmpty(selectRows.value) || selectRows.value.length > 1) {
        ElMessageBox.alert('请选择一条数据', '温馨提示')
        return
      }
      ElMessageBox.confirm(
        '确认退回吗？',
        '温馨提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          ElMessage({
            type: 'success',
            message: '退回成功'
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '退回失败'
          })
        })
      refreshTable()
    }
  }
]
const tableColumns: Array<TableColumn> = [
  {
    type: 'selection'
  },
  {
    prop: 'title',
    columnKey: 'title',
    label: '事项名称',
    minWidth: 250
  },
  {
    prop: 'step',
    columnKey: 'step',
    label: '当前环节'
  },
  {
    prop: 'status',
    columnKey: 'status',
    label: '状态',
    minWidth: 100,
    formatter: (row: WorkItem, column: TableColumnCtx<WorkItem>) => {
      return row.status === '0' ? '待处理' : row.status === '1' ? '已通过' : '已驳回'
    }
  },
  {
    prop: 'submitTime',
    label: '到达时间'
  },
  {
    prop: 'submitUserNickname',
    label: '申请人'
  }
]

const formData: HashMap = reactive({})
const formItems: FormItem[] = [
  {
    elType: 'text',
    prop: 'title',
    label: '事项名称',
    placeholder: '请输入事项名称'
  }
]

</script>

<style lang="scss" scoped>
</style>
