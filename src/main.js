import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:windi.css'
// ElementPlus start
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/display.css' // 引入基于断点的隐藏类
import 'element-plus/dist/index.css'
// ElementPlus end
import router from '@/route'
const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
