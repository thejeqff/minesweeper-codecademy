// To play Minesweeper, we will create instances of MineSweeperGame in command line.
// For example:
// In the command line, navigate to the lib directory and run `node`
// Run `.load game.js` to load the contents of this file.
// Then create a Game instance and run commands like so:
// let game = new Game(3, 3, 3);
// game.playMove(0, 1);
// game.playMove(1, 2);
// When done run `.exit`

// import the board class
import { Board } from './board';

// Create Game class
class Game {
  // Constructor: creates a board based on passed in parameters
  // number of rows, number of columns, and number of bombs
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }

  // Method that plays a move on the board
  playMove(rowIndex, columnIndex) {
    // flips a tile on the board
    this._board.flipTile(rowIndex, columnIndex);
     // If the tile flips over a bomb, end the game
    if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
      console.log('Sorry, you hit a bomb. Game over!');
      this._board.print();
      // Else if the last safe tile has been flipped, wint he game
    } else if (!this._board.hasSafeTiles()) {
      console.log('Congratulations, you won!');
      this._board.print();
      // Otherwise print the current board to the console
    } else {
      console.log('Current board:');
      this._board.print();
    }
  }
}
