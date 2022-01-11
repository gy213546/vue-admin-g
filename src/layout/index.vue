<template>
	<el-container class="h-full w-full">
		<el-header>
			<l-header/>
		</el-header>
		<el-container>
			<el-aside width="200px">
				<l-menu/>
			</el-aside>
			<el-main>
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
import LHeader from './components/header'
import LMenu from './components/menu'
import tabs from './components/tabs'
export default {
	name:'layout',
	components:{LHeader,LMenu,tabs},
	setup() {
		
	},
}
</script>

<style>
</style>
