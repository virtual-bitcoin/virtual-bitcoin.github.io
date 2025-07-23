import { h } from '@webtaku/h';

function createMiningPage() {
  return h('main#mining.container.mx-auto.px-4.my-16.text-gray-300',

    // Header
    h('header.mb-10.text-center',
      h('h1.text-4xl.font-medium.mb-4', 'Mining Virtual Bitcoin'),
      h('p.text-lg.max-w-2xl.mx-auto.text-gray-400',
        'Mine Virtual Bitcoin and earn VBTC tokens by interacting with smart contracts — inspired by Bitcoin’s proof-of-work, yet optimized for energy efficiency and seamlessly integrated with Ethereum.'
      )
    ),

    // Wallet Connect & Stats
    h('section#mining-interface', h('div.mt-8.flex.justify-center.items-center', h('sl-spinner')))
  );
}

export { createMiningPage };
