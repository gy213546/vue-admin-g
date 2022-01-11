<template>
  <el-menu-item v-if="isOneChild" :index="item.path">
    {{ item.meta.title }}
  </el-menu-item>
  <el-sub-menu v-else :index="item.path" popper-append-to-body>
    <template #title>
      <span>{{ item.meta.title }}</span>
    </template>
     <menu-item v-for="child in item.children" :key="child.path" :item="child"/>
  </el-sub-menu>
</template>
<script>
import { computed } from "vue-demi";
export default {
  name: "menu-item",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const isOneChild = computed(() => {
      return props.item.children.length <= 1;
    });

    return { isOneChild };
  },
};
</script>