import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { getAccount, watchAccount, WatchAccountReturnType } from '@wagmi/core';
import { getMyPizzas } from '../vbtc/vbtc';
import { wagmiConfig } from './wallet';

import './vbtc-pizza-item';

type Pizza = {
  id: number;
  power: bigint;
  subsidy: bigint;
};

@customElement('vbtc-my-pizzas-list')
export class VbtcMyPizzasList extends LitElement {
  @state() pizzas: Pizza[] = [];
  @state() loading = false;

  #unwatch: WatchAccountReturnType | null = null;

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
  `;

  connectedCallback(): void {
    super.connectedCallback();
    this.fetchPizzas();

    this.#unwatch = watchAccount(wagmiConfig, {
      onChange: () => this.fetchPizzas()
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#unwatch?.();
  }

  async fetchPizzas() {
    this.loading = true;
    this.pizzas = [];

    const account = getAccount(wagmiConfig).address;
    if (!account) {
      this.loading = false;
      return;
    }

    try {
      this.pizzas = await getMyPizzas(account);
    } catch (e) {
      console.error(e);
    } finally {
      this.loading = false;
    }
  }

  handleSold(e: CustomEvent) {
    const soldId = e.detail;
    this.pizzas = this.pizzas.filter(p => p.id !== soldId);
  }

  render() {
    const currentAccount = getAccount(wagmiConfig).address;
    return html`
      <div class="card">
        <h2>My Pizzas</h2>

        ${this.loading
        ? html`<div><sl-spinner style="font-size: 2rem;margin-bottom: 1rem;"></sl-spinner></div>`
        : this.pizzas.length === 0
          ? html`<p>You have no pizzas yet. Buy your first pizza!</p>`
          : html`
                <div class="pizza-list" @sold=${this.handleSold}>
                  ${this.pizzas.map(
            pizza => html`<vbtc-pizza-item .pizza=${pizza} .currentUser=${currentAccount}></vbtc-pizza-item>`
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
