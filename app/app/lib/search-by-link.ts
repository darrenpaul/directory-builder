import type { City } from '~~/types/city'
import type { Country } from '~~/types/country'
import type { State } from '~~/types/state'
import { kebabCase } from 'lodash-es'
import { cityRoute, countryRoute, stateRoute } from '~/constants/routes'

export function searchByLinkForCountries(countries: Country[]) {
	if (!countries) {
		return []
	}

	return countries.map(({ country }) => ({
		id: `country-${country}`,
		url: `${countryRoute.path}/${kebabCase(country)}`,
		label: country,
	}))
}

export function searchByLinkForStates(states: State[]) {
	if (!states) {
		return []
	}

	return states.map(({ country, state }) => ({
		id: `state-${state}`,
		url: `${countryRoute.path}/${kebabCase(country)}${stateRoute.path}/${kebabCase(state)}`,
		label: state,
	}))
}

export function searchByLinkForCities(cities: City[]) {
	if (!cities) {
		return []
	}

	return cities.map(({ country, state, city }) => ({
		id: `city-${city}`,
		url: `${countryRoute.path}/${kebabCase(country)}${stateRoute.path}/${kebabCase(state)}${cityRoute.path}/${kebabCase(city)}`,
		label: city,
	}))
}
