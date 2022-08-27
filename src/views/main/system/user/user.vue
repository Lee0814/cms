<template>
  <div class="user">
    <page-search :searchFormConfig="searchFormConfig" />

    <div class="content">
      <ly-table :listData="userList" :propList="propList">
        <template #status="scope">
          <el-button>{{ scope.row.enable ? '启用' : '禁用' }}</el-button>
        </template>
        <template #createAt="scope">
          <strong>{{ scope.row.createAt }}</strong>
        </template>
      </ly-table>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

import { useStore } from '@/store'

import { searchFormConfig } from './config/search.config'

import pageSearch from '@/components/page-search'
import lyTable from '@/base-ui/table'
export default defineComponent({
  name: 'user',
  components: {
    pageSearch,
    lyTable
  },
  setup() {
    const store = useStore()
    //发送请求
    store.dispatch('system/getPageListAction', {
      pageUrl: '/users/list',
      queryInfo: {
        offset: 0,
        size: 10
      }
    })
    //拿存储的数据
    const userList = computed(() => store.state.system.userList)
    const userCount = computed(() => store.state.system.userCount)

    const propList = [
      { prop: 'name', label: '用户名', minWidth: '100' },
      { prop: 'realname', label: '真实姓名', minWidth: '100' },
      { prop: 'cellphone', label: '电话号码', minWidth: '100' },
      { prop: 'enable', label: '状态', minWidth: '100', slotName: 'status' },
      {
        prop: 'createAt',
        label: '创建时间',
        minWidth: '100',
        slotName: 'createAt'
      },
      {
        prop: 'updateAt',
        label: '更新时间',
        minWidth: '100',
        slotName: 'updateAt'
      }
    ]
    return {
      searchFormConfig,
      userList,
      userCount,
      propList
    }
  }
})
</script>

<style scoped>
.content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
