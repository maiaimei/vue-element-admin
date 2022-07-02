import type { FormRules } from 'element-plus'
export interface HashMap {
  // 表示任意类型的属性
  [propName: string]: unknown
}

export interface Result<T> {
  code: number,
  message: string | null,
  data: T | null
}

export interface PagingResult<T> {
  records: Array<T>,
  total: number,
  current: number,
  size: number
}

export interface PagingQueryBody {
  current: number,
  size: number,
  [propName: string]: any
}

export interface TabItem {
  name: string,
  title: string,
  path: string
}

export interface MenuItem {
  name: string,
  title: string,
  path: string,
  icon?: string,
  children?: Array<MenuItem>,
  hasAuthority?: boolean
}
export interface FormItem {
  elType: string,
  slot?: string,
  prop?: string,
  label?: string,
  rules?: FormRules,
  options?: Array<{ text: unknown, value: unknown }>,
  [propName: string]: unknown
}

export interface TableColumn {
  type?: string,
  slot?: string,
  fixed?: string | boolean,
  minWidth?: string | number,
  height?: string,
  [propName: string]: unknown
}
