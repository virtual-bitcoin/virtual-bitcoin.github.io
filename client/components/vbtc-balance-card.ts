import { getAccount } from '@wagmi/core';
import { customElement } from 'lit/decorators.js';
import { formatUnits } from 'viem';
import { getVBTCBalance } from '../vbtc/vbtc';
import { VbtcBaseCard } from './vbtc-base-card';
import { wagmiConfig } from './wallet';

@customElement('vbtc-balance-card')
class VbtcBalanceCard extends VbtcBaseCard {
  constructor() {
    super('VBTC Balance');
  }

  async fetchValueFromContract(): Promise<string> {
    const balance = await getVBTCBalance(getAccount(wagmiConfig).address);

    const formatted = Number(formatUnits(balance, 8));

    // 소수점 2자리, 천단위 콤마
    return formatted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
}
