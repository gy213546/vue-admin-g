import axios, {
	AxiosError,
	AxiosRequestConfig,
	AxiosResponse,
	AxiosInstance
} from 'axios'
import store from '@/store'
import errorCode from '@/entryConfig/errorCode'
import {
	ElMessage
} from 'element-plus'
import qs from 'qs'
const baseURL =
	import.meta.env.VITE_BASE_URL

const request = axios.create({
	baseURL: baseURL,
	timeout: 5000
})
// 请求前的统一处理
request.interceptors.request.use(
	(config) => {
		const isToken = (config.headers || {}).isToken === false
		// JWT鉴权处理
		if (store.getters['user/access_token'] && !isToken) {
			config.headers['Authorization'] = 'Bearer ' + store.state.user.access_token
		}
		//租户类型
		if (store.getters['user/TENANT_ID']) {
			config.headers['TENANT-ID'] = store.state.user.TENANT_ID
		}
		return config
	},
	(error) => {
		console.log(error) // for debug
		return Promise.reject(error)
	}
)

request.interceptors.response.use(
	(res) => {
		const status = Number(res.status) || 200
		const message = res.data.msg || errorCode[status] || errorCode['default']
		if (status === 401) {
			showErr(message);
			return
		}

		if (status !== 200 || res.data.code === 1) {
			showErr(message);
			return Promise.reject(new Error(message))
		}
		return res
	},
	(error) => {
		showErr(error);
		return Promise.reject(new Error(error))
	}
)

const showErr = (message)=>{
	ElMessage({
		message: message,
		type: 'error'
	})
	// store.dispatch('user/FedLogOut')
}



export default request
