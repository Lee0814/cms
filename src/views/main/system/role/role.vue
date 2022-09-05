<template>
  <div class="role">
    <page-search :searchFormConfig="searchFormConfig"></page-search>
    <page-content
      pageName="role"
      :contentTableConfig="contentTableConfig"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-content>
    <page-modal
      :modalConfig="modalConfig"
      pageName="role"
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
      :otherInfo="otherInfo"
    >
      <div class="menu-tree">
        <el-tree
          ref="elTreeRef"
          :data="menus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheckChange"
        >
        </el-tree>
      </div>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue'
import { useStore } from '@/store'

import pageContent from '@/components/page-content'
import pageSearch from '@/components/page-search'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageModal } from '@/hooks/use-page-modal'

import pageModal from '@/components/page-modal'
import PageModal from '@/components/page-modal/src/page-modal.vue'

import { mapMenuLeafKeys } from '@/utils/map-menus'

import { ElTree } from 'element-plus'
export default defineComponent({
  name: 'role',
  components: {
    pageContent,
    pageSearch,
    pageModal,
    PageModal
  },
  setup() {
    //处理 modalhook  角色菜单树的回显
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const editCallback = (item: any) => {
      const leafKeys = mapMenuLeafKeys(item.menuList)
      //打开时来不及了绑定
      nextTick(() => {
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }
    const [pageModalRef, defaultInfo, handleEditData, handleNewData] =
      usePageModal(undefined, editCallback)
    const store = useStore()
    const menus = computed(() => store.state.entireMenu)
    //发送网络请求时要传入的其他数据 选中的权限（菜单）
    const otherInfo = ref({})
    //daat1 :所有选项 data2：自己选择需要的选项 有4种选择类型
    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }
    return {
      contentTableConfig,
      searchFormConfig,
      modalConfig,
      pageModalRef,
      defaultInfo,
      handleEditData,
      handleNewData,
      menus,
      otherInfo,
      elTreeRef,
      handleCheckChange
    }
  }
})
</script>

<style scoped lang="less">
.menu-tree {
  margin-left: 20px;
}
</style>
