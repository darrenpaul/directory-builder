import Anthropic from '@anthropic-ai/sdk'

export async function askQuestionsAboutPlace(
	content: string | null | undefined,
) {
	if (!content) {
		return []
	}

	const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

	const prompts = [
		'Read the content and answer the following questions.',
		'Respond with only true or false, no other text.',
		'Structure as Json.',
	].join('\n')

	const questions = [
		'Is there wifi? ({label:"Has Wifi",key:"hasWifi", value:??})',
	].join('\n')

	const msg = await anthropic.messages.create({
		model: 'claude-3-5-sonnet-20241022',
		max_tokens: 1000,
		temperature: 0,
		system: `${prompts}${questions}`,
		messages: [
			{
				role: 'user',
				content: [
					{
						type: 'text',
						text: content,
					},
				],
			},
		],
	})

	return [JSON.parse(msg.content[0].text)].flat()
}

export async function genearateDescriptionAndMetaInformation(
	content: string | null | undefined,
) {
	if (!content) {
		return []
	}

	if (!content) {
		return { metaTitle: null, metaDescription: null, description: null }
	}

	const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

	const msg = await anthropic.messages.create({
		model: 'claude-3-5-sonnet-20241022',
		max_tokens: 1000,
		temperature: 0,
		system:
      'Write a short description about the coffee shop, key name is description. Write a SEO optimized title (metaTitle) and description (metaDescription). Format as a json structure, don\'t nest this data',
		messages: [
			{
				role: 'user',
				content: [
					{
						type: 'text',
						text: content,
					},
				],
			},
		],
	})

	const { metaTitle, metaDescription, description } = JSON.parse(
		msg.content[0].text,
	)

	return { metaTitle, metaDescription, description }
}

export async function getUrls(content: string | null | undefined) {
	if (!content) {
		return {
			menu: null,
			facebook: null,
			instagram: null,
			twitter: null,
			phone: null,
			specials: null,
		}
	}
	const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

	const prompts = [
		'Please go through the content and get all the urls that match the criteria only return oe of each',
		'Menu, facebook, instagram, twitter, phone, whatsapp, specials',
		'Please clean up phone numbers and add the dailing code +27 and only return the first phone number if there are multiple phone numbers',
		'Please clean up urls',
		'Respond with no other text, ',
		'Structure as Json.',
	].join('\n')

	const msg = await anthropic.messages.create({
		model: 'claude-3-5-sonnet-20241022',
		max_tokens: 1000,
		temperature: 0,
		system: `${prompts}`,
		messages: [
			{
				role: 'user',
				content: [
					{
						type: 'text',
						text: content,
					},
				],
			},
		],
	})

	return JSON.parse(msg.content[0].text)
}
