import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { getAllPizzas } from '../vbtc/vbtc';

import { getAccount } from '@wagmi/core';
import './vbtc-pizza-item';
import { wagmiConfig } from './wallet';

type Pizza = {
  id: number;
  owner: string;
  power: bigint;
  subsidy: bigint;
};

@customElement('vbtc-all-pizzas-list')
export class VbtcAllPizzasList extends LitElement {
  @state() pizzas: Pizza[] = [];
  @state() loading = false;

  static styles = css`
    .card {
      background-color: #1f2937;
      padding: 1.5rem;
      border-radius: 0.375rem;
      box-shadow: 0 1px 2px rgba(0,0,0,0.1);
      color: white;
      margin: 16px;
    }

    h2 {
      font-size: 1.5rem;
      margin-top: 0;
      margin-bottom: 1rem;
    }

    .pizza-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-top: 1rem;
    }

    p {
      color: #9ca3af;
    }
  `;

  connectedCallback(): void {
    super.connectedCallback();
    this.fetchPizzas();
  }

  async fetchPizzas() {
    this.loading = true;
    this.pizzas = [];
    try {
      const pizzas = await getAllPizzas();
      this.pizzas = pizzas;
    } catch (e) {
      console.error(e);
    } finally {
      this.loading = false;
    }
  }

  render() {
    const currentAccount = getAccount(wagmiConfig).address;
    return html`
      <div class="card">
        <h2>All Pizzas</h2>

        ${this.loading
        ? html`<div><sl-spinner style="font-size: 2rem;"></sl-spinner></div>`
        : this.pizzas.length === 0
          ? html`<p>No pizzas have been created yet.</p>`
          : html`
                <div class="pizza-list">
                  ${this.pizzas.map(
            (pizza) => html`<vbtc-pizza-item .pizza=${pizza} .currentUser=${currentAccount}></vbtc-pizza-item>`
          )}
                </div>
              `
      }

        <sl-button @click=${this.fetchPizzas} ?disabled=${this.loading} style="margin-top: 1rem;">
          <sl-icon name="arrow-clockwise" slot="prefix"></sl-icon>
          Refresh
        </sl-button>
      </div>
    `;
  }
}
