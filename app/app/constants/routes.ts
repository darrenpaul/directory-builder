export const homeRoute = {
	name: 'home',
	label: 'Home',
	path: '/',
}

export const contactRoute = {
	name: 'contact',
	label: 'Contact',
	path: '/contact',
}

export const listingRoute = {
	name: 'coffee-shops',
	label: 'Coffee Shops',
	path: '/coffee-shops',
}

export const signInRoute = {
	name: 'sign-in',
	label: 'Sign In',
	path: '/auth/sign-in',
}

export const signUpRoute = {
	name: 'sign-up',
	label: 'Sign Up',
	path: '/auth/sign-up',
}

export const adminRoute = {
	name: 'admin',
	label: 'Admin',
	path: '/admin',
}

export const adminClaimBusinessRoute = {
	name: 'admin-claim-business',
	label: 'Admin - Claim Business',
	path: `${adminRoute.path}/claim`,
}

export const countryRoute = {
	name: 'countries',
	label: 'Countries',
	path: '/countries',
}

export const stateRoute = {
	name: 'states',
	label: 'States',
	path: '/states',
}

export const cityRoute = {
	name: 'cities',
	label: 'Cities',
	path: '/cities',
}

export const navigationRoutes = [homeRoute, contactRoute]
