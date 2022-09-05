import * as echarts from 'echarts'

import ChinaMapData from '../data/china.json'
echarts.registerMap('china', ChinaMapData)
export default function (el: HTMLElement) {
  const echartInstance = echarts.init(el)
  const setOption = (option: echarts.EChartsCoreOption) => {
    echartInstance.setOption(option)
  }
  const updatesize = () => {
    echartInstance.resize()
  }
  //监听页面大小并重绘
  window.addEventListener('resize', () => {
    echartInstance.resize()
  })
  return {
    echartInstance,
    setOption,
    updatesize
  }
}

//初始化 三个参数 1.dom 2.主题：light dark 3.渲染模式:svg canvas
// svg:内存占用低 渲染性能略高 用户缩放时不会模糊
// canvas:更适合绘制元素数量非常大的图标 利于实现某些视觉特效
