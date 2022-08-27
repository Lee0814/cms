<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="{ path: item.path }">{{
          item.name
        }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IBreabcumb } from '../types'
export default defineComponent({
  components: {},
  props: {
    breadcrumbs: {
      type: Array as PropType<IBreabcumb[]>,
      default: () => []
    }
  }
})
</script>
<style lang="less" scoped></style>
