export default function cut(str: string) {
  str = str.replace('el-icon-', '')
  let newStr = str.slice(0, 1).toUpperCase() + str.slice(1)
  newStr = `<${newStr} />`
  console.log(newStr)

  return newStr
}
