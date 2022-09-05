<template>
  <div class="base-echart">
    <div ref="echartDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineProps, withDefaults, watchEffect } from 'vue'
import { EChartsOption } from 'echarts'
import useEchart from '../hooks/useEchart'
//定义props
const props = withDefaults(
  defineProps<{ width: string; height: string; option: EChartsOption }>(),
  {
    width: '100%',
    height: '260px'
  }
)

//将echarts初始化封装在echarts组件的hook 直接调用
const echartDivRef = ref<HTMLElement>()
onMounted(() => {
  const { setOption } = useEchart(echartDivRef.value!)
  //监听option的变化 变化则改变
  watchEffect(() => {
    setOption(props.option)
  })
  setOption(props.option)
})
</script>
<style lang="less" scoped></style>
