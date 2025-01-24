export const homeRoute = {
	name: 'home',
	label: 'Home',
	path: '/',
	auth: false,
}

export const contactRoute = {
	name: 'contact',
	label: 'Contact',
	path: '/contact',
	auth: false,
}

export const signInRoute = {
	name: 'sign-in',
	label: 'Sign In',
	path: '/auth/sign-in',
	auth: false,
}

export const signUpRoute = {
	name: 'sign-up',
	label: 'Sign Up',
	path: '/auth/sign-up',
	auth: false,
}

export const logoutRoute = {
	name: 'logout',
	label: 'Logout',
	path: '/auth/logout',
	auth: false,
}

export const accountRoute = {
	name: 'account',
	label: 'Account',
	path: '/account',
	auth: true,
}

export const accountSecurityRoute = {
	name: 'account-security',
	label: 'Security',
	path: `/account/security`,
	auth: true,
}

export const listingRoute = {
	name: 'listing',
	label: 'Listing',
	path: '/listing',
	auth: false,
}

export const stateRoute = {
	name: 'states',
	label: 'States',
	path: '/states',
	auth: false,
}

export const cityRoute = {
	name: 'cities',
	label: 'Cities',
	path: '/cities',
	auth: false,
}

export const termsAndConditionsRoute = {
	name: 'terms-and-conditions',
	label: 'Terms and Conditions',
	path: '/terms-and-conditions',
	auth: false,
}

export const blogsRoute = {
	name: 'blogs',
	label: 'Blogs',
	path: '/blogs',
	auth: false,
}

export const adminBlogsRoute = {
	name: 'admin-blogs',
	label: 'Blogs',
	path: '/admin/blogs',
	auth: true,
}

export const navigationRoutes = [homeRoute, contactRoute, signInRoute]

export const navigationAuthenticatedRoutes = [
	homeRoute,
	blogsRoute,
	contactRoute,
	accountRoute,
	logoutRoute,
]
