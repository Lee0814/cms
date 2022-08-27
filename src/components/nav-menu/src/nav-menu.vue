<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="@/assets/images/logo.svg" alt="logo" />
      <span v-if="!collapse" class="title">Vue3+TS</span>
    </div>
    <el-menu
      :default-active="test"
      class="el-menu-vertical"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
      :collapse="collapse"
    >
      <template v-for="item in userMenus" :key="item.id">
        <!-- 二级菜单 -->
        <template v-if="item.type === 1">
          <!-- 二级菜单可以展开的标题 -->

          <el-sub-menu class="el-submenu" :index="item.id + ' '">
            <template #title>
              <!-- <i v-if="item.icon" :class="item.icon"></i> -->
              <!-- <el-icon v-html="cut(item.icon)"></el-icon> -->
              <!-- <component
                :is="item.icon"
                style="width: 30px; height: 30px"
              ></component> -->
              <el-icon><User /></el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                @click="handleMenuItemClick(subitem)"
                class="el-menu-item"
                :index="subitem.id + ' '"
              >
                <template #title>
                  <!-- <i v-if="subitem.icon" :class="subitem.icon"></i> -->
                  <el-icon
                    v-if="subitem.icon"
                    v-html="cut(subitem.icon)"
                  ></el-icon>
                  <span>{{ subitem.name }}</span>
                </template>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else>
          <!-- 一级菜单 -->
          <el-menu-item class="el-menu-item" :index="item.id + ' '">
            <template #title>
              <!-- <i v-if="item.icon" :class="item.icon"></i> -->
              <!-- <el-icon v-if="item.icon" v-html="cut(item.icon)"></el-icon> -->
              <span>{{ item.name }}</span>
            </template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from '@/store/index'
import { useRouter, useRoute } from 'vue-router'

import cut from '@/utils/cut'
import { pathMapToMenu } from '@/utils/map-menus'

export default defineComponent({
  components: {},
  props: {
    collapse: {
      type: Boolean,
      defaule: false
    }
  },
  setup() {
    const router = useRouter()
    const store = useStore()
    const userMenus = computed(() => {
      return store.state.login.userMenus
    })
    const handleMenuItemClick = (item: any) => {
      router.push({
        path: item.url ?? '/not-found'
      })
    }
    //刷新后对应菜单显示
    const route = useRoute()
    const currentPath = route.path
    const test = '38'
    const menu = pathMapToMenu(userMenus.value, currentPath)
    const defaultValue = ref(menu.id + '')
    console.log(defaultValue.value, typeof defaultValue.value)

    return {
      userMenus,
      defaultValue,
      cut,
      handleMenuItemClick,
      test
    }
  }
})
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 48px;
    // height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }

  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 68px);
}
</style>
