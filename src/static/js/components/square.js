import { X, O, Player1, Player2 } from "./symbols.js";

class Square extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    this.render();
  }

  render() {
    const space = this.getAttribute("space");
    if (space === O) {
      this.innerHTML = `
            <svg width="100%" height="100%" viewBox="0 0 50 50">
                <circle cy="25" cx="25" r="20" class="great-circle" stroke="#464646" fill="#f8f8f8" stroke-width="3">
                </circle>
            </svg>
        `;
    } else if (space === X) {
      this.innerHTML = `
            <svg width="100%" height="100%" viewBox="0 0 50 50">
                <line x1="4" y1="4" x2="46" y2="46" stroke="#474846" stroke-width="5" stroke-linecap="round" />
                <line x1="4" y1="46" x2="46" y2="4" stroke="#474846" stroke-width="5" stroke-linecap="round" />
                <line x1="4" y1="4" x2="46" y2="46" stroke="#565352" stroke-width="2" stroke-linecap="round" />
                <line x1="4" y1="46" x2="46" y2="4" stroke="#565352" stroke-width="2" stroke-linecap="round" />
            </svg>
        `;
    } else {
      this.innerHTML = "";
    }
  }
  static get observedAttributes() {
    return ["space"];
  }
}

window.customElements.define("square-slot", Square);
