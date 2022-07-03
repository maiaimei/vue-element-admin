<template>
  <!-- :tableRowClassName="tableRowClassName" :tableBorder="true" -->
  <ex-list ref="listDemoRef" :tableButtons="tableButtons" :tableColumns="tableColumns" :formLabelWidth="100"
    :formItems="formItems" :formData="formData" @pageQuery="pageQuery" @handleSelectionChange="handleSelectionChange"
    :pageSize="50">
    <!-- <template v-slot:action>
      <el-table-column align="center" label="操作" width="250" class-name="operation" fixed="right">
        <template #default="scope">
          <el-link @click="handleView(scope.row)" :underline="false">查看</el-link>
          <el-button @click="handleModify(scope.row)" type="primary">修改</el-button>
        </template>
      </el-table-column>
    </template> -->
  </ex-list>

  <!-- Form -->
  <el-dialog v-model="dialogFormVisible" title="Shipping address" draggable>
    <el-form :model="dialogFormData">
      <el-form-item label="Promotion name" :label-width="dialogFormLabelWidth">
        <el-input v-model="dialogFormData.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Zones" :label-width="dialogFormLabelWidth">
        <el-select v-model="dialogFormData.region" placeholder="Please select a zone">
          <el-option label="Zone No.1" value="shanghai" />
          <el-option label="Zone No.2" value="beijing" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">关闭</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import ExList from '@/components/ExList.vue'
import _ from 'lodash'
import { reactive, ref, getCurrentInstance, onMounted } from 'vue'
import { TableColumnCtx } from 'element-plus/lib/components/table/src/table-column/defaults'
import { ElMessage, ElMessageBox } from 'element-plus'
import { HashMap, TableColumn, PagingResult, FormItem } from '@/types'
import { Staff } from '@/mock/staff'
import { staffs } from '@/api'

let currentInstance: any
onMounted(() => {
  currentInstance = getCurrentInstance()
})

// 新增、修改、删除、上下移等操作后刷新表格
const refreshTable = () => {
  currentInstance.ctx.$refs.listDemoRef.refreshTable()
}

// 选中行
const selectRows = ref<Staff[]>([])
const handleSelectionChange = (rows: Staff[]) => {
  selectRows.value = JSON.parse(JSON.stringify(rows))
}

// 分页查询
const pageQuery = (pagingQueryBody: HashMap, success: any) => {
  staffs.pageQuery(pagingQueryBody).then(res => {
    const result: PagingResult<Staff> = res.data.data
    success(result)
  })
}

// 格式化列
const formatterSex = (row: Staff, column: TableColumnCtx<Staff>) => {
  return row.sex === 'M' ? '男' : '女'
}

// 表头按钮组
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
    text: '新增',
    icon: 'CirclePlus',
    click: () => {
      dialogFormVisible.value = true
      refreshTable()
    }
  },
  {
    text: '删除',
    icon: 'Delete',
    click: () => {
      if (_.isEmpty(selectRows.value) || selectRows.value.length > 1) {
        ElMessageBox.alert('请选择一条数据', '温馨提示')
        return
      }
      // const ids = selectRows.value.map(({ staffId }) => staffId)
      ElMessageBox.confirm(
        '确认删除吗？',
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
            message: '删除成功'
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '删除失败'
          })
        })
      refreshTable()
    }
  },
  {
    text: '更多操作',
    children: [
      {
        text: '上移',
        icon: 'el-icon-arrow-up',
        click: () => {
          if (_.isEmpty(selectRows.value)) {
            ElMessageBox.alert('请至少选择一条数据', '温馨提示')
            return
          }
          console.log('上移')
          refreshTable()
        }
      },
      {
        text: '下移',
        icon: 'el-icon-arrow-down',
        click: () => {
          if (_.isEmpty(selectRows.value)) {
            ElMessageBox.alert('请至少选择一条数据', '温馨提示')
            return
          }
          console.log('下移')
          refreshTable()
        }
      }
    ]
  }
]

// 操作列按钮
// const handleView = (row: Staff) => {
//   ElMessageBox.alert(JSON.stringify(row), '查看数据')
// }
// const handleModify = (row: Staff) => {
//   ElMessageBox.alert(JSON.stringify(row), '修改数据')
// }

// 表格列配置
const tableColumns: Array<TableColumn> = [
  {
    type: 'selection'
  },
  {
    prop: 'staffNumber',
    columnKey: 'staffNumber',
    label: '工号',
    minWidth: 100,
    fixed: 'left'
  },
  {
    prop: 'name',
    columnKey: 'name',
    label: '姓名',
    minWidth: 100,
    fixed: 'left'
  },
  {
    prop: 'sex',
    columnKey: 'sex',
    label: '性别',
    minWidth: 100,
    formatter: formatterSex
  },
  {
    prop: 'birthday',
    label: '出生日期'
  },
  {
    prop: 'idcard',
    columnKey: 'idcard',
    label: '身份证号',
    minWidth: 180
  },
  {
    prop: 'mobile',
    label: '手机号码'
  },
  {
    prop: 'email',
    label: '电子邮箱',
    minWidth: 200
  },
  {
    prop: 'orgName',
    columnKey: 'orgName',
    label: '所属组织',
    minWidth: 250
  }// ,
  // {
  //   type: 'slot',
  //   slot: 'action'
  // }
]

// 搜索表单配置
const formItems: FormItem[] = [
  {
    elType: 'text',
    prop: 'staffNumber',
    label: '工号',
    placeholder: '请输入工号'
  },
  {
    elType: 'text',
    prop: 'name',
    label: '姓名',
    placeholder: '请输入姓名'
  },
  {
    elType: 'select',
    prop: 'sex',
    label: '性别',
    placeholder: '全部',
    options: [
      { text: '全部', value: '' },
      { text: '男', value: 'M' },
      { text: '女', value: 'F' }
    ],
    hide: true
  },
  {
    elType: 'text',
    prop: 'idcard',
    label: '身份证号',
    placeholder: '请输入身份证号',
    hide: true
  },
  {
    elType: 'text',
    prop: 'orgName',
    label: '所属组织',
    placeholder: '请输入所属组织',
    hide: true
  }
]

// 搜索表单数据
const formData: HashMap = reactive({})

// TODO: 给行添加样式，此处有BUG，固定列颜色没有同步
const tableRowClassName = ({ row, rowIndex }: { row: Staff, rowIndex: number }) => {
  console.log(rowIndex)
  if (row.sex === 'M') {
    return 'warning-row'
  } else {
    return 'success-row'
  }
}

const dialogFormLabelWidth = '140px'
const dialogFormVisible = ref(false)
const dialogFormData = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: ''
})
</script>

<style lang="scss">
.el-table .warning-row {
  --el-table-tr-bg-color: #409eff;
}

.el-table .success-row {
  --el-table-tr-bg-color: #e6a23c;
}
</style>
