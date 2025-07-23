import { getAccount, watchAccount } from '@wagmi/core';
import { customElement } from 'lit/decorators.js';
import { getMyPizzas } from '../vbtc/vbtc';
import { VbtcBaseCard } from './vbtc-base-card';
import { wagmiConfig } from './wallet';

@customElement('vbtc-my-pizzas-card')
class VbtcMyPizzasCard extends VbtcBaseCard {
  constructor() {
    super('My Pizzas');
  }

  connectedCallback(): void {
    super.connectedCallback();

    const account = getAccount(wagmiConfig).address;
    if (account) {
      this.fetchData();
    } else {
      this.value = 'Not Connected';
    }

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

    const myPizzas = await getMyPizzas(account);
    return myPizzas.toString();
  }
}
