import Anthropic from '@anthropic-ai/sdk'
import { directoryInformation, projectQuestions } from './config'

export async function askQuestionsAboutPlace(
	content: string | null | undefined,
) {
	if (!content) {
		return []
	}

	const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

	const prompts = [
		'Read the content and answer the following questions. with true or false, no other information.',
		'You are a JSON processing assistant.',
		'Return only valid array of JSON objects, with no additional text or formatting.',
		'Follow this exact format: {"label": "Has X", "key": "hasX", "value": boolean}',
	].join('\n')

	const msg = await anthropic.messages.create({
		model: 'claude-3-5-sonnet-20241022',
		max_tokens: 1000,
		temperature: 0,
		system: prompts,
		messages: [
			{
				role: 'user',
				content: [
					{
						type: 'text',
						text: projectQuestions.join('\n'),
					},
				],
			},
		],
	})

	const textContent = msg.content[0].text
		.replaceAll(
			'Based on the content provided, here are the answers in the requested JSON format:\n\n',
			'',
		)
		.replaceAll(
			'Based on the content provided, here are the JSON responses for checking if the website has wifi:\n\n',
			'',
		)

	try {
		return [JSON.parse(textContent)].flat()
	}
	catch (e) {
		console.error(e)
		throw createError({
			statusCode: 500,
			statusMessage: e,
		})
	}
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

	const directoryType = directoryInformation.join(', ')

	const prompts = [
		`You are an SEO expert writing content for a ${directoryType} directory profile page about a specific ${directoryType}`,
		`Write a short description for the profile page of the ${directoryType}, (description)`,
		'Write a SEO optimized title (metaTitle)',
		'Write a SEO optimized description (metaDescription). Ensure this is between 110 and 160 characters,',
		'system: You are a JSON processing assistant. Return only a valid JSON object, with no additional text or formatting. Follow this exact format: {"description": "???", "metaTitle": "???", "metaDescription": "???"}',
	].join('\n')

	const msg = await anthropic.messages.create({
		model: 'claude-3-5-sonnet-20241022',
		max_tokens: 1000,
		temperature: 0,
		system: prompts,
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
	if (!content || content.length < 0) {
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
		'system: You are a JSON processing assistant. Return only a valid JSON object, with no additional text or formatting. Follow this exact format: {"description": "???", "metaTitle": "???", "metaDescription": "???"}',
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

export async function generatePageMetadata({
	company,
	focus,
	keywordResearch,
	location,
	targetAudience,
}: {
	company: string
	focus: string
	keywordResearch: string
	location: string
	targetAudience: string
}) {
	const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

	const prompts = [
		'You are an SEO expert, with experience in copy writing and marketing content.',
		'Requirements\n',
		'Meta title: 50-60 characters, including primary keyword',
		'Meta description: 110-160 characters',
		`Must include location "${location}" and focus "${focus}"`,
		`Must naturally incorporate keywords: "${focus} in ${location}" or "${focus} near me"`,
	].join('\n')

	const textContent = [
		`Company: ${company}`,
		`Focus: ${focus}`,
		`Keyword research: ${keywordResearch}`,
		`Location: ${location}`,
		`Target audience: ${targetAudience}`,
		'Tone: Professional yet welcoming, emphasizing local expertise',
		'Only return the requested data and fields',
		'Output Format: JSON (not nested) format: {"metaTitle": "your title here","metaDescription": "your description here"}',
	].join('\n')

	const msg = await anthropic.messages.create({
		model: 'claude-3-5-sonnet-20241022',
		max_tokens: 1000,
		temperature: 0,
		system: prompts,
		messages: [
			{
				role: 'user',
				content: [
					{
						type: 'text',
						text: textContent,
					},
				],
			},
		],
	})

	return JSON.parse(msg.content[0].text)
}
