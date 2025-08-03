import '@shoelace-style/shoelace';
import { el } from '@webtaku/el';
import './components/vbtc-all-pizzas-list';
import './components/vbtc-balance-card';
import './components/vbtc-buy-pizza-card';
import './components/vbtc-mining-actions';
import './components/vbtc-my-pizzas-card';
import './components/vbtc-my-pizzas-list';
import './components/vbtc-status-card';
import './components/vbtc-total-pizzas-card';
import './components/vbtc-total-supply-card';
import { createConnectButton } from './components/wallet';
import './main.css';
import { getBlocksUntilNextHalving } from './vbtc/vbtc';

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
    el('vbtc-buy-pizza-card'),
    el('vbtc-my-pizzas-list'),
    //el('vbtc-mining-actions'),
    //el('vbtc-status-card'),
    el('vbtc-all-pizzas-list')
  );
}
