const puppeteer = require("puppeteer");
const fs = require("fs");

async function Scrape() {
	const browser = await puppeteer.launch({ headless: true });
	const page = await browser.newPage();

	await page.goto("https://wikirby.com/wiki/Kirby_no_Copy-toru!#List_of_cards");
	await page.setViewport({ width: 1080, height: 1024 });

	const buttonSelectors = [
		"#mw-content-text > div.mw-content-ltr.mw-parser-output > table.wikitable.sticky-latest.mw-collapsible.mw-made-collapsible.mw-collapsed > tbody > tr:nth-child(1) > th > button",
		"#mw-content-text > div.mw-content-ltr.mw-parser-output > table:nth-child(27) > tbody > tr:nth-child(1) > th > button",
		"#mw-content-text > div.mw-content-ltr.mw-parser-output > table:nth-child(32) > tbody > tr:nth-child(1) > th > button",
		"#mw-content-text > div.mw-content-ltr.mw-parser-output > table:nth-child(75) > tbody > tr:nth-child(1) > th > button",
	];

	for (const selector of buttonSelectors) {
		try {
			await page.waitForSelector(selector, { timeout: 5000 });
			const button = await page.$(selector);
			if (button) {
				await button.click();
				await new Promise((r) => setTimeout(r, 1000));
			}
		} catch (error) {
			console.log(
				`Nem sikerült kattintani a szelektoron: ${selector}`,
				error.message,
			);
		}
	}

	const allCardsData = await page.evaluate(() => {
		const tables = document.querySelectorAll("table.wikitable");
		let extractedData = [];

		tables.forEach((table, tableIndex) => {
			const rows = table.querySelectorAll("tr");
			let tableHeader = table.querySelector("tr th");
			let category = tableHeader
				? tableHeader.innerText.trim()
				: "Unknown Table";

			rows.forEach((row) => {
				const cells = row.querySelectorAll("td");

				if (cells.length === 0) return;

				const img = row.querySelector("img");
				const japaneseNameEl = row.querySelector("b");
				const englishNameEl = row.querySelector("i");
				const links = Array.from(row.querySelectorAll("a")).map((a) => ({
					text: a.innerText.trim(),
					href: a.href,
				}));

				const cellTexts = Array.from(cells).map((cell) =>
					cell.innerText.trim(),
				);

				extractedData.push({
					category: category,
					tableIndex: tableIndex,
					image: img
						? {
								src: img.src,
								srcset: img.srcset || null,
							}
						: null,
					names: {
						japanese: japaneseNameEl ? japaneseNameEl.innerText.trim() : null,
						english: englishNameEl ? englishNameEl.innerText.trim() : null,
					},
					rawCells: cellTexts,
					links: links,
				});
			});
		});

		return extractedData;
	});

	fs.writeFileSync(
		"kirby_cards.json",
		JSON.stringify(allCardsData, null, 2),
		"utf-8",
	);
	console.log(`Done!`);

	await browser.close();
}

Scrape();
