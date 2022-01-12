<template>
  <router-link class="h-3/4 flex items-center" :to="{ path: '/' }">
    <span v-if="url == ''" class="text-xl text-white">logo</span>
    <el-image v-else class="h-full" :src="url"></el-image>
  </router-link>
</template>
<script>
export default {
  name: "logo",
  props: {
    url: {
      type: String,
      default: "",
    },
  },
  setup() {},
};
</script>