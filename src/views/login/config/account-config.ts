//编写账号验证规则
const rules = {
  name: [
    {
      required: true,
      message: '用户名是必传内容',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9A-Z]{6,10}$/,
      message: '用户名必须为6-10个字母或数字',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码是必传内容',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9A-Z]{3,}$/,
      message: '密码必须为3位以上的字母或数字',
      trigger: 'blur'
    }
  ]
}
export { rules }
