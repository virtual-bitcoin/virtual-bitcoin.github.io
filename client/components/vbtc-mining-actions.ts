import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('vbtc-mining-actions')
export class VbtcMiningActions extends LitElement {
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
    .actions {
      display: flex;
      gap: 0.5rem;
    }
  `;

  render() {
    return html`
      <div class="card">
        <h2>Mining Actions</h2>
        <div class="actions">
          <sl-button variant="success">
            <sl-icon name="hammer" slot="prefix"></sl-icon>
            Mine All Pizzas
          </sl-button>
          <sl-button>
            <sl-icon name="arrow-clockwise" slot="prefix"></sl-icon>
            Reload Data
          </sl-button>
        </div>
      </div>
    `;
  }
}
