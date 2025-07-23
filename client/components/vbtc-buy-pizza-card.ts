import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('vbtc-buy-pizza-card')
export class VbtcBuyPizzaCard extends LitElement {
  @state() power = 1;

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
    }
    input {
      background: #111827;
      color: white;
      padding: 0.25rem;
      border-radius: 0.25rem;
      border: 1px solid #374151;
      width: 4rem;
      text-align: right;
    }
    span {
      color: #9ca3af;
    }

    @media (max-width: 640px) {
      .controls {
        flex-direction: column;
        align-items: stretch;
      }
      .controls input {
        width: 100%;
      }
      sl-button {
        width: 100%;
      }
    }
  `;

  render() {
    return html`
      <div class="card">
        <h2>Buy New Pizza</h2>
        <div class="controls">
          <label>Power:</label>
          <input
            type="number"
            .value=${this.power}
            @input=${(e: any) => this.power = parseInt(e.target.value) || 1}
          />
          <span>Price: 10,000 VBTC</span>
          <sl-button variant="primary">
            <sl-icon name="cart" slot="prefix"></sl-icon>
            Buy Pizza
          </sl-button>
        </div>
      </div>
    `;
  }
}
