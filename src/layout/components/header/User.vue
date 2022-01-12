<template>
  <el-dropdown>
    <div class="flex items-center text-white cursor-pointer">
      <img src="@/assets/user.png" class="h-6" alt="用户信息" />
      <span class="px-2">{{ userInfo.username }}</span>
      <i class="icon-xiangxiajiantou text-sm"></i>
    </div>
    <template #dropdown>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item divided>
          <router-link to="/info/index">个人信息</router-link>
        </el-dropdown-item>
        <el-dropdown-item divided>
          <span @click="logout">退出系统</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script>
import { ElMessageBox } from "element-plus";
import { ref } from "vue-demi";
import { useStore } from "vuex";
export default {
  name: "header-user",
  setup() {
    const store = useStore();
    const userInfo = ref(store.state.user.userInfo);
    const logout = () => {
      ElMessageBox.confirm("是否退出系统, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        store.dispatch("user/LogOut");
      });
    };
    return { userInfo, logout };
  },
};
</script>