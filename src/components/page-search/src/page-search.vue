<template>
  <div class="page-search">
    <ly-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <div class="btns">
          <el-button :icon="Refresh">重置</el-button>
          <el-button type="primary" :icon="Search">搜索</el-button>
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
  setup() {
    const formData = ref({
      id: '',
      name: '',
      password: '',
      sport: '',
      createTime: ''
    })
    return {
      formData,
      Search,
      Refresh
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
