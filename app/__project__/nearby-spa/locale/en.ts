export default defineI18nConfig(() => ({
	legacy: false,
	locale: 'en',
	messages: {
		en: {
			brand: 'Nearby Spa',
			home: {
				lander: {
					title: 'Discover Your Perfect Retreat at Cape Town\'s Best Spas',
					description1:
            'Find exceptional spa retreats around Cape Town with Nearby Spa - your local guide to the city\'s luxurious wellness scene. From hidden sanctuaries in City Bowl to beachfront havens in Sea Point, explore professional massage centers, wellness studios, and specialty day spas just moments away.',
					description2:
            'Start exploring Cape Town\'s wellness havens today - your perfect spa experience is just around the corner.',
					ctaButton: 'Find Spa',
					imageAlt: 'Nearby Spa Landing Page',
				},
				latestPlace: 'Latest Spas',
				whyChoose: {
					title: 'Why Choose Nearby Spa',
					description:
            'Whether you\'re a local seeking your new favorite wellness center or a visitor exploring Cape Town\'s spa scene, Nearby Spa connects you with the perfect relaxation experience.',
					point1: 'Real-time updates on operating hours and locations',
					point2: 'Detailed reviews from wellness enthusiasts',
					point3: 'Curated lists of specialty treatments and services',
					point4: 'Quick filters for amenities, facilities, and private rooms',
					point5: 'Neighborhood-specific spa guides',
				},
			},
			contact: {
				title: 'Contact NearbySpa.info',
				getInTouch: 'Get in Touch',
				description:
          'Whether you\'re a spa owner looking to list your business or a wellness enthusiast with feedback, we\'re here to help.',
				howCanWeHelp: 'How Can We Help You?',
				point1:
          'Add Your Spa Own or manage a spa? Get listed on NearbySpa.info to reach thousands of wellness seekers in your area. Our directory helps local spas connect with customers searching for their next favorite retreat.',
				point2:
          'Update Business Information Need to update your spa\'s details? Let us know about changes to your hours, location, amenities, or other information. We ensure our directory stays current for wellness seekers looking for the perfect spot.',
				point3:
          'Report an Issue Found incorrect information? Help us maintain the quality of our spa directory by reporting any inaccuracies.',
				point4:
          'Partnership Opportunities Interested in collaborating? We work with spas, wellness centers, and industry partners to create better experiences for wellness enthusiasts.',
			},
			submitPlace: {
				button: 'Submit Spa',
				title: 'Add a new spa',
				toastSuccess: 'New spa added',
			},
			city: {
				title: 'Find the Perfect Spa Near You',
				description:
          'Looking for exceptional wellness experiences in your neighborhood? Whether you\'re craving a relaxing massage, searching for specialty treatments, or need a peaceful retreat, we\'ll help you discover the best spas near you.',
			},
			claimBusiness: {
				claimYourListing: 'Claim Your Listing',
				getVerified: 'Get verified and take control of your spa listing!',
				point1: 'Receive a verified badge on your listing.',
				point2:
          'Verified listing will always appear before unverified listings.',
				point3: 'Manage your listing\'s presence on Nearby Spa?',
				point4:
          'Receive a monthly report on how many views your listing received.',
				readyToClaim: 'Ready to manage your spa\'s presence on Nearby Spa?',
			},
			placeList: {
				label: 'Discover Spas in {city}',
			},
			search: {
				businessName: 'Enter a spa name',
			},
			place: {
				regimen: 'Treatment',
			},
			schemaOrg: {
				name: 'Spa Directory',
				cityDescription: 'Find the best spas near you in Cape Town',
			},
		},
	},
}))
