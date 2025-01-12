import { kebabCase } from 'lodash-es'
import { listingRoute } from '~/constants/routes'

export function joinUrlDirectories(directories: string[]) {
	const trailingSlashesRemoved = directories.map(directory =>
		directory.replace(/\/$/, ''),
	)

	const kebabCaseDirectories = trailingSlashesRemoved.map(directory =>
		kebabCase(directory),
	)

	return `${listingRoute.path}/${kebabCaseDirectories.join('/')}`
}
