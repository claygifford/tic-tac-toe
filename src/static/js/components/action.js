import { X, O, Player1, Player2 } from "./symbols.js";

class Action extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    this.render();
  }

  createActionBar(player, slot) {
    this.innerHTML = '';
    const actionButton = document.createElement("button");
    actionButton.className = "button-30";
    actionButton.innerHTML = 'Restart';
    actionButton.onclick = this.restartClick.bind(this);
    this.append(actionButton);

    const squareSlot = document.createElement("square-slot");
    squareSlot.style.cssText = 'max-height: 72px; padding: 0px 4px;';
    squareSlot.setAttribute('space', slot);
    this.append(squareSlot);

    const messageInfo = document.createElement("div");
    messageInfo.innerHTML = `TURN: ${player}`;    
    messageInfo.style.cssText = 'padding: 6px 0px 0px 0px';
    this.append(messageInfo);
  }

  render() {
    const turn = this.getAttribute("turn");
    if (turn === Player1) {
      this.createActionBar(Player1, O);
    }     
    else if (turn === Player2)
    this.createActionBar(Player2, X);
    else
      this.innerHTML = `<div style="padding: 6px 0px 0px 0px">Press Start</div>`;
  }
  static get observedAttributes() {
    return ["turn"];
  }
}

window.customElements.define("action-bar", Action);
