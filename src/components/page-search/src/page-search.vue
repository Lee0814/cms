<template>
  <div class="page-search">
    <ly-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <div class="btns">
          <el-button :icon="Refresh" @click="handleResetClick">重置</el-button>
          <el-button type="primary" :icon="Search" @click="handleQueryClick"
            >搜索</el-button
          >
        </div>
      </template>
    </ly-form>
  </div>
</template>

<script lang="ts">
import { Refresh, Search } from '@element-plus/icons-vue'
import { defineComponent, ref } from 'vue'
import lyForm from '@/base-ui/form'
export default defineComponent({
  components: {
    lyForm
  },
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  emits: ['resetBtnClick', 'queryBtnClick'],
  setup(props, { emit }) {
    //双向绑定的属性应该由field字段决定
    const formItems = props.searchFormConfig?.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      //循环添加每一个搜索项的field字段并置空
      formOriginData[item.field] = ''
    }
    const formData = ref(formOriginData)

    //用户点击重置
    const handleResetClick = () => {
      for (const key in formOriginData) {
        formData.value[`${key}`] = formOriginData[key]
      }
      emit('resetBtnClick')
    }
    const handleQueryClick = () => {
      emit('queryBtnClick', formData.value)
    }
    return {
      formData,
      Search,
      Refresh,
      handleResetClick,
      handleQueryClick
    }
  }
})
</script>
<style lang="less" scoped>
.header {
  color: red;
  padding-bottom: 10px;
}
.btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
