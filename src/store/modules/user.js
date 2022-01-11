
import {
	getUserInfo,
	logout,
	refreshToken,
	getMenu
} from '@/api'

import {
	resetPersistedstate
} from '@/utils/system/persistedstate'



import router from '@/router'
import {getAsyncRoutes} from '@/utils/system/serverRoute'
const state = {
	userInfo: {}, // 用户信息
	permissions: [], //权限
	roles: [], // 角色
	expires_in: '', //过期时间
	access_token: '', // 登录token
	refresh_token: '', // 刷新token
	TENANT_ID: '1', // 租户
	routes: [] ,//用户路由
	addRoutes:[]
}

// getters
const getters = {
	userInfo: state => state.userInfo,
	permissions: state => state.permissions,
	roles: state => state.roles,
	expires_in: state => state.expires_in,
	access_token: state => state.access_token,
	refresh_token: state => state.refresh_token,
	routes:state => state.routes,
	addRoutes:state => state.addRoutes,
	
}

// mutations
const mutations = {
	SET_ACCESS_TOKEN(state, access_token) {
		state.access_token = access_token
	},
	SET_EXPIRES_IN(state, expires_in) {
		state.expires_in = expires_in
	},
	SET_REFRESH_TOKEN(state, rfToken) {
		state.refresh_token = rfToken
	},
	SET_USER_INFO(state, userInfo) {
		state.userInfo = userInfo
	},
	SET_ROLES(state, roles) {
		state.roles = roles
	},
	SET_PERMISSIONS(state, permissions) {
		const list = {}
		for (let i = 0; i < permissions.length; i++) {
			list[permissions[i].authority] = true
		}
		state.permissions = list
	},
	UPDATE_PERMISSIONS(state, permissions) {
		const list = {}
		for (let i = 0; i < permissions.length; i++) {
			list[permissions[i]] = true
		}
		state.permissions = list
	},
	SET_ROUTES(state, routes) {
		
		state.routes = routes;
	},
	SET_ADDROUTES(state, addRoutes) {
		state.addRoutes = addRoutes;
	}
}

// actions
const actions = {
	//登录成功
	LOGIN_SUCESS({
		commit
	}, data) {
		return new Promise((resolve) => {
			commit('SET_ACCESS_TOKEN', data.access_token)
			commit('SET_REFRESH_TOKEN', data.refresh_token)
			commit('SET_EXPIRES_IN', data.expires_in)
			commit('SET_USER_INFO', data.user_info)
			commit('SET_PERMISSIONS', data.user_info.authorities || [])
			resolve()
		})
	},
	// 刷新token
	RefreshToken({
		commit,
		state
	}) {
		return new Promise((resolve, reject) => {
			refreshToken(state.refresh_token).then(response => {
				const data = response.data
				commit('SET_ACCESS_TOKEN', data.access_token)
				commit('SET_REFRESH_TOKEN', data.refresh_token)
				commit('SET_EXPIRES_IN', data.expires_in)
				resolve()
			}).catch(error => {
				reject(error)
			})
		})
	},
	// 查询用户信息
	GetUserInfo({
		commit
	}) {
		return new Promise((resolve, reject) => {
			getUserInfo().then((res) => {
				const data = res.data.data || {}
				commit('SET_USER_INFO', data.sysUser)
				commit('SET_ROLES', data.roles || [])
				commit('UPDATE_PERMISSIONS', data.permissions || [])
				resolve(data)
			}).catch(() => {
				reject()
			})
		})
	},
	// 登出
	LogOut({
		commit
	}) {
		return new Promise((resolve, reject) => {
			logout().then(() => {

				commit('SET_PERMISSIONS', [])
				commit('SET_USER_INFO', {})
				commit('SET_ACCESS_TOKEN', '')
				commit('SET_REFRESH_TOKEN', '')
				commit('SET_EXPIRES_IN', '')
				commit('SET_ROLES', [])
				resolve()
			}).catch(error => {
				reject(error)
			}).finally(() => {
				resetPersistedstate()
			})
		})
	},

	// 注销session
	FedLogOut({
		commit
	}) {
		return new Promise(resolve => {
			commit('SET_PERMISSIONS', [])
			commit('SET_USER_INFO', {})
			commit('SET_ACCESS_TOKEN', '')
			commit('SET_REFRESH_TOKEN', '')
			commit('SET_EXPIRES_IN', '')
			commit('SET_ROLES', [])
			resetPersistedstate()
			resolve()
		})
	},
	// 用户权限路由
	generateRoutes({
		commit
	}, roles) {
		return new Promise(resolve => {
			getMenu().then(res => {
				// console.log(res)
				const resData = res.data.data;
				commit('SET_ADDROUTES', resData)
				const asyncRoutes = getAsyncRoutes(resData) // 对路由格式进行处理
				// commit('SET_ROUTES', asyncRoutes)
				const curRoutes = router.options.routes;
				asyncRoutes.forEach(item=>{
					curRoutes.push(item);
					router.addRoute(item);
				})
			})
			resolve()
		})
	}
}


export default {
	namespaced: true,
	state,
	actions,
	getters,
	mutations
}
