type IFormType = 'input' | 'password' | 'select' | 'datepicker'
export interface IFormItem {
  type: IFormType
  field: string
  label: string
  rules?: any[]
  placeholder?: any
  //针对select
  options?: any[]
  //针对特殊属性
  otherOptions?: any
  isHidden?: boolean
}
// export interface IColLayout {
//   xl?: number //>1920px  每行4个
//   lg?: number //≥1200px 3个
//   md?: number //≥992px 2个
//   sm?: number //≥768px 1个
//   xs?: number //<768px 1个
// }
export interface IForm {
  formItems: IFormItem[]
  labelWidth?: string
  itemLayout?: any
  colLayout?: any
}
