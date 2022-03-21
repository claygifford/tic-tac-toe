import { Start, Player1Wins, Tie, Player2Wins } from "./symbols.js";

class Status extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    this.render();
  }

  createDialog(header, button, message, statusClass) {
    const dialog = document.createElement("div");
    dialog.className = "status-dialog";

    const container = document.createElement("div");
    container.className = "status-container";
    dialog.append(container);

    const section = document.createElement("div");
    section.className = "status-section";
    container.append(section);

    const innerSection = document.createElement("div");
    innerSection.className = "status-inner-section";
    innerSection.innerHTML = header;
    section.append(innerSection);

    const innerMessage = document.createElement("div");
    innerMessage.className = statusClass;
    section.append(innerMessage);

    const statusMessage = document.createElement("div");
    statusMessage.className = "status-icon";
    statusMessage.innerHTML = "&#xe338;";
    innerMessage.append(statusMessage);

    const messageInfo = document.createElement("div");
    messageInfo.className = "status-nessage-info";
    messageInfo.innerHTML = message;
    innerMessage.append(messageInfo);

    const actionButton = document.createElement("button");
    actionButton.className = "button-30";
    actionButton.innerHTML = button;
    actionButton.onclick = this.startClick.bind(this);
    innerMessage.append(actionButton);

    this.append(dialog);
  }

  render() {
    let newState = this.getAttribute("state");
    if (newState === this.state) return;
    this.state = newState;
    if (this.state === Start) {
      this.createDialog(
        "Play tic tac toe",
        "Start",
        "Welcome to Clay Gifford's<br />33Across Coding Challenge<br />To begin press Start",
        "status-message"
      );
    } else if (this.state === Player1Wins) {
      this.createDialog(
        "Player 1 Wins",
        "Play Again",
        "Congrats Player 1",
        "status-message-player1"
      );
    } else if (this.state === Player2Wins) {
      this.createDialog(
        "Player 2 Wins",
        "Play Again",
        "Congrats Player 2",
        "status-message-player2"
      );
    } else if (this.state === Tie) {
      this.createDialog("Tie", "Play Again", "Tie", "status-message");
    } else {
      this.innerHTML = "";
    }
  }
  static get observedAttributes() {
    return ["state"];
  }
}

window.customElements.define("status-screen", Status);
