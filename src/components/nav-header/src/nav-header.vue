<template>
  <div class="nav-header">
    <el-icon v-if="isFold" :size="30" class="fold" @click="handleFoldClick"
      ><Expand
    /></el-icon>
    <el-icon v-else class="fold" :size="30" @click="handleFoldClick"
      ><Fold
    /></el-icon>
    <div class="content">
      <ly-breadcrumb :breadcrumbs="breadcrumbs" />

      <user-info />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import userInfo from './user-info.vue'
import { useStore } from '@/store/index'
import { useRoute } from 'vue-router'

import lyBreadcrumb from '@/base-ui/breadcrumb'
import { pathMapBreadcrums } from '@/utils/map-menus'

export default defineComponent({
  components: {
    userInfo,
    lyBreadcrumb
  },
  //发送折叠事件
  emits: ['foldChange'],
  setup(props, { emit }) {
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    //面包屑数据

    const store = useStore()

    const breadcrumbs = computed(() => {
      const userMenus = store.state.login.userMenus
      const route = useRoute()
      const currentPath = route.path
      return pathMapBreadcrums(userMenus, currentPath)
    })

    return {
      handleFoldClick,
      isFold,
      breadcrumbs
    }
  }
})
</script>
<style lang="less" scoped>
.nav-header {
  display: flex;
  width: 100%;
  .fold {
    cursor: pointer;
  }
  .content {
    flex: 1;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
