<template>
  <i :class="[iconClass, 'cursor-pointer', 'm-0', 'py-3']" @click="handle"></i>
</template>
<script>
import { computed, unref, ref } from "vue-demi";
import { useStore } from "vuex";
export default {
  name: "collapse",
  setup() {
    const store = useStore();
    const isCollapse = ref(store.state.app.isCollapse);
    const iconClass = computed(() => {
      return unref(isCollapse) ? "icon-zhankaicaidan" : "icon-shouqicaidan";
    });
    const handle = () => {
      isCollapse.value = !isCollapse.value;
      store.commit("app/isCollapseChange", unref(isCollapse));
    };
    return { iconClass, handle };
  },
};
</script> 