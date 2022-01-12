import {
    createApp
} from 'vue'
import App from './App.vue'
import 'virtual:windi.css'
// ElementPlus start
import ElementPlus from 'element-plus'
// import 'element-plus/theme-chalk/display.css' // 引入基于断点的隐藏类
import 'element-plus/dist/index.css'
// ElementPlus end
import router from '@/router'
import store from '@/store'
// 动态加载阿里云字体库
import '@/entryConfig/iconFont'
import '@/style/elementReset.scss'
const app = createApp(App)
app.use(router).use(ElementPlus).use(store)
app.mount('#app')