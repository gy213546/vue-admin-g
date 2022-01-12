<template>
  <div class="flex justify-between items-center h-full">
    <logo :url="'/image/title.svg'" />
    <header-menu />
	<div class="flex items-center justify-evenly">
		<header-info/>
		<large-screen class="px-6"/>
		<user/>
	</div>
  </div>
</template>

<script>
import logo from "./logo.vue";
import HeaderMenu from "./menu.vue";
import HeaderInfo from './info.vue'
import LargeScreen from './LargeScreen.vue'
import User from './User.vue'
export default {
  name: "l-header",
  components: { logo, HeaderMenu,HeaderInfo ,LargeScreen,User},
  setup() {},
};
</script>


<style>
</style>
