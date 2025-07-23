import { h } from '@webtaku/h';

function createMiningPage() {
  return h('main#mining',
    h('h1', 'Mining'),
    h('p', 'This is the mining page.'),
    h('a', 'Back to Home', { href: 'index.html' })
  );
}

export { createMiningPage };
