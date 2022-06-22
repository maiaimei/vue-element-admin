export interface IResult {
  code: number,
  message: string | null,
  data: object | null
}

export interface IPageResult {
  records: Array<object> | null,
  total: number,
  current: number,
  size: number
}

export interface IMenuItem {
  title: string,
  path: string,
  icon?: string,
  children?: Array<IMenuItem>
}

// select, checkobx, radio 的 option
export interface ChooseOption {
  value: string,
  text: string
}

export interface FormItem {
  type: string,
  subType?: string,
  prop: string,
  label: string,
  min?: number,
  max?: number,
  minTime?: string,
  maxTime?: string,
  start?: string,
  end?: string,
  step?: string,
  format?: string,
  valueFormat?: string,
  width?: string
  placeholder?: string,
  multiple?: boolean,
  options?: Array<ChooseOption>,
  filterable?: boolean,
  disabled?: boolean,
  action?: string,
  tip?: string,
  handleChange?: (value: number) => { /** */ }
}
