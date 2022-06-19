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
