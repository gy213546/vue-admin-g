<template>
	<div class="w-full h-full flex justify-center items-center bg-cover bg-center-75 bg-login-bg ">
		<div class="bg-transparent w-1/2 h-1/2 relative overflow-hidden rounded-lg login-main">
			<div class="absolute inset-0 z-30 flex justify-center items-center">
				<!-- <el-image src="/image/logo.png" class="w-1/2 py-6"></el-image> -->
				<el-form ref="loginForm" :rules="loginRules" :model="loginForm" size="default" status-icon
					label-width="0" class="w-1/2">
					<el-form-item prop="username">
						<el-input v-model="loginForm.username" auto-complete="off" placeholder="请输入用户名"
							@keyup.enter.native="handleLogin">
							<i slot="prefix" class="icon-yonghuming" />
						</el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input :type="passwordType" v-model="loginForm.password" auto-complete="off"
							placeholder="请输入密码" @keyup.enter.native="handleLogin">
							<i slot="suffix" class="el-icon-view el-input__icon" @click="showPassword" />
							<i slot="prefix" class="icon-mima"></i>
						</el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" class="w-full h-46px rounded-lg linear" @click.native.prevent="handleLogin">
							登录</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		reactive,
		defineComponent
	} from 'vue'
	import {encryption} from '@/utils/system/crypto'
	import {useRouter} from 'vue-router'
	export default defineComponent({
		name: 'login',
		setup() {
			const loginRules = reactive({
				username: [{
					required: true,
					message: "请输入用户名",
					trigger: "blur"
				}, ],
				password: [{
						required: true,
						message: "请输入密码",
						trigger: "blur"
					},
					{
						min: 6,
						message: "密码长度最少为6位",
						trigger: "blur"
					},
				],
			})
			const loginForm = reactive({
				username: "",
				password: "",
				code: "",
				randomStr: "blockPuzzle",
			})
			const router = useRouter();
			
			const handleLogin = () => {
				router.push({path:'/home'})
			}
			const showPassword = () => {

			}
			return {
				loginRules,
				loginForm,
				handleLogin
			}
		}
	})
</script>

<style lang="scss" scoped>
	.login-main {
		&::after {
			content: "";
			width: 200%;
			height: 200%;
			position: absolute;
			left: 0;
			top: 0;
			z-index: 0;
			transform: translate(-25%, -25%);
			background: linear-gradient(180deg, rgba(15, 167, 186, 0.72) 30%, rgba(142, 214, 222, 0.45) 50%, rgba(255, 255, 255, 0.2) 75%), url('/image/login_bg.png') no-repeat;
			background-position: 75%;
			background-size: cover;
			filter: blur(8px);
		}
	}
	.linear{
		background: linear-gradient(162deg, #0ce4f1 0%, #08d0df 17%, #05c3d4 35%, #01b1c5 76%, #00b2c7 100%);
	}
</style>
