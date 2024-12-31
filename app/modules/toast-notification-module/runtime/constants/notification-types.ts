export const WARN = 'WARN'
export const INFO = 'INFO'
export const SUCCESS = 'SUCCESS'
export const ERROR = 'ERROR'

export type NotificationType =
	| typeof WARN
	| typeof INFO
	| typeof SUCCESS
	| typeof ERROR
