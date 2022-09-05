<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7"
        ><ly-card title="分类商品数量(饼图)"
          ><pie-echart :pieData="categoryGoodsCount"></pie-echart></ly-card
      ></el-col>
      <el-col :span="10"
        ><ly-card title="不同城市商品销量">
          <map-echart :mapData="addressGoodsSale"></map-echart> </ly-card
      ></el-col>
      <el-col :span="7"
        ><ly-card title="分类商品数量(玫瑰图)">
          <rose-echart :roseData="categoryGoodsCount"></rose-echart> </ly-card
      ></el-col>
    </el-row>
    <el-row :gutter="10" class="second-row">
      <el-col :span="12"
        ><ly-card title="分类商品的销量"
          ><line-echart v-bind="categoryGoodsSale"></line-echart></ly-card
      ></el-col>
      <el-col :span="12"
        ><ly-card title="分类商品的收藏">
          <bar-echart v-bind="categoryGoodsFavor"></bar-echart> </ly-card
      ></el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'
import lyCard from '@/base-ui/card'

import {
  pieEchart,
  roseEchart,
  lineEchart,
  barEchart,
  mapEchart
} from '@/components/page-echarts'

export default defineComponent({
  name: 'dashboard',
  components: {
    lyCard,
    pieEchart,
    roseEchart,
    lineEchart,
    barEchart,
    mapEchart
  },
  setup() {
    const store = useStore()
    //请求数据
    store.dispatch('dashboard/getDashboardDataAction')
    //获取数据
    const categoryGoodsCount = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((item: any) => {
        return { name: item.name, value: item.goodsCount }
      })
    })
    //销售数据
    const categoryGoodsSale = computed(() => {
      const xLables: string[] = []
      const values: any[] = []
      const ategoryGoodsSale = store.state.dashboard.categoryGoodsSale
      for (const item of ategoryGoodsSale) {
        if (item.goodsCount) {
          xLables.push(item.name)
          values.push(item.goodsCount)
        } else {
          values.push(60041)
        }
      }
      return {
        xLables,
        values
      }
    })
    //收藏数据
    const categoryGoodsFavor = computed(() => {
      const xLables: string[] = []
      const values: any[] = []
      const categoryGoodsFavor = store.state.dashboard.categoryGoodsFavor
      for (const item of categoryGoodsFavor) {
        if (item.goodsFavor) {
          xLables.push(item.name)
          values.push(item.goodsFavor)
        } else {
          values.push(13541)
        }
      }
      return {
        xLables,
        values
      }
    })
    //地址数据
    const addressGoodsSale = computed(() => {
      return store.state.dashboard.addressGoodsSale.map((item: any) => {
        return { name: item.address, value: item.count }
      })
    })

    return {
      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor,
      addressGoodsSale
    }
  }
})
</script>

<style scoped lang="less">
.second-row {
  margin-top: 10px;
}
</style>
