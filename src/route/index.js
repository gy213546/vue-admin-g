import {
	createRouter,
	createWebHashHistory
} from "vue-router";

import layout from '@/layout'
console.log(layout)
const routes = [{
		path: "/",
		redirect: "/login"
	},
	{
		path: "/home",
		name: "home",
		component: layout,
		redirect: '/home/index',
		children: [{
			path: 'index',
			component: () => import("@/views/home")
		}]
	},
	{
		path: "/login",
		name: "login",
		component: () => import("@/views/login")
	}
]
const router = createRouter({
	history: createWebHashHistory(),
	routes: routes
})

export default router;
