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
      ),

      // Fully Decentralized Section
      h('section.container.mx-auto.my-16.px-4.text-center',
        h('h2.text-3xl.md:text-4xl.font-semibold.mb-6', 'Fully Decentralized'),
        h('p.text-lg.text-gray-400.mb-10.max-w-3xl.mx-auto',
          'VBTC was launched with no central ownership, no developer allocation, no protocol fees, and with permanently locked liquidity.'
        ),
        h('div.grid.md:grid-cols-2.gap-8.text-left',
          h('div.bg-gray-900.p-6.rounded-2xl.shadow',
            h('h3.text-xl.font-bold.text-white.mb-4', 'No Ownership or Admin'),
            h('p.text-gray-400', 'There are no admin keys or ownership privileges. The contract is immutable and permissionless.')
          ),
          h('div.bg-gray-900.p-6.rounded-2xl.shadow',
            h('h3.text-xl.font-bold.text-white.mb-4', 'Zero Protocol Fees'),
            h('p.text-gray-400', 'The VBTC protocol charges no usage fees. 100% of value remains with the users.')
          ),
          h('div.bg-gray-900.p-6.rounded-2xl.shadow',
            h('h3.text-xl.font-bold.text-white.mb-4', 'No Developer Allocation'),
            h('p.text-gray-400', 'There was no team or VC allocation. VBTC was launched fairly without reserved supply.')
          ),
          h('div.bg-gray-900.p-6.rounded-2xl.shadow',
            h('h3.text-xl.font-bold.text-white.mb-4', 'Liquidity Burned Permanently'),
            h('p.text-gray-400.mb-2', 'LP tokens were sent to a burn address, ensuring trading liquidity is permanent.'),
            h('a.text-blue-400.hover:text-blue-500.text-sm.break-all',
              {
                href: 'https://etherscan.io/tx/0x58b19a3e99c4e9f81c3479c840f0049254051da82a0a98aa3b03e8c88ab00bfa',
                target: '_blank',
                rel: 'noopener noreferrer'
              },
              'View Burn Transaction on Etherscan ↗'
            )
          )
        )
      ),

      // Trade Section
      h('section.container.mx-auto.my-16.text-center.px-4',
        h('h2.text-3xl.md:text-4xl.font-semibold.mb-6', 'Trade VBTC'),
        h('p.text-lg.text-gray-400.mb-6.max-w-2xl.mx-auto',
          'Swap VBTC on Uniswap with just a few clicks.'
        ),
        h('a.inline-block.bg-blue-600.hover:bg-blue-700.text-white.text-lg.font-semibold.px-6.py-3.rounded-xl.transition',
          {
            href: 'https://app.uniswap.org/swap?inputCurrency=0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf&outputCurrency=0x84e7AE4897B3847B67f212Aff78BFbC5f700aa40&version=2',
            target: '_blank',
            rel: 'noopener noreferrer'
          },
          'Trade on Uniswap'
        )
      ),

      h('section.container.mx-auto.my-16.text-center.px-4',
        h('h2.text-3xl.md:text-4xl.font-semibold',
          'Next Virtual Bitcoin Halving'
        ),
        h('p#halving-info.text-lg.text-gray-400.mt-4.max-w-3xl.mx-auto',
          h('sl-spinner')
        )
      ),
    ),

    // [수정] 기존 footer를 'Resources' 섹션으로 변경 (div -> section)
    h('section.container.mx-auto.my-16.px-4.border-t.border-gray-800.pt-10',
      h('h4.text-2xl.font-semibold.mb-5', 'Resources'),
      h('ul.space-y-3.text-base',
        h('li',
          h('strong.font-semibold.text-gray-300', 'Contract Address: '),
          h('a.text-blue-400.hover:text-blue-500.break-all',
            { href: 'https://etherscan.io/token/0x84e7AE4897B3847B67f212Aff78BFbC5f700aa40', target: '_blank' },
            '0x84e7AE4897B3847B67f212Aff78BFbC5f700aa40'
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