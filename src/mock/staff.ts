import _ from 'lodash'
import Mock from 'mockjs'
import { Result, PagingResult, PagingQueryBody } from '@/types'

export interface IStaff {
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

const staffs: Array<IStaff> = []
for (let i = 1; i <= 303; i++) {
  staffs.push(Mock.mock(
    {
      staffId: '@increment()',
      staffNumber: '@string("number",6,6)',
      name: '@cname',
      sex: /[MF]/,
      birthday: '@date',
      idcard: '@id',
      mobile: /1[3456789]\d{9}/,
      email: /[1-9]{6,12}@qq\.com/,
      address: '@city(true)',
      orgName: '@csentence(6, 12)'
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
  } as Result<PagingResult<IStaff>>
})
