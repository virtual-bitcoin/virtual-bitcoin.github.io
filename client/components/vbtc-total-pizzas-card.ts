import { customElement } from 'lit/decorators.js';
import { VbtcBaseCard } from './vbtc-base-card';
import { getTotalPizzas } from '../vbtc/vbtc';

@customElement('vbtc-total-pizzas-card')
class VbtcTotalPizzasCard extends VbtcBaseCard {
  constructor() {
    super('Total Pizzas');
  }

  async fetchValueFromContract(): Promise<string> {
    const totalPizzas = await getTotalPizzas();
    return totalPizzas.toString();
  }
}
