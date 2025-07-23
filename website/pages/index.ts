import { h } from '@webtaku/h';

function createIndexPage() {
  return h('div#home',
    h('h1', 'Home Page'),
    h('p', 'Welcome to the home page!'),
    h('a', 'Go to About', { href: 'about.html' })
  );
}

export { createIndexPage };
