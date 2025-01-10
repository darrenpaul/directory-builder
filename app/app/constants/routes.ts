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

export const adminClaimBusinessRoute = {
	name: 'admin-claim-business',
	label: 'Admin - Claim Business',
	path: `${accountRoute.path}/claim`,
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

export const navigationRoutes = [homeRoute, contactRoute, signInRoute]

export const navigationAuthenticatedRoutes = [
	homeRoute,
	contactRoute,
	accountRoute,
	logoutRoute,
]
