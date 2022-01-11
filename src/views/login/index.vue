<template>
	<div class="w-full h-full flex justify-center items-center bg-cover bg-center-75 bg-login-bg ">
		<div class="bg-transparent w-1/2 h-1/2 relative overflow-hidden rounded-lg login-main">
			<div class="absolute inset-0 z-30 flex justify-center items-center">
				<!-- <el-image src="/image/logo.png" class="w-1/2 py-6"></el-image> -->
				<el-form ref="loginFormEl" :rules="loginRules" :model="loginForm" size="default" status-icon
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
						<el-button type="primary" class="w-full h-46px rounded-lg linear"
							@click.native.prevent="handleLogin">
							登录</el-button>
					</el-form-item>
					<el-form-item prop="code" style="margin: 0 !important">
						<Verify @success="verifySuccess" :mode="'pop'" :captchaType="'blockPuzzle'"
							:imgSize="{ width: '330px', height: '155px' }" ref="verify" />
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		reactive,
		defineComponent,
		unref,
		ref
	} from 'vue'
	import {
		encryption
	} from '@/utils/system/crypto'
	import {
		useRouter
	} from 'vue-router'
	import Verify from "./components/verifition/Verify";
	import {
		loginByUsername
	} from '@/api'
	import {
		useStore
	} from 'vuex';
	import {
		ElLoading
	} from 'element-plus'
	export default defineComponent({
		name: 'login',
		components: {
			Verify
		},
		setup(props, content) {
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
			const passwordType = ref("password");
			const loginForm = reactive({
				username: "",
				password: "",
				code: "",
				randomStr: "blockPuzzle",
			})
			const router = useRouter();
			const verify = ref(null);
			const loginFormEl = ref(null);
			const store = useStore();
			const handleLogin = () => {
				unref(loginFormEl).validate((valid) => {
					valid && unref(verify).show();
				});
			}
			const showPassword = () => {
				passwordType.value == "" ?
					(passwordType.value = "password") :
					(passwordType.value = "");
			}
			const verifySuccess = (params) => {
				loginForm.code = params.captchaVerification;
				const user = encryption({
					data: loginForm,
					key: "smartwater123456",
					param: ["password"],
				});
				const loading = ElLoading.service({
					lock: true,
					text: `登录中,请稍后。。。`,
					spinner: "el-icon-loading",
				});
				loginByUsername(user.username, user.password, user.code, user.randomStr)
					.then((res) => {
						store.dispatch("user/LOGIN_SUCESS", res.data);
						router.push({
							path: "/"
						});
					})
					.finally(() => {
						loading.close();
					});
			}
			return {
				loginRules,
				loginForm,
				handleLogin,
				verify,
				loginFormEl,
				verifySuccess,
				showPassword,
				passwordType
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

	.linear {
		background: linear-gradient(162deg, #0ce4f1 0%, #08d0df 17%, #05c3d4 35%, #01b1c5 76%, #00b2c7 100%);
	}
</style>
