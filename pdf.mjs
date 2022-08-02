import puppeteer from "puppeteer";
import mustache from "mustache";

export async function generatePdf(template, view) {
  const html = mustache.render(template, view);

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
  });

  const page = await browser.newPage();

  await page.setContent(html, {
    waitUntil: "networkidle0",
  });

  const data = await page.pdf({
    format: `letter`,
    printBackground: true,
  });

  await page.close();
  await browser.close();

  return Buffer.from(Object.values(data));
}

export function generatePdfBase64(...args) {
  return generatePdf(...args).then(pdfBuffer => pdfBuffer.toString("base64"));
}
