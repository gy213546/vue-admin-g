import {
	createRouter,
	createWebHashHistory
} from "vue-router";
import nprogress from '@/entryConfig/nprogress'
import {
	changeTitle
} from '@/utils/system/title'
import store from '@/store'
import layout from '@/layout'
import {
	getAsyncRoutes
} from '@/utils/system/serverRoute'
import {
	ElMessage
} from 'element-plus'
const routes = [{
		path: "/",
		redirect: "/home",
		hidden:true
	},
	{
		path: "/home",
		name: "home",
		component: layout,
		redirect: '/home/index',
		meta: {
			title: "智能看板"
		},
		children: [{
			path: 'index',
			component: () => import("@/views/home"),
			meta: {
				title: "智能看板"
			}
		}]
	},
	{
		path: "/login",
		name: "login",
		component: () => import("@/views/login"),
		hidden:true,
		meta: {
			title: "登录"
		}
	},
	{
        path: '/404',
        component: () =>
            import('@/components/error-page/404'),
        name: '404',
        hidden: true,
        meta: {
            keepAlive: true,
            isTab: false,
            isAuth: true
        }

    },
    {
        path: '/403',
        component: () =>
            import('@/components/error-page/403'),
        name: '403',
        hidden: true,
        meta: {
            keepAlive: true,
            isTab: false,
            isAuth: false
        }
    },
    {
        path: '/500',
        component: () =>
            import('@/components/error-page/500'),
        name: '500',
        hidden: true,
        meta: {
            keepAlive: true,
            isTab: false,
            isAuth: false
        }
    },
]
const router = createRouter({
	history: createWebHashHistory(),
	routes: routes
})

// 刷新页面时 addRoute 丢失 重新添加路由
const refresh = () => {
	const addRoutes = store.getters['user/addRoutes'];
	const curRoutes = router.options.routes;
	getAsyncRoutes(addRoutes).forEach(item => {
		curRoutes.push(item);
		router.addRoute(item)
	})
}

refresh();
// 鉴权白名单
const whiteList = ['/login']
// 路由拦截
router.beforeEach(async (to, from, next) => {
	console.log(to);
	nprogress.start()
	
	if (store.state.user.access_token) {
		if(to.meta.to_404){
			router.push('/404')
		}
		if (whiteList.indexOf(to.path) !== -1) {
			next({
				path: '/'
			});
			nprogress.done();
		} else {
			const hasRoles = store.state.user.roles && store.state.user.roles.length > 0;
			if (hasRoles) {
				next();
			} else {
				try {
					const {
						roles
					} = await store.dispatch('user/GetUserInfo')
					await store.dispatch('user/generateRoutes', roles)
					next()
				} catch (error) {
					ElMessage.error(error || 'Has Error')
					next(`/login?redirect=${to.path}`)
					NProgress.done()
				}
			}
		}

	} else {
		whiteList.indexOf(to.path) !== -1 ? next() : next(`/login?redirect=${to.path}`)
		nprogress.done()
	}

})

router.afterEach(() => {
	nprogress.done()
})

router.onError(() => {
   router.push('/404')
})

export default router;
