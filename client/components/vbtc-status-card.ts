import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('vbtc-status-card')
export class VbtcStatusCard extends LitElement {
  @property() message: string = 'Current status will be displayed here.';

  static styles = css`
    .card {
      background-color: #1f2937; /* bg-gray-800 */
      padding: 1.5rem;           /* p-6 */
      border-radius: 0.375rem;   /* rounded */
      box-shadow: 0 1px 2px rgba(0,0,0,0.1); /* shadow-md */
      color: #9ca3af;            /* text-gray-400 */
      margin: 16px;
    }
    .title {
      color: white;
      font-size: 1.5rem;
      font-weight: 600;
      margin-top: 0;
      margin-bottom: 1rem;
    }
    p {
      margin-bottom: 0;
    }
  `;

  render() {
    return html`
      <div class="card">
        <h2 class="title">Status</h2>
        <p>${this.message}</p>
      </div>
    `;
  }
}

export function setStatusMessage(message: string) {
  const statusEl = document.querySelector('vbtc-status-card');
  if (statusEl instanceof VbtcStatusCard) {
    statusEl.message = message;
  } else {
    console.warn(
      'vbtc-status-card element not found on the page. Cannot set status message.'
    );
  }
}
