import { Game } from "./game.js";

class Board extends HTMLElement {
  constructor() {
    super();
    this.game = new Game();
    window.addEventListener("resize", this.resize);
  }
  game;

  connectedCallback() {
    this.render();
  }

  createSquares() {
    const nodes = [];
    const keys = Object.keys(this.game.squares).sort();
    for (const key of keys) {
      const slot = document.createElement("square-slot");
      slot.id = `${key}`;
      slot.className =
        nodes.length % 2 == 0 ? "square-slot-even" : "square-slot-odd";
      slot.onclick = this.game.takeTurn.bind(this.game, key);
      slot.onmouseenter = (e) => {
        e.target.classList.add("square-slot-hover");
      };
      slot.onmouseleave = (e) => {
        e.target.classList.remove("square-slot-hover");
      };
      nodes.push(slot);
    }
    return nodes;
  }

  render() {
    const action = document.createElement("action-bar");
    action.restartClick = () => {
      this.game.startGame();
    };
    this.append(action);

    const board = document.createElement("div");
    board.className = "board";
    board.id = "board";
    board.append(...this.createSquares());
    this.append(board);

    const statusScreen = document.createElement("status-screen");
    statusScreen.setAttribute("state", "start");
    statusScreen.startClick = () => {
      this.game.startGame();
    };
    document.body.append(statusScreen);

    this.resize();
  }

  resize() {
    const height = window.innerHeight;
    const width = window.innerWidth;
    let val = Math.min(height, width) - 100;
    val = Math.max(val, 300);

    const board = document.getElementById("board");
    board.style.height = `${val}px`;
    board.style.width = `${val}px`;
  }
}

window.customElements.define("tic-tac-toe", Board);
