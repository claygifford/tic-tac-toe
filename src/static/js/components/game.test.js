import {Game} from './game.js';
import {Player1, Player2, Player1Wins, Tie, Player2Wins}  from './symbols.js';

test('Game constructor initialize to Player1', () => {
   let game = new Game();
   expect(game.turn).toEqual(Player1);
});

test('Game take a turn should be Player2', () => {
  let game = new Game();
  game.takeTurn('00');
  expect(game.turn).toEqual(Player2);
});

test('Game take turns Player1 should win', () => {
  let game = new Game();
  game.takeTurn('00');
  game.takeTurn('10');
  game.takeTurn('01');
  game.takeTurn('11');
  game.takeTurn('02');
  expect(game.result).toEqual(Player1Wins);
});

test('Game take turns Player2 should win', () => {
  let game = new Game();
  game.takeTurn('00');
  game.takeTurn('10');
  game.takeTurn('01');
  game.takeTurn('11');
  game.takeTurn('22');
  game.takeTurn('12');
  expect(game.result).toEqual(Player2Wins);
});

test('Game take turns until the game is tied', () => {
  let game = new Game();
  game.takeTurn('00');
  game.takeTurn('01');
  game.takeTurn('02');
  game.takeTurn('11');
  game.takeTurn('10');
  game.takeTurn('12');
  game.takeTurn('21');
  game.takeTurn('20');
  game.takeTurn('22');
  expect(game.result).toEqual(Tie);
});