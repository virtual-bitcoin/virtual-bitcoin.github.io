import { getAccount } from '@wagmi/core';
import { customElement } from 'lit/decorators.js';
import { VbtcBaseCard } from './vbtc-base-card';
import { getMyPizzas } from '../vbtc/vbtc';
import { wagmiConfig } from './wallet';
import { zeroAddress } from 'viem';

@customElement('vbtc-my-pizzas-card')
class VbtcMyPizzasCard extends VbtcBaseCard {
  constructor() {
    super('My Pizzas');
  }

  async fetchValueFromContract(): Promise<string> {
    const address = getAccount(wagmiConfig).address;
    const myPizzas = await getMyPizzas(address);
    return myPizzas.toString();
  }
}
