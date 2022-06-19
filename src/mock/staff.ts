import Mock from 'mockjs'
import { IResult, IPageResult } from '@/types'

const data: IPageResult[] = Mock.mock({
  'records|220': [{
    'staffId|+1': 1000,
    staffNumber: '@string("number",6,6)',
    name: '@cname',
    'sex|0-1': '0',
    birthday: '@date',
    idcard: '@id',
    mobile: /1[3456789]\d{9}/,
    email: /[1-9]{6,12}@qq\.com/,
    address: '@city(true)',
    orgName: '@csentence(6, 12)'
  }],
  total: 220,
  current: 1,
  size: 10
})

const result: IResult = {
  code: 200,
  message: null,
  data: data
}

export default result
