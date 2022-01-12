<template>
  <el-popover placement="bottom" trigger="hover">
    <template #reference>
      <el-badge is-dot class="item">
        <img src="@/assets/info.png" class="h-6 cursor-pointer" alt="通知" />
      </el-badge>
    </template>
    <template #default>
      <p class="py-1" v-for="(info, index) in infolist" :key="index + '_infolist'">
        {{ info }}
      </p>
    </template>
  </el-popover>
</template>
<script>
import { reactive } from "vue";
export default {
  name: "header-info",
  setup() {
    const infolist = reactive(["通知1", "通知2"]);
    return { infolist };
  },
};
</script>