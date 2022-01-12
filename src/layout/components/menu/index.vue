<template>
  <el-scrollbar>
    <el-menu
      mode="vertical"
      :unique-opened="true"
      :collapse-transition="false"
      :default-active="activeMenu"
      :collapse="isCollapse"
      :router="true"
    >
      <menu-item v-for="route in routes" :key="route.path" :item="route" />
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { computed, unref, ref } from "vue-demi";
import MenuItem from "./MenuItem.vue";
export default {
  name: "l-menu",
  components: {
    MenuItem,
  },
  setup() {
    const store = useStore();
    const isCollapse = computed(() => store.state.app.isCollapse);
    const router = useRouter();
    const activeMenu = computed(() => {
      const route = useRoute();
      const { meta, path } = unref(route);
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    });
    const routes = computed(() => {
      return router.options.routes.filter((item) => !item.hidden);
    });
    return {
      routes,
      activeMenu,
      isCollapse,
    };
  },
};
</script>


<style>
</style>
