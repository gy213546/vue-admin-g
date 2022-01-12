// vuex 持久化
import createPersistedState from "vuex-persistedstate";

const persistedstate_key = 'smartwater_HC';

//创建持久化实例
export const persistedstate = (modules)=>{
	return createPersistedState({
		// 默认存储在localStorage 现改为sessionStorage
		storage: window.sessionStorage,
		// 本地存储数据的键名
		key: persistedstate_key,
		// 指定需要存储的模块，如果是模块下具体的数据需要加上模块名称，如user.token
		paths: Object.keys(modules)
	})
}
// 删除数据
export const resetPersistedstate = ()=>{
	localStorage.removeItem(persistedstate_key)
	sessionStorage.removeItem(persistedstate_key)
	location.reload()
}