export default class UrlQueryBuilder {
	private queryParams: URLSearchParams
	private baseUrl: string

	constructor(baseUrl: string) {
		this.baseUrl = baseUrl
		this.queryParams = new URLSearchParams()
	}

	withBusinessName({ businessName }: Record<string, string>) {
		this.queryParams.delete('businessName')

		if (businessName) {
			this.queryParams.append('businessName', businessName)
		}

		return this
	}

	withCountryName({ country }: Record<string, string>) {
		this.queryParams.delete('country')

		if (country) {
			this.queryParams.append('country', country.replaceAll('-', ' '))
		}

		return this
	}

	withStateName({ state }: Record<string, string>) {
		this.queryParams.delete('state')

		if (state) {
			this.queryParams.append('state', state.replaceAll('-', ' '))
		}

		return this
	}

	withCityName({ city }: Record<string, string>) {
		this.queryParams.delete('city')

		if (city) {
			this.queryParams.append('city', city.replaceAll('-', ' '))
		}

		return this
	}

	withPostalCode({ postalCode }: Record<string, string>) {
		this.queryParams.delete('postalCode')

		if (postalCode) {
			this.queryParams.append('postalCode', postalCode.replaceAll('-', ' '))
		}

		return this
	}

	withSlug({ slug }: Record<string, string>) {
		this.queryParams.delete('slug')

		if (slug) {
			this.queryParams.append('slug', slug)
		}

		return this
	}

	withLimit({ limit }: Record<string, number>) {
		this.queryParams.delete('limit')

		if (limit) {
			this.queryParams.append('limit', limit)
		}

		return this
	}

	withAllowsDogs({ allowsDogs }: Record<string, string>) {
		this.queryParams.delete('allowsDogs')

		if (allowsDogs) {
			this.queryParams.append('allowsDogs', allowsDogs)
		}

		return this
	}

	withHasWifi({ hasWifi }: Record<string, string>) {
		this.queryParams.delete('hasWifi')

		if (hasWifi) {
			this.queryParams.append('hasWifi', hasWifi)
		}

		return this
	}

	build() {
		const elements = [this.baseUrl]

		const queryString = this.queryParams.toString()

		if (queryString) {
			elements.push(queryString)
		}

		return elements.join('?')
	}
}
