import { IForm } from '@/base-ui/form'
export const searchFormConfig: IForm = {
  labelWidth: '120px',
  colLayout: {
    xl: 8, //>1920px  每行4个
    lg: 8, //≥1200px 3个
    md: 12, //≥992px 2个
    sm: 24, //≥768px 1个
    xs: 24 //<768px 1个
  },
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '角色名称',
      placeholder: '请输入角色名称'
    },
    {
      field: 'intro',
      type: 'input',
      label: '权限介绍',
      placeholder: '请输入权限'
    },

    {
      field: 'creatTime',
      type: 'datepicker',
      label: '创建时间',
      placeholder: '请选择创建的时间',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ]
}
