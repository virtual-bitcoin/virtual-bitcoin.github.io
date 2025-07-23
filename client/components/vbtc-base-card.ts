import { LitElement, html, css } from 'lit';

export abstract class VbtcBaseCard extends LitElement {
  static properties = {
    value: { type: String },
    loading: { type: Boolean },
  };

  value = '';
  loading = true;

  #label = '';

  static styles = css`
    .card {
      background-color: #111827;
      padding: 1rem;
      border-radius: 0.375rem;
      text-align: center;
    }
    .label {
      font-size: 0.875rem;
      color: #9ca3af;
      margin: 0;
    }
    .value {
      font-size: 1.5rem;
      font-weight: bold;
      color: #e5e7eb;
      margin: 0;
    }
  `;

  constructor(label: string) {
    super();
    this.#label = label;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.fetchData();
  }

  async fetchData(): Promise<void> {
    this.loading = true;
    try {
      const data = await this.fetchValueFromContract();
      this.value = data;
    } catch (e) {
      this.value = 'Error';
    } finally {
      this.loading = false;
    }
  }

  abstract fetchValueFromContract(): Promise<string>;

  render() {
    return html`
      <div class="card">
        <p class="label">${this.#label}</p>
        <p class="value">
          ${this.loading
        ? html`<sl-spinner></sl-spinner>`
        : this.value}
        </p>
      </div>
    `;
  }
}
