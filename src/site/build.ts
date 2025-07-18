import { writeFileSync } from 'fs';
import { join } from 'path';
import { createIndexPage } from './pages/index';
import { createAboutPage } from './pages/about';

type Page = {
  filename: string;
  title: string;
  content: string;
};

const pages: Page[] = [
  {
    filename: 'index.html',
    title: 'Home',
    content: createIndexPage()
  },
  {
    filename: 'about.html',
    title: 'About',
    content: createAboutPage()
  }
];

function renderPage(title: string, body: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <link rel="stylesheet" href="styles.css">
  <link rel="stylesheet" href="bundle.css">
</head>
  <body>
    ${body}
    <script src="bundle.js"></script>
  </body>
</html>`;
}

for (const page of pages) {
  const html = renderPage(page.title, page.content);
  writeFileSync(join(__dirname, `../../docs/${page.filename}`), html);
  console.log(`✅ ${page.filename} generated.`);
}
