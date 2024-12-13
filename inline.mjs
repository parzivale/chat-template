import { inlineSource } from 'inline-source';
import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'node-html-parser';


const htmlFilePath = path.resolve('dist/index.html');

// Step 1: Read the HTML file
let htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');
const root = parse(htmlContent);

root.getElementsByTagName('script').forEach(script => {
  script.setAttribute('inline', '');
});

root.getElementsByTagName('link').forEach(script => {
  script.setAttribute('inline', '');
});

root.getElementsByTagName('img').forEach(script => {
  script.setAttribute('inline', '');
});


// Step 3: Write the modified HTML back to the file
fs.writeFileSync(htmlFilePath, root.toString());


inlineSource('dist/index.html', {
  rootpath: "./dist",
  compress: false,
}).then(html => {
  fs.writeFileSync('inlined/index.html', html);
  console.log('Inlined JavaScript into HTML!');
});