<template>
  <div class="user-info">
    <el-dropdown class="dropdown">
      <span class="el-dropdown-link">
        <el-avatar :icon="UserFilled" />
        <span>{{ name }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleExitClick">退出登录</el-dropdown-item>
          <el-dropdown-item divided>用户信息</el-dropdown-item>
          <el-dropdown-item>系统管理</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { UserFilled } from '@element-plus/icons-vue'
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store/index'
import { useRouter } from 'vue-router'

import LocalCache from '@/utils/cache'

export default defineComponent({
  components: {},

  setup() {
    const store = useStore()
    const router = useRouter()
    const name = computed(() => store.state.login.userInfo.name)
    const handleExitClick = () => {
      LocalCache.deleteCache('token')
      router.push('/main')
    }
    return {
      name,
      UserFilled,
      handleExitClick
    }
  }
})
</script>
<style lang="less" scoped>
.el-dropdown-link {
  span {
    padding: 0 10px;
    font-size: 16px;
  }
}
.dropdown {
  cursor: pointer;
}
</style>
