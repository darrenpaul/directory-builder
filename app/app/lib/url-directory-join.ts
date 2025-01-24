import { kebabCase } from 'lodash-es'

export function joinUrlDirectories(directories: string[]) {
	const trailingSlashesRemoved = directories.map(directory =>
		directory.replace(/\/$/, ''),
	)

	const kebabCaseDirectories = trailingSlashesRemoved.map(directory =>
		kebabCase(directory),
	)

	return `/${kebabCaseDirectories.join('/')}`
}
