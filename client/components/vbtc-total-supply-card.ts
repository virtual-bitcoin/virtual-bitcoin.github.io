import { customElement } from 'lit/decorators.js';
import { formatUnits } from 'viem';
import { getVBTCTotalSupply } from '../vbtc/vbtc';
import { VbtcBaseCard } from './vbtc-base-card';

@customElement('vbtc-total-supply-card')
class VbtcTotalSupplyCard extends VbtcBaseCard {
  constructor() {
    super('Total Supply');
  }

  async fetchValueFromContract(): Promise<string> {
    const totalSupply = await getVBTCTotalSupply();

    const formatted = Number(formatUnits(totalSupply, 8));

    // 소수점 2자리, 천단위 콤마
    return formatted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
}
