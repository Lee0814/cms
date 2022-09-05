<template>
  <div class="line-echart">
    <base-echart height="300px" width="100%" :option="lineOption"></base-echart>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue'
import baseEchart from '@/base-ui/echart'

import { IDataType } from '../types'
const props = defineProps<{
  xLables: string[]
  values: any[]
}>()

const lineOption = computed(() => {
  return {
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: props.xLables
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '分类销量',
        data: props.values,
        type: 'line',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        }
      }
    ]
  }
})
</script>
<style lang="less" scoped></style>
