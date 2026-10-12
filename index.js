const puppeteer = require("puppeteer");

async function Scrape() {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	await page.goto("https://wikirby.com/wiki/Kirby_no_Copy-toru!#List_of_cards");
	await page.setViewport({ width: 1080, height: 1024 });

	await page.click(
		"#mw-content-text > div.mw-content-ltr.mw-parser-output > table:nth-child(22) > tbody > tr:nth-child(1) > th > button > span",
	);

	const tableData = await page.$$eval(
		"#mw-content-text > div.mw-content-ltr.mw-parser-output > table:nth-child(22)",
		(tds) =>
			tds.map((td) => {
				return td.innerHTML;
			}),
	);

	const fullString = tableData[0];
	const re = /(\n|\<tr.*\>)/g;
	let trs = fullString.replaceAll(re, "").split("</tr>");

	console.log(trs);

	await browser.close();
}
Scrape();
