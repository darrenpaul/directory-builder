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

	withCountryName({ countryName }: Record<string, string>) {
		this.queryParams.delete('countryName')

		if (countryName) {
			this.queryParams.append('countryName', countryName)
		}

		return this
	}

	withCityName({ cityName }: Record<string, string>) {
		this.queryParams.delete('cityName')

		if (cityName) {
			this.queryParams.append('cityName', cityName)
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

	build() {
		const elements = [this.baseUrl]

		const queryString = this.queryParams.toString()

		if (queryString) {
			elements.push(queryString)
		}

		return elements.join('?')
	}
}
