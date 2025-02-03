export default function () {
	function trackEvent(eventName: string) {
		umTrackEvent(eventName)
	}

	return { trackEvent }
}
