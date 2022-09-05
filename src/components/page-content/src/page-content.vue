<template>
  <div class="page-content">
    <ly-table
      :listData="dataList"
      v-bind="contentTableConfig"
      @selectionChange="selectionChange"
      :listCount="dataCount"
      v-model:page="pageInfo"
    >
      <!-- 表头插槽 -->
      <template #headerHandler>
        <el-button v-if="isCreate" type="primary" @click="handleNewClick"
          >新建数据</el-button
        >
      </template>

      <!-- 表格数据插槽 -->
      <template #status="scope">
        <el-button
          size="small"
          :type="scope.row.enable ? 'success' : 'danger'"
          >{{ scope.row.enable ? '启用' : '禁用' }}</el-button
        >
      </template>
      <template #createAt="scope">
        <strong>{{ $filters.formatTime(scope.row.createAt) }}</strong>
      </template>
      <template #updateAt="scope">
        <strong>{{ $filters.formatTime(scope.row.updateAt) }}</strong>
      </template>
      <template #handle="scope" v-if="isUpdate || isCreate">
        <div class="handle">
          <el-button
            v-if="isUpdate"
            text
            type="primary"
            @click="handleEditClick(scope.row)"
            >编辑</el-button
          >
          <el-button
            @click="handleDeleteClick(scope.row)"
            v-if="isDelete"
            text
            type="primary"
            >删除</el-button
          >
        </div>
      </template>
      <!-- 在page中动态插入剩余的插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>

      <!-- 底部插槽 -->
      <template #footer> </template>
    </ly-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from '@/store'
import lyTable from '@/base-ui/table'

import { usePermission } from '@/hooks/use-permissions'

export default defineComponent({
  components: { lyTable },
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  emits: ['newBtnClick', 'editBtnClick'],
  setup(props, { emit }) {
    const store = useStore()
    //双向绑定pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    // 监听变化
    watch(pageInfo, () => {
      getPageData()
    })

    //判断是否拥有权限权限
    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')
    const isQuery = usePermission(props.pageName, 'query')
    console.log(isCreate, isUpdate, isDelete, isQuery)

    const getPageData = (queryInfo: any = {}) => {
      // 发送网络请求 判断是否有权限，没有权限直接返回
      if (!isQuery) return
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()

    const dataList = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )
    const dataCount = computed(() =>
      store.getters[`system/pageListCount`](props.pageName)
    )

    //拿到表单中选中数据
    const selectionChange = function (value: any) {
      console.log(value)
    }
    // 4.动态插槽 排除公共插槽
    const otherPropSlots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        if (item.slotName === 'status') return false
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === 'handle') return false
        return true
      }
    )
    //删除按钮 封装在vuex里面
    const handleDeleteClick = function (item: any) {
      store.dispatch('system/deletePageDataAction', {
        pageName: props.pageName,
        id: item.id
      })

      return item
    }
    //新建用户事件  发送事件到父组件
    const handleNewClick = function () {
      emit('newBtnClick')
    }
    // 编辑用户事件
    const handleEditClick = (item: any) => {
      emit('editBtnClick', item)
    }
    return {
      selectionChange,
      getPageData,
      handleDeleteClick,
      handleNewClick,
      handleEditClick,
      pageInfo,
      dataList,
      dataCount,
      otherPropSlots,
      isCreate,
      isUpdate,
      isDelete
    }
  }
})
</script>
<style lang="less" scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
