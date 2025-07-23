import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';
import { createIndexPage } from './pages/index';
import { createMiningPage } from './pages/mining';
import { h } from '@webtaku/h';

const LOGO_IMAGE = readFileSync('./assets/logo.png').toString('base64');

type Page = {
  filename: string;
  title: string;
  content: string;
};

const pages: Page[] = [
  {
    filename: 'index.html',
    title: 'Virtual Bitcoin',
    content: createIndexPage()
  },
  {
    filename: 'mining.html',
    title: 'Mining VBTC',
    content: createMiningPage()
  }
];

function renderPage(title: string, body: string) {
  return '<!DOCTYPE html>' + h(
    'html.dark', { lang: 'en' },
    h(
      'head',
      '<meta charset="UTF-8">',
      h('meta', {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0'
      }),
      h('title', title),
      h('script', { src: 'https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4' }),
      h('link', {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.1/cdn/themes/dark.css'
      }),
      h('link', { rel: 'stylesheet', href: 'styles.css' }),
      h('script', {
        type: 'module',
        src: 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.1/cdn/shoelace-autoloader.js'
      }),
    ),
    h(
      'body.bg-gray-950.text-gray-300.sl-theme-dark',
      h(
        'nav.bg-gray-950.shadow-md.border-b.border-gray-800',
        h(
          'div.container.mx-auto.px-4.py-3.flex.justify-between.items-center',
          h(
            'a.flex.items-center.space-x-2',
            { href: 'index.html' },
            h('img.h-8.w-8', {
              src: `data:image/png;base64,${LOGO_IMAGE}`,
              alt: 'Logo',
            }),
            h('span.text-xl.font-bold.text-white', 'Virtual Bitcoin')
          ),
          h(
            'a',
            { href: 'mining.html' },
            h('sl-button', 'Mining VBTC')
          )
        )
      ),

      // body content
      body,

      // [추가] 사이트 전체에 적용될 공통 푸터
      h('footer.bg-gray-950.border-t.border-gray-800.mt-16',
        h('div.container.mx-auto.px-4.py-6.text-center.text-gray-500.text-sm',
          `${new Date().getFullYear()} Virtual Bitcoin. Open Source under the MIT License.`
        )
      ),

      // scripts
      h('script', { src: 'bundle.js' }),
    )
  );
}

for (const page of pages) {
  const html = renderPage(page.title, page.content);
  writeFileSync(join(__dirname, `../public/${page.filename}`), html);
  console.log(`✅ ${page.filename} generated.`);
}