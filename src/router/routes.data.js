import { Home } from '@/pages/home/home.component'
import { Auth } from '@/pages/auth/auth.component'
import { AboutUs } from '@/pages/about-us/about-us.component'

export const ROUTES = [
	{
		path: '/',
		component: Home
	},
	{
		path: '/auth',
		component: Auth
	},
	{
		path: '/about-us',
		component: AboutUs
	},
]
