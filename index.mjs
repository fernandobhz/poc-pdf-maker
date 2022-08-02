import { generatePdfBase64 } from './pdf.mjs'
import timers from 'timers/promises';

while (true) {
  const template = `
    Sample PDF Generation: <br />
    <pre>{{data}}</pre>
  `;

  const view = { data: `Data inputed by view` };

  const pdf64 = await generatePdfBase64(template, view);

  console.log(new Date().toISOString());

  await timers.setTimeout(100);
}

