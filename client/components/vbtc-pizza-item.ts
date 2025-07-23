import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { formatUnits } from 'viem';
import { changePizza, minePizza, sellPizza } from '../vbtc/vbtc';

type Pizza = {
  id: number;
  power: bigint;
  subsidy: bigint;
  owner: string;
};

@customElement('vbtc-pizza-item')
export class VbtcPizzaItem extends LitElement {
  @property({ type: Object }) pizza!: Pizza;
  @property({ type: String }) currentUser!: string;

  @state() mining = false;
  @state() changing = false;
  @state() selling = false;

  static styles = css`
    .pizza-item {
      background: #111827;
      padding: 0.75rem;
      border-radius: 0.25rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .info {
      flex: 1 1 auto;
      font-size: 0.875rem;
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.25rem;
    }

    .owner {
      color: #9ca3af;
      font-size: 0.75rem;
    }

    @media (max-width: 640px) {
      .pizza-item {
        flex-direction: column;
        align-items: flex-start;
      }

      .actions {
        width: 100%;
        justify-content: flex-end;
      }
    }
  `;

  get isMine() {
    return this.pizza.owner?.toLowerCase() === this.currentUser?.toLowerCase();
  }

  async handleMine() {
    this.mining = true;
    try {
      await minePizza(BigInt(this.pizza.id));
      this.dispatchEvent(new CustomEvent('mined', { bubbles: true, composed: true, detail: this.pizza.id }));
    } catch (e) {
      console.error(e);
      alert(`Failed to mine pizza #${this.pizza.id}`);
    } finally {
      this.mining = false;
    }
  }

  async handleChange() {
    const newPower = prompt("Enter new power:", this.pizza.power.toString());
    if (!newPower) return;
    this.changing = true;
    try {
      await changePizza(BigInt(this.pizza.id), BigInt(newPower));
      this.dispatchEvent(new CustomEvent('changed', { bubbles: true, composed: true, detail: this.pizza.id }));
    } catch (e) {
      console.error(e);
      alert(`Failed to change pizza #${this.pizza.id}`);
    } finally {
      this.changing = false;
    }
  }

  async handleSell() {
    this.selling = true;
    try {
      await sellPizza(BigInt(this.pizza.id));
      this.dispatchEvent(new CustomEvent('sold', { bubbles: true, composed: true, detail: this.pizza.id }));
    } catch (e) {
      console.error(e);
      alert(`Failed to sell pizza #${this.pizza.id}`);
    } finally {
      this.selling = false;
    }
  }

  render() {
    return html`
      <div class="pizza-item">
        <div class="info">
          🍕 #${this.pizza.id} —
          Power: ${this.pizza.power.toString()} —
          Subsidy: ${Number(formatUnits(this.pizza.subsidy, 8)).toLocaleString(undefined, {
            maximumFractionDigits: 8
          })}
          <div class="owner">${this.pizza.owner}${this.isMine ? ' (You)' : ''}</div>
        </div>

        ${this.isMine
          ? html`
              <div class="actions">
                <sl-button
                  size="small"
                  variant="success"
                  ?disabled=${this.mining}
                  @click=${this.handleMine}
                >
                  <sl-icon name="hammer" slot="prefix"></sl-icon>
                  ${this.mining
                    ? html`<sl-spinner style="--indicator-size: 1em"></sl-spinner>`
                    : 'Mine'}
                </sl-button>

                <sl-button
                  size="small"
                  variant="warning"
                  ?disabled=${this.changing}
                  @click=${this.handleChange}
                >
                  <sl-icon name="pencil" slot="prefix"></sl-icon>
                  ${this.changing
                    ? html`<sl-spinner style="--indicator-size: 1em"></sl-spinner>`
                    : 'Change'}
                </sl-button>

                <sl-button
                  size="small"
                  variant="danger"
                  ?disabled=${this.selling}
                  @click=${this.handleSell}
                >
                  <sl-icon name="trash" slot="prefix"></sl-icon>
                  ${this.selling
                    ? html`<sl-spinner style="--indicator-size: 1em"></sl-spinner>`
                    : 'Sell'}
                </sl-button>
              </div>
            `
          : null
        }
      </div>
    `;
  }
}
