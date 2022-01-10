import {
	defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import {
	resolve
} from 'path'
import WindiCSS from 'vite-plugin-windicss'

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		extensions: ['.vue', '.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
		alias: {
			// vue2项目别名一般都是@，vue3中一般使用/@/, 为方便使用
			'@': resolve('src')
		}
	},
	plugins: [
		vue(),
		WindiCSS()
	]
})
