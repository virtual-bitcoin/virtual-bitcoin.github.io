import { getAccount, watchAccount, } from '@wagmi/core';
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

  connectedCallback(): void {
    super.connectedCallback();

    // 초기 상태 설정
    const account = getAccount(wagmiConfig).address;
    if (account) {
      this.fetchData();
    } else {
      this.value = 'Not Connected';
    }

    // 지갑 연결 상태 변경 감지
    watchAccount(wagmiConfig, {
      onChange: (account) => {
        if (account?.address) {
          this.fetchData();
        } else {
          this.value = 'Not Connected';
        }
      }
    });
  }

  async fetchValueFromContract(): Promise<string> {
    const account = getAccount(wagmiConfig).address;
    if (!account) return 'Not Connected';

    const balance = await getVBTCBalance(account);
    const formatted = Number(formatUnits(balance, 8));
    return formatted.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }
}
