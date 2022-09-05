<template>
  <div class="user">
    <page-search
      @resetBtnClick="handleResetBtnClick"
      @queryBtnClick="handleQueryBtnClick"
      :searchFormConfig="searchFormConfig"
    />
    <page-content
      ref="pageContentRef"
      pageName="users"
      :contentTableConfig="contentTableConfig"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-content>
    <page-modal
      pageName="users"
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
      :modalConfig="modalConfigRef"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import { contentTableConfig } from './config/content.config'
import { searchFormConfig } from './config/search.config'
import { modalConfig } from './config/modal.config'

import pageContent from '@/components/page-content'
import pageSearch from '@/components/page-search'
import pageModal from '@/components/page-modal'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'

export default defineComponent({
  name: 'user',
  components: {
    pageSearch,
    pageContent,
    pageModal
  },
  setup() {
    // 1.处理密码逻辑 让每个组件自己传两个函数到公共组件，决定是否显示password
    const newCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = false
    }
    const editCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = true
    }
    // 2.动态添加部门和角色列表
    const store = useStore()
    const modalConfigRef = computed(() => {
      const departmentItem = modalConfig.formItems.find(
        (item) => item.field === 'departmentId'
      )
      departmentItem!.options = store.state.entireDepartment.map((item) => {
        return { title: item.name, value: item.id }
      })
      const roleItem = modalConfig.formItems.find(
        (item) => item.field === 'roleId'
      )
      roleItem!.options = store.state.entireRole.map((item) => {
        return { title: item.name, value: item.id }
      })
      return modalConfig
    })

    //3.把重置和搜索抽成hook
    const [pageContentRef, handleResetBtnClick, handleQueryBtnClick] =
      usePageSearch()

    const [pageModalRef, defaultInfo, handleEditData, handleNewData] =
      usePageModal(newCallback, editCallback)

    return {
      pageContentRef,
      searchFormConfig,
      contentTableConfig,
      handleResetBtnClick,
      handleQueryBtnClick,
      modalConfigRef,
      handleNewData,
      handleEditData,
      pageModalRef,
      defaultInfo
    }
  }
})
</script>

<style scoped></style>
