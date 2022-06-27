export interface HashMap {
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
  [propName: string]: unknown
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
  children?: Array<MenuItem>
}
export interface FormItem {
  label?: string,
  cols?: Array<{
    span: number,
    items?: Array<FormItem>,
    html?: string,
    class?: string
  }>,
  rules?: FormRules,
  type: string,
  prop: string,
  subType?: string,
  min?: number,
  max?: number,
  minTime?: string,
  maxTime?: string,
  start?: string,
  end?: string,
  step?: string,
  format?: string,
  valueFormat?: string,
  multiple?: boolean,
  options?: Array<{ text: unknown, value: unknown }>, // Array<ChooseOption>,
  filterable?: boolean,
  disabled?: boolean,
  action?: string,
  tip?: string,
  placeholder?: string,
  handleChange?: (value: number) => { /** */ },
  hidden?: boolean
}

export interface TableColumn {
  type?: string,
  slot?: string,
  fixed?: string | boolean,
  minWidth?: string | number,
  height?: string,
  [propName: string]: unknown
}
