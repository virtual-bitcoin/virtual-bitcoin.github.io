import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { buyPizza } from '../vbtc/vbtc';

@customElement('vbtc-buy-pizza-card')
export class VbtcBuyPizzaCard extends LitElement {
  @state() power = 1;
  @state() buying = false;

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
    label {
      color: #9ca3af;
    }
    .controls {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      flex-wrap: wrap;
    }
    .power-control {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }
    sl-input {
      width: 4rem;
    }
    span {
      color: #9ca3af;
    }

    @media (max-width: 640px) {
      .controls {
        flex-direction: column;
        align-items: stretch;
      }
      .controls .power-control {
        flex-direction: row;

        sl-button {
          width: 40px;
        }
      }
      .controls sl-input {
        flex-grow: 1;
      }
      sl-button {
        width: 100%;
      }
    }
  `;

  get price() {
    return this.power * 10_000;
  }

  increase() {
    this.power++;
  }

  decrease() {
    if (this.power > 1) this.power--;
  }

  onInput(e: Event) {
    const val = parseInt((e.target as HTMLInputElement).value) || 1;
    this.power = Math.max(val, 1);
  }

  async handleBuy() {
    this.buying = true;
    try {
      await buyPizza(BigInt(this.power));
      this.dispatchEvent(new CustomEvent('bought', {
        bubbles: true,
        composed: true,
        detail: { power: this.power }
      }));
    } catch (e) {
      console.error(e);
      alert(`Failed to buy pizza`);
    } finally {
      this.buying = false;
    }
  }

  render() {
    return html`
      <div class="card">
        <h2>Buy New Pizza</h2>
        <div class="controls">
          <label>Power:</label>
          <div class="power-control">
            <sl-button @click=${this.decrease} circle>
              <sl-icon name="dash"></sl-icon>
            </sl-button>

            <sl-input
              type="number"
              .value=${this.power}
              @input=${this.onInput}
              min="1"
            ></sl-input>

            <sl-button @click=${this.increase} circle>
              <sl-icon name="plus"></sl-icon>
            </sl-button>
          </div>

          <span>Price: ${this.price.toLocaleString()} VBTC</span>

          <sl-button
            variant="primary"
            ?disabled=${this.buying}
            @click=${this.handleBuy}
          >
            <sl-icon name="cart" slot="prefix"></sl-icon>
            ${this.buying
              ? html`<sl-spinner style="--indicator-size: 1em"></sl-spinner>`
              : 'Buy Pizza'}
          </sl-button>
        </div>
      </div>
    `;
  }
}
