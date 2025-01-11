export default defineI18nConfig(() => ({
	legacy: false,
	locale: 'en',
	messages: {
		en: {
			home: {
				lander: {
					title: 'Discover Your Perfect Cup at Cape Town\'s Best Coffee Shops',
					description1: 'Find exceptional coffee spots around Cape Town with Nearby Coffee - your local guide to the city\'s vibrant café culture. From hidden gems in City Bowl to seaside spots in Sea Point, explore artisanal roasteries, cozy cafés, and specialty coffee houses just moments away.',
					description2: 'Start exploring Cape Town\'s coffee culture today - your next great cup is just around the corner.',
					ctaButton: 'Find Coffee',
				},
				latestPlace: 'Latest Coffee Shops',
				whyChoose: {
					title: 'Why Choose Nearby Coffee',
					description: 'Whether you\'re a local seeking your new favorite spot or a visitor exploring Cape Town\'s coffee scene, Nearby Coffee connects you with the perfect café experience.',
					point1: 'Real-time updates on operating hours and locations',
					point2: 'Detailed reviews from local coffee enthusiasts',
					point3: 'Curated lists of specialty roasters and brew methods',
					point4: 'Quick filters for wifi, workspace, and outdoor seating',
					point5: 'Neighborhood-specific coffee guides',
				},
			},
			submitPlace: {
				button: 'Submit Coffee Shop',
				title: 'Add a new coffee shop',
				toastSuccess: 'New coffee shop added',
			},
		},
	},
}))
