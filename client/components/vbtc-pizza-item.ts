import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { formatUnits } from 'viem';
import { changePizza, minePizza, sellPizza } from '../vbtc/vbtc';
import { showErrorAlert } from './alert';
import pizzaIcon from './mining-pizza.png';

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

  /* ----------  STYLE  ---------- */
  static styles = css`
    :host {
      display: block;
    }

    .pizza-item {
      background: #111827;
      border-radius: 0.375rem;
      padding: 1rem;
      display: grid;
      grid-template-columns: auto 1fr auto;   /* icon | info | actions */
      gap: 1rem;
      align-items: center;
    }

    /* --- ICON --- */
    .icon {
      width: 64px;
      height: 64px;
      object-fit: contain;
      flex-shrink: 0;
    }

    /* --- INFO BLOCK --- */
    .info {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      overflow-wrap: anywhere;
    }

    .stats {
      font-size: 0.875rem;
      color: #f3f4f6;
    }

    .subsidy {
      font-size: 1rem;
      font-weight: 600;
      color: #facc15;         /* amber-400 */
    }

    .owner {
      font-size: 0.75rem;
      color: #9ca3af;
    }

    /* --- ACTION BUTTONS --- */
    .actions {
      display: flex;
      gap: 0.375rem;
      flex-wrap: wrap;
    }

    /* ----------  MOBILE  ---------- */
    @media (max-width: 640px) {
      .pizza-item {
        grid-template-columns: auto 1fr;
        grid-template-areas:
          "icon info"
          "actions actions";
      }
      .actions {
        grid-area: actions;
        margin-top: 0.75rem;
        width: 100%;
        justify-content: flex-end;
      }
    }
  `;

  /* ----------  HELPERS  ---------- */
  get isMine() {
    return (
      this.pizza.owner?.toLowerCase() === this.currentUser?.toLowerCase()
    );
  }

  /* ----------  HANDLERS  ---------- */
  async handleMine() {
    this.mining = true;
    try {
      await minePizza(BigInt(this.pizza.id));
      this.dispatchEvent(
        new CustomEvent('mined', {
          bubbles: true,
          composed: true,
          detail: this.pizza.id,
        }),
      );
    } catch (err) {
      console.error(err);
      showErrorAlert('Failed to mine pizza', err instanceof Error ? err.message : String(err));
    } finally {
      this.mining = false;
    }
  }

  async handleChange() {
    const newPower = prompt(
      'Enter new power:',
      this.pizza.power.toString(),
    );
    if (!newPower) return;
    this.changing = true;
    try {
      await changePizza(BigInt(this.pizza.id), BigInt(newPower));
      this.dispatchEvent(
        new CustomEvent('changed', {
          bubbles: true,
          composed: true,
          detail: this.pizza.id,
        }),
      );
    } catch (err) {
      console.error(err);
      showErrorAlert('Failed to change pizza', err instanceof Error ? err.message : String(err));
    } finally {
      this.changing = false;
    }
  }

  async handleSell() {
    this.selling = true;
    try {
      await sellPizza(BigInt(this.pizza.id));
      this.dispatchEvent(
        new CustomEvent('sold', {
          bubbles: true,
          composed: true,
          detail: this.pizza.id,
        }),
      );
    } catch (err) {
      console.error(err);
      showErrorAlert('Failed to sell pizza', err instanceof Error ? err.message : String(err));
    } finally {
      this.selling = false;
    }
  }

  /* ----------  TEMPLATE  ---------- */
  render() {
    return html`
      <div class="pizza-item">
        <!-- icon -->
        <img src=${pizzaIcon} alt="Pizza" class="icon" />

        <!-- info -->
        <div class="info">
          <div class="subsidy">
            ${Number(formatUnits(this.pizza.subsidy, 8)).toLocaleString(
      undefined,
      { maximumFractionDigits: 8 },
    )}
          </div>
          <div class="stats">
            #${this.pizza.id} — Power&nbsp;${this.pizza.power.toString()}
          </div>
          <div class="owner">
            ${this.pizza.owner}${this.isMine ? ' (You)' : ''}
          </div>
        </div>

        <!-- actions -->
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
        : null}
      </div>
    `;
  }
}
