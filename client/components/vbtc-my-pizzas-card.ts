import { getAccount, watchAccount, WatchAccountReturnType } from '@wagmi/core';
import { customElement } from 'lit/decorators.js';
import { getMyPizzaCount } from '../vbtc/vbtc';
import { VbtcBaseCard } from './vbtc-base-card';
import { wagmiConfig } from './wallet';

@customElement('vbtc-my-pizzas-card')
class VbtcMyPizzasCard extends VbtcBaseCard {
  constructor() {
    super('My Pizzas');
  }

  #unwatch: WatchAccountReturnType | null = null;

  connectedCallback(): void {
    super.connectedCallback();

    const account = getAccount(wagmiConfig).address;
    if (account) {
      this.fetchData();
    } else {
      this.value = 'Not Connected';
    }

    this.#unwatch = watchAccount(wagmiConfig, {
      onChange: (account) => {
        if (account?.address) {
          this.fetchData();
        } else {
          this.value = 'Not Connected';
        }
      }
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#unwatch?.();
  }

  async fetchValueFromContract(): Promise<string> {
    const account = getAccount(wagmiConfig).address;
    if (!account) return 'Not Connected';

    const myPizzas = await getMyPizzaCount(account);
    return myPizzas.toString();
  }
}
