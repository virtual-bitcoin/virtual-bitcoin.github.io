import { el } from '@webtaku/el';
import './components/vbtc-balance-card';
import './components/vbtc-my-pizzas-card';
import './components/vbtc-status-card';
import './components/vbtc-total-pizzas-card';
import './components/vbtc-total-supply-card';
import { createConnectButton } from './components/wallet';
import './main.less';
import { getBlocksUntilNextHalving } from './vbtc/vbtc';
import { setStatusMessage } from './components/vbtc-status-card';

const halvingInfoContainer = document.getElementById('halving-info');
if (halvingInfoContainer) {
  const {
    nextHalvingBlock,
    blocksRemaining,
    daysRemaining
  } = await getBlocksUntilNextHalving();

  const formattedNextBlock = Number(nextHalvingBlock).toLocaleString();
  const formattedRemaining = Number(blocksRemaining).toLocaleString();
  const formattedDays = Number(daysRemaining).toLocaleString();

  halvingInfoContainer.textContent =
    `Block #${formattedNextBlock} — ~${formattedRemaining} blocks remaining (~${formattedDays} days)`;
}

const miningInterfaceContainer = document.getElementById('mining-interface');
if (miningInterfaceContainer) {
  miningInterfaceContainer.innerHTML = '';
  miningInterfaceContainer.append(
    el(
      'section.container.mx-auto.my-8.px-4.text-center',
      el(
        'div.mt-8.flex.justify-center.items-center',
        createConnectButton()
      ),
      el(
        'div.grid.gap-4.mt-8.grid-cols-1.sm:grid-cols-2.lg:grid-cols-4',
        el('vbtc-balance-card'),
        el('vbtc-total-supply-card'),
        el('vbtc-total-pizzas-card'),
        el('vbtc-my-pizzas-card')
      )
    ),

    // Buy Pizza
    el('section.container.mx-auto.my-8.px-4',
      el('div.bg-gray-800.shadow-md.rounded.p-6',
        el('h2.text-2xl.font-semibold.mb-4.text-white', 'Buy New Pizza'),
        el('div.flex.items-center.space-x-4',
          el('label.text-gray-300', 'Power:'),
          el('input.border.p-2.rounded.w-20.bg-gray-900.text-white', { type: 'number', value: '1' }),
          el('span.text-gray-300', 'Price: 10,000 VBTC'),
          el('button.bg-orange-500.hover:bg-orange-600.text-white.py-2.px-4.rounded', 'Buy Pizza')
        )
      )
    ),

    // My Pizzas
    el('section.container.mx-auto.my-8.px-4',
      el('div.bg-gray-800.shadow-md.rounded.p-6',
        el('h2.text-2xl.font-semibold.mb-4.text-white', 'My Pizzas'),
        el('p.text-gray-400', 'You have no pizzas yet. Buy your first pizza!'),
        el('button.bg-gray-600.text-white.py-1.px-3.rounded.mt-4', 'Refresh')
      )
    ),

    // Mining Actions
    el('section.container.mx-auto.my-8.px-4',
      el('div.bg-gray-800.shadow-md.rounded.p-6',
        el('h2.text-2xl.font-semibold.mb-4.text-white', 'Mining Actions'),
        el('div.space-x-4',
          el('button.bg-purple-600.text-white.py-2.px-4.rounded', 'Mine All Pizzas'),
          el('button.bg-blue-600.text-white.py-2.px-4.rounded', 'Reload Data')
        )
      )
    ),

    // Status
    el('vbtc-status-card')
  );
}
