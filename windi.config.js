import {
	defineConfig
} from 'windicss/helpers'

export default defineConfig({
	/* configurations... */
	important: true,
	theme: {
		
		extend: {
			backgroundImage: {
				'login-bg': "url('/image/login_bg.png')"
			},
			backgroundPosition: {
				'center-75': '75%'
			}
		}
	}
})
