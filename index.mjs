import { generatePdfBase64 } from './pdf.mjs'
import timers from 'timers/promises';
import fs from 'fs/promises';

const template = await fs.readFile('./template.html', 'utf8');
const view = await fs.readFile('./view.json', 'utf8').then(JSON.parse);

while (true) {
  const pdf64 = await generatePdfBase64(template, view);
  console.log(new Date().toISOString());
  await timers.setTimeout(1);
}
