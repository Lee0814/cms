<template>
  <div class="ly-table">
    <el-table :data="listData" border style="width: 100%">
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center">
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

interface IPropItem {
  prop?: string
  label?: string
  minWidth?: string
  slotName?: string
}
export default defineComponent({
  components: {},
  props: {
    listData: {
      type: Array,
      required: true
    },
    propList: {
      type: Array,
      required: true
    }
  }
  // setup(props, { emit }) {
  //   const test = ref({ ...props.propList })
  //   console.log(props.propList)
  //   return {
  //     test
  //   }
  // }
})
</script>
<style lang="less" scoped></style>
