import { h } from '@webtaku/h';

function createIndexPage() {
  return h('div#index',

    // Header
    h('header.relative.h-[75vh].min-h-[25rem].w-full.overflow-hidden.bg-black.border-b.border-gray-800',
      h('div.absolute.top-0.left-0.h-full.w-full.bg-black.opacity-50.z-10'),
      h('video.absolute.top-0.left-0.w-full.h-full.object-cover.z-0',
        {
          playsInline: true,
          autoplay: true,
          muted: true,
          loop: true,
        },
        h('source', { src: '/videos/hero.mp4', type: 'video/mp4' })
      ),
      h('div.container.mx-auto.px-4.h-full.relative.z-20',
        h('div.flex.h-full.text-center.items-center.justify-center', // justify-center 추가
          h('div.w-full.text-white',
            h('h1.text-5xl.md:text-6xl', 'Virtual Bitcoin', {
              style: { fontFamily: 'DominoBrick' },
            }),
            h('p.text-lg.md:text-xl.leading-relaxed.mt-4', 'The Power of Bitcoin, Reimagined on Ethereum.') // 문구 개선
          )
        )
      )
    ),

    // Main
    h('main',
      h('section.container.mx-auto.my-16.text-center.px-4',
        h('h2.text-3xl.md:text-4xl.font-semibold',
          'The power of ',
          h('a.text-blue-400.hover:text-blue-500', { href: 'https://bitcoin.org/', target: '_blank' }, 'Bitcoin'),
          ' as a smart contract'
        ),
        // [수정] 문구를 더 명확하고 설득력있게 변경
        h('p.text-lg.text-gray-400.mt-4.max-w-3xl.mx-auto',
          'Virtual Bitcoin encapsulates the core principles of Bitcoin—scarcity, halving, and decentralization—within the Ethereum ecosystem, with the added benefit of energy efficiency.'
        )
      ),

      h('section.container.mx-auto.my-16.px-4',
        h('div.grid.md:grid-cols-2.gap-8',
          // [수정] 카드 배경을 bg-gray-900, 경계선을 border-gray-800으로 변경
          h('article.bg-gray-900.shadow-lg.rounded-2xl.overflow-hidden',
            h('div.p-6.border-b.border-gray-800',
              h('h3.text-2xl.font-bold.text-white', 'Inspired by Bitcoin')
            ),
            h('div.p-6',
              // [수정] 리스트 문구 개선
              h('ul.space-y-4.text-lg',
                h('li.flex.items-center', h('span.text-green-500.mr-3', '✔'), 'Fixed Supply of 21 Million'),
                h('li.flex.items-center', h('span.text-green-500.mr-3', '✔'), 'Predictable Halving Cycle'),
                h('li.flex.items-center', h('span.text-green-500.mr-3', '✔'), 'Decentralized & Community-Driven')
              )
            )
          ),
          // [수정] 카드 배경을 bg-gray-900, 헤더 색상을 bg-emerald-900으로 변경
          h('article.bg-gray-900.shadow-lg.rounded-2xl.overflow-hidden',
            h('div.p-6.bg-emerald-900.text-white',
              h('h3.text-2xl.font-bold', 'Powered by Ethereum')
            ),
            h('div.p-6',
              // [수정] 리스트 문구 개선
              h('ul.space-y-4.text-lg',
                h('li.flex.items-center', h('span.text-green-500.mr-3', '✔'), 'Seamless DeFi Integration'),
                h('li.flex.items-center', h('span.text-green-500.mr-3', '✔'), 'Eco-Friendly & Energy-Efficient'),
                h('li.flex.items-center', h('span.text-green-500.mr-3', '✔'), "Leverages Ethereum's Security")
              )
            )
          )
        )
      )
    ),

    // [수정] 기존 footer를 'Resources' 섹션으로 변경 (div -> section)
    h('section.container.mx-auto.my-16.px-4.border-t.border-gray-800.pt-10',
      h('h4.text-2xl.font-semibold.mb-5', 'Resources'),
      h('ul.space-y-3.text-base',
        h('li',
          h('strong.font-semibold.text-gray-300', 'Contract Address: '),
          h('a.text-blue-400.hover:text-blue-500.break-all',
            { href: 'https://etherscan.io/token/0x84e7ae4897b3847b67f212aff78bfbc5f700aa40', target: '_blank' },
            '0x84e7ae4897b3847b67f212aff78bfbc5f700aa40'
          )
        ),
        h('li',
          h('strong.font-semibold.text-gray-300', 'Smart Contract Source: '),
          h('a.text-blue-400.hover:text-blue-500',
            { href: 'https://github.com/virtual-bitcoin/virtual-bitcoin', target: '_blank' },
            'GitHub Repository'
          )
        ),
        h('li',
          h('strong.font-semibold.text-gray-300', 'Website Source: '),
          h('a.text-blue-400.hover:text-blue-500',
            { href: 'https://github.com/virtual-bitcoin/virtual-bitcoin.github.io', target: '_blank' },
            'GitHub Repository'
          )
        )
      )
    )
  );
}

export { createIndexPage };