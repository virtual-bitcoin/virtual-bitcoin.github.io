import { h } from '@webtaku/h';

function createAboutPage() {
  return h('div#about',
    h('h1', 'About Us'),
    h('p', 'This is the about page.'),
    h('a', 'Back to Home', { href: 'index.html' })
  );
}

export { createAboutPage };
