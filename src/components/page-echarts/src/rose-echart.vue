<template>
  <div class="rose-echart">
    <base-echart height="300px" width="100%" :option="roseOption"></base-echart>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue'
import baseEchart from '@/base-ui/echart'
import { IDataType } from '../types'

const props = defineProps<{
  roseData: IDataType[]
}>()
const roseOption = computed(() => {
  return {
    legend: {
      top: 'bottom'
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: '类别数据',
        type: 'pie',
        radius: [10, 80],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: props.roseData
      }
    ]
  }
})
</script>
<style lang="less" scoped></style>
