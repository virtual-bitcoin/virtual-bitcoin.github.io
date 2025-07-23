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
<html lang="en" class="dark">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.1/cdn/themes/dark.css">
    <script type="module"
      src="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.1/cdn/shoelace-autoloader.js"></script>
  </head>

  <body class="sl-theme-dark">
    ${body}
    <script src="bundle.js"></script>
  </body>
</html>`;
}

for (const page of pages) {
  const html = renderPage(page.title, page.content);
  writeFileSync(join(__dirname, `../docs/${page.filename}`), html);
  console.log(`✅ ${page.filename} generated.`);
}
