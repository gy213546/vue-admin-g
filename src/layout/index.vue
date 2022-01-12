<template>
  <el-container class="h-full w-full overflow-hidden">
    <el-header class="bg-black">
      <l-header />
    </el-header>
    <el-container class="overflow-hidden">
      <el-aside class="flex flex-col" :width="asideWidth">
        <l-menu />
        <collapse />
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import LHeader from "./components/header";
import LMenu from "./components/menu";
import tabs from "./components/tabs";
import collapse from "./components/menu/collapse.vue";
import { computed, onMounted,onUnmounted } from "vue-demi";
import { useStore } from "vuex";
import { refresh, clearTimer } from "@/utils/system/refreshToken";
export default {
  name: "layout",
  components: { LHeader, LMenu, tabs, collapse },
  setup() {
    const store = useStore();
    const asideWidth = computed(() => {
      return store.state.app.isCollapse ? "64px" : "220px";
    });
    onMounted(() => {
      refresh();
    });
    onUnmounted(() => {
      clearTimer();
    });
    return { asideWidth };
  },
};
</script>

<style>
</style>
