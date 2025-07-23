import { h } from '@webtaku/h';

function createMiningPage() {
  return h('main#mining.container.mx-auto.px-4.my-16.text-gray-300',

    // 헤더
    h('header.mb-10',
      h('h1.text-4xl.font-medium.mb-4', 'Mining Virtual Bitcoin'),
      h('p.text-lg.text-gray-400',
        'Virtual Bitcoin introduces a mining mechanism inspired by Bitcoin’s proof-of-work, but optimized for energy efficiency and seamless integration with Ethereum smart contracts.'
      )
    ),

    // 본문 소개
    h('section.text-base.leading-relaxed.space-y-4',
      h('p.leading-normal',
        h('span.block',
          'Through mining, you can participate in the Virtual Bitcoin ecosystem and earn VBTC tokens by interacting with smart contracts.'
        ),
        h('span.block',
          'The mining process retains the spirit of Bitcoin by incorporating concepts like halving and fixed supply, yet benefits from Ethereum’s security and eco-friendliness.'
        )
      )
    ),

    // 마이닝 기능 구현될 영역
    h('section#mining-feature.mt-16.p-4.bg-gray-900.rounded-lg.border.border-gray-800',
      h('h2.text-2xl.font-medium.mb-4', 'Mining Interface'),
      h('div#mining-interface')
    )
  );
}

export { createMiningPage };
