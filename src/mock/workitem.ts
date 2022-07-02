import _ from 'lodash'
import Mock from 'mockjs'
import { Result, PagingResult, PagingQueryBody } from '@/types'

export interface WorkItem {
  id: string,
  // 请假申请, 加班申请, 因公外出
  title: string,
  // 部门负责人审批, 行政/人事专员归档, 结束
  step: string,
  // 1通过, 2驳回, 0待处理
  status: string,
  submitTime: string,
  submitUserNickname: string,
  handleTime: string,
  handleUserNickname: string
}

const Random = Mock.Random
Random.extend({
  process: function (date) {
    const processes = ['请假申请', '加班申请', '因公外出']
    return this.pick(processes)
  },
  step: function (date) {
    const steps = ['部门负责人审批']
    return this.pick(steps)
  }
})

const todoItems: Array<WorkItem> = []

for (let i = 0; i < 128; i++) {
  const name = Random.cname()
  todoItems.push({
    id: Random.guid(),
    title: `${Random.process()}-${name}-SN${Random.now('yyyyMMdd')}${Random.time('HHmmss')}`,
    step: Random.step(),
    status: '0',
    submitTime: `${Random.now('yyyy-MM-dd')} ${Random.time('HH:mm:ss')}`,
    submitUserNickname: name,
    handleTime: '',
    handleUserNickname: ''
  })
}

Mock.mock('/api/todoitems', 'post', (options: { body: string }) => {
  const jsonData: PagingQueryBody = JSON.parse(options.body)
  const current = jsonData.current
  const size = jsonData.size
  Reflect.deleteProperty(jsonData, 'current')
  Reflect.deleteProperty(jsonData, 'size')
  const pagingQueryBody = jsonData
  let records
  if (Object.keys(pagingQueryBody).length === 0) {
    records = _.cloneDeep(todoItems)
  } else {
    records = _.filter(todoItems, item => {
      return item.title.indexOf(pagingQueryBody.title) > -1
    })
  }

  return {
    code: 200,
    message: null,
    data: {
      records: _.chunk(records, size)[current - 1],
      total: records.length,
      current: current,
      size: size
    }
  } as Result<PagingResult<WorkItem>>
})
