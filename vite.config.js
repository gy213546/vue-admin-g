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
	server: {
	  port: 3001,
	  host: '0.0.0.0',
	  open: false,
	  proxy: { // 代理配置
		'/dev': {
			target: 'http://10.10.50.139:9999',
			changeOrigin: true,
			rewrite: path => path.replace(/^\/dev/, '')
		}
	  },
	},
	plugins: [
		vue(),
		WindiCSS()
	],
	
})
