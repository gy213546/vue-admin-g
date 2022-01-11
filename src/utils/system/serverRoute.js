import Layout from '@/layout'
// 后台路由处理
export const getAsyncRoutes = (routes) => {
	const keys = ['path', 'name', 'children']
	const modules = import.meta.glob("../../views/**/**.vue");
	return routes.map(route => {
		const newRoute = {};
		newRoute['meta'] = {};
		if (route.children && route.children.length) {
			newRoute.component = Layout;
			const path = route.children[0].path;
			newRoute.redirect = path.indexOf('/index') != -1 ? path : path.replace('/index', '');
		} else {
			newRoute.component = modules[`../../views${route.path}.vue`]
		}
		for (const key in route) {
			if (keys.includes(key)) {
				if (key == 'path') {
					const path = route[key];
					newRoute[key] = path.indexOf('/index') != -1 ? path : path.replace('/index', '')
				} else {
					newRoute[key] = route[key]
				}
			}else{
				if (key == 'label') {
				  newRoute['meta']['title'] = route[key]
				} else if (key == 'keepAlive') {
				  newRoute['meta']['keepAlive'] = Boolean(Math.floor(route[key]))
				} else {
				  newRoute['meta'][key] = route[key]
				}
			}
		}
		if (newRoute.children && newRoute.children.length) {
		  newRoute.children = getAsyncRoutes(route.children)
		}
		return newRoute;
	})
}