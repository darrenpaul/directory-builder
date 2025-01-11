import puppeteer from 'puppeteer'

export async function scrapWebsite(url: string) {
	if (!url || url.includes('facebook') || url.includes('instagram')) {
		return { textContent: null, links: null }
	}

	const browser = await puppeteer.launch({
		headless: false,
		defaultViewport: null,
	})

	try {
		const page = await browser.newPage()

		await page.goto(url, {
			waitUntil: 'domcontentloaded',
		})

		const scrapHeadings = await page.evaluate(() => {
			const headingTypes = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
			const headingsText = headingTypes.map((headingType) => {
				return Array.from(document.querySelectorAll(headingType))
					.map(e => e.textContent.trim())
					.filter(t => t.length > 0)
					.join('\n')
			})

			return headingsText.filter(t => t.length > 0)
		})

		const scrapParagraphs = await page.evaluate(() => {
			return Array.from(document.querySelectorAll('p'))
				.map(p => p.textContent.trim())
				.filter(t => t.length > 0)
		})

		const scrapLinks = await page.evaluate(() => {
			return Array.from(document.querySelectorAll('a')).map(anchor => ({
				text: anchor.textContent.trim(),
				href: anchor.href,
			}))
		})

		const headings = scrapHeadings.flat().join('\n')
		const paragraphs = scrapParagraphs.flat().join('\n')
		const links = scrapLinks

		const contactPageUrl = links.find(link =>
			link.text.toLowerCase().includes('contact'),
		)?.href
		if (contactPageUrl) {
			const contactPage = await browser.newPage()

			await contactPage.goto(contactPageUrl, {
				waitUntil: 'domcontentloaded',
			})

			const scrapContactPageLinks = await contactPage.evaluate(() => {
				return Array.from(document.querySelectorAll('a')).map(anchor => ({
					text: anchor.textContent.trim(),
					href: anchor.href,
				}))
			})

			const contactPageLinks = scrapContactPageLinks
			links.push(...contactPageLinks)
		}

		return {
			textContent: [headings, paragraphs].join('\n'),
			links: JSON.stringify(links.flat()),
		}
	}
	catch {
		return { textContent: null, links: null }
	}
	finally {
		await browser.close()
	}
}
