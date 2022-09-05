<template>
  <div class="pie-echart">
    <base-echart height="300px" width="100%" :option="pieOption"></base-echart>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue'
import baseEchart from '@/base-ui/echart'

import { IDataType } from '../types'
const props = defineProps<{
  pieData: IDataType[]
}>()
console.log(props.pieData)

const pieOption = computed(() => {
  return {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'horizontal',
      left: 'left',
      top: 'bottom'
    },
    series: [
      {
        name: '分类数据',
        type: 'pie',
        radius: '50%',
        data: props.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
})
</script>
<style lang="less" scoped></style>
