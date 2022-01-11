import {
	createStore
} from 'vuex'
import {
	persistedstate
} from '@/utils/system/persistedstate'
const files =
	import.meta.globEager('./modules/*.js')


let modules = {}
Object.keys(files).forEach((c) => {
	const module = files[c].default
	const moduleName = c.replace(/^\.\/(.*)\/(.*)\.\w+$/, '$2')
	modules[moduleName] = module
})

export default createStore({
	modules: {
		...modules
	},

	plugins: [
		persistedstate(modules)
	]
})
