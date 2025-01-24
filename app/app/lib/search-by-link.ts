import type { City } from '~~/types/city'
import type { Country } from '~~/types/country'
import type { State } from '~~/types/state'
import { listingRoute } from '~/constants/routes'
import { joinUrlDirectories } from '~/lib/url-directory-join'

export function searchByLinkForCountries(countries: Country[]) {
	if (!countries) {
		return []
	}

	return countries.map(({ country }) => ({
		id: `country-${country}`,
		url: joinUrlDirectories([listingRoute.path, country]),
		label: country,
	}))
}

export function searchByLinkForStates(states: State[]) {
	if (!states) {
		return []
	}

	return states.map(({ country, state }) => ({
		id: `state-${state}`,
		url: joinUrlDirectories([listingRoute.path, country, state]),
		label: state,
	}))
}

export function searchByLinkForCities(cities: City[]) {
	if (!cities) {
		return []
	}

	return cities.map(({ country, state, city }) => ({
		id: `city-${city}`,
		url: joinUrlDirectories([listingRoute.path, country, state, city]),
		label: city,
	}))
}
