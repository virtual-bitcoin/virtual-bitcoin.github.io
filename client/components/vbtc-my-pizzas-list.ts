import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('vbtc-my-pizzas-list')
export class VbtcMyPizzasList extends LitElement {
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
    p {
      color: #9ca3af;
    }
  `;

  render() {
    return html`
      <div class="card">
        <h2>My Pizzas</h2>
        <p>You have no pizzas yet. Buy your first pizza!</p>
        <sl-button>
          <sl-icon name="arrow-clockwise" slot="prefix"></sl-icon>
          Refresh
        </sl-button>
      </div>
    `;
  }
}
