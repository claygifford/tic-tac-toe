import {
  O,
  X,
  Player1,
  Player2,
  Hide,
  Player1Wins,
  Tie,
  Player2Wins,
} from "./symbols.js";

export class Game {
  squares = {
    "00": "",
    "01": "",
    "02": "",
    "10": "",
    "11": "",
    "12": "",
    "20": "",
    "21": "",
    "22": "",
  };

  turn = Player1;
  result;
  takeTurn(key, e) {
    if (this.squares[key]) return;
    if (this.turn == Player1) {
      if (e) e.target.setAttribute("space", O);
      this.squares[key] = O;
    } else {
      if (e) e.target.setAttribute("space", X);
      this.squares[key] = X;
    }

    this.checkGameState();
    this.setTurn(this.turn == Player1 ? Player2 : Player1);
  }

  checkGameState() {
    var rows = ["0", "1", "2"];
    for (var i = 0; i < rows.length; i++) {
      var val = rows[i];
      if (
        this.squares[val + "0"] &&
        this.squares[val + "0"] === this.squares[val + "1"] &&
        this.squares[val + "0"] === this.squares[val + "2"]
      ) {
        this.setWinner(this.squares[val + "0"]);
        return;
      } else if (
        this.squares["0" + val] &&
        this.squares["0" + val] === this.squares["1" + val] &&
        this.squares["0" + val] === this.squares["2" + val]
      ) {
        this.setWinner(this.squares["0" + val]);
        return;
      }
    }

    if (
      this.squares["00"] &&
      this.squares["00"] === this.squares["11"] &&
      this.squares["00"] === this.squares["22"]
    ) {
      this.setWinner(this.squares["00"]);
      return;
    } else if (
      this.squares["02"] &&
      this.squares["02"] === this.squares["11"] &&
      this.squares["02"] === this.squares["20"]
    ) {
      this.setWinner(this.squares["02"]);
      return;
    }

    if (Object.values(this.squares).every((i) => i)) {
      this.setWinner(Tie);
    }
  }

  setWinner(value) {
    const statusScreen = document.querySelector("status-screen");
    if (value === O) {
      if (statusScreen) statusScreen.setAttribute("state", Player1Wins);
      this.result = Player1Wins;
    } else if (value === X) {
      if (statusScreen) statusScreen.setAttribute("state", Player2Wins);
      this.result = Player2Wins;
    } else {
      if (statusScreen) statusScreen.setAttribute("state", Tie);
      this.result = Tie;
    }
  }

  setTurn(turn) {
    this.turn = turn;
    const actionBar = document.querySelector("action-bar");
    if (actionBar) actionBar.setAttribute("turn", this.turn);
  }

  startGame() {
    this.turn = Player1;
    const statusScreen = document.querySelector("status-screen");
    statusScreen.setAttribute("state", Hide);

    for (const val of document.querySelectorAll("square-slot")) {
      val.setAttribute("space", "");
    }

    for (const key of Object.keys(this.squares)) {
      this.squares[key] = "";
    }
    this.result = "";
    this.setTurn(Player1);
  }
}
