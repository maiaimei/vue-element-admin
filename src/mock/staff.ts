import _ from 'lodash'
import Mock from 'mockjs'
import { Result, PagingResult, PagingQueryBody } from '@/types'

const Random = Mock.Random
Random.extend({
  organization: function (date) {
    const organizations = ['产品部', '研发部', '测试部', '运维部', '人力资源部', '财务部', '行政部', '市场部']
    return this.pick(organizations)
  }
})

export interface Staff {
  staffId: number,
  staffNumber: string,
  name: string,
  sex: string,
  birthday: string,
  idcard: string,
  mobile: string,
  email: string,
  address: string,
  orgName: string
}

const staffs: Array<Staff> = []
for (let i = 1; i <= 303; i++) {
  staffs.push(Mock.mock(
    {
      staffId: '@increment()',
      staffNumber: '@string("number",6,6)',
      name: '@cname',
      sex: /[MF]/,
      birthday: Random.datetime('yyyy-MM-dd'),
      idcard: '@id',
      mobile: /1[3456789]\d{9}/,
      email: '@email',
      address: '@city(true)',
      orgName: '@organization'
    }
  ))
}

Mock.mock('/api/staffs', 'post', (options: { body: string }) => {
  const jsonData: PagingQueryBody = JSON.parse(options.body)
  const current = jsonData.current
  const size = jsonData.size
  Reflect.deleteProperty(jsonData, 'current')
  Reflect.deleteProperty(jsonData, 'size')
  const pagingQueryBody = jsonData
  let records
  if (Object.keys(pagingQueryBody).length === 0) {
    records = _.cloneDeep(staffs)
  } else {
    records = _.filter(staffs, pagingQueryBody)
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
  } as Result<PagingResult<Staff>>
})
