'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Create Board class
var Board = exports.Board = function () {
  // constructor that assign parameter values for rows, columns, and numberOfBombs
  // and generates the player board and the bomb board
  function Board(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Board);

    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  // Get method for the player board


  _createClass(Board, [{
    key: 'flipTile',


    // Method for flipping over a tile over
    value: function flipTile(rowIndex, columnIndex) {
      // Check to see if this tile has already been flipped
      if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
        console.log('This tile has already been flipped!');
        // If not flipped, check to see if there is a bomb under that tile
      } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
        this._playerBoard[rowIndex][columnIndex] = 'B';
        // If both of those conditions are passed, get the number of neighboring bombs
      } else {
        this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
      }
      // Decrement the number of remaining tiles on the board
      this._numberOfTiles--;
    }

    // Method that checks squares adjacent to a selected tile

  }, {
    key: 'getNumberOfNeighborBombs',
    value: function getNumberOfNeighborBombs(rowIndex, columnIndex) {
      var _this = this;

      // Constant that identifies all possible offset (adjacent) squares
      // to selected square
      var neighborOffsets = [[1, 1], [1, 0], [1, -1], [0, 1], [0, -1], [-1, 1], [-1, 0], [-1, -1]];
      // Constants that get the board dimensions
      var numberOfRows = this._bombBoard.length;
      var numberOfColumns = this._bombBoard[0].length;
      // Variable that determines the number of adjacent bombs
      var numberOfBombs = 0;
      // Check each offset to determine the number of bombs next to it
      neighborOffsets.forEach(function (offset) {
        var neighborRowIndex = rowIndex + offset[0];
        var neighborColumnIndex = columnIndex + offset[1];
        // Check to make sure that the array position is valid
        if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
          // If board position is valid, check for a bomb and increment if found
          if (_this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
            numberOfBombs++;
          }
        }
      });
      // Return the number of bombs next to this node
      return numberOfBombs;
    }

    // method that calculates how many "safe tiles" remain on the Board
    // to determine if the board has been won yet

  }, {
    key: 'hasSafeTiles',
    value: function hasSafeTiles() {
      return this._numberOfTiles !== this._numberOfBombs;
    }

    // Method to print the player board

  }, {
    key: 'print',
    value: function print() {
      // Join the columns together using pipes, then join the rows on different lines
      // and log the board to the console
      console.log(this._playerBoard.map(function (row) {
        return row.join(' | ');
      }).join('\n'));
    }

    // Method the function to generate the player generateBombBoard
    // Returns a fully generated player board

  }, {
    key: 'playerBoard',
    get: function get() {
      return this._playerBoard;
    }
  }], [{
    key: 'generatePlayerBoard',
    value: function generatePlayerBoard(numberOfRows, numberOfColumns) {
      // create the variable to hold the board
      var board = [];
      // Loop through the number of rows needing to be generated based on the
      // passed parameter
      for (var rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
        // Create a variable to create a row
        var row = [];
        // Loop through each column
        for (var columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
          // Push the completed columns to the row
          row.push(' ');
        }
        // Push the completed row with columns to the board
        board.push(row);
      }
      // Return the completed board
      return board;
    }

    // Method creates the game board that holds the bomb locations
    // Returns a completed game board with bomb locations

  }, {
    key: 'generateBombBoard',
    value: function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
      // create the variable to hold the board
      var board = [];
      // Loop through the number of rows needing to be generated based on the
      // passed parameter
      for (var rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
        // Create a variable to create a row
        var row = [];
        // Loop through each column
        for (var columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
          // Push a null slot to each place where a bomb isn't held
          row.push(null);
        }
        // Push the completed row with columns to the board
        board.push(row);
      }
      // Place randomly generated bombs on the board
      // Track the number of bombs placed
      var numberOfBombsPlaced = 0;
      // Continue looping until all bombs have been placed on the board
      while (numberOfBombsPlaced < numberOfBombs) {
        // Get a random row number
        var randomRowIndex = Math.floor(Math.random() * Math.floor(numberOfRows));
        // Get a random column number
        var randomColumnIndex = Math.floor(Math.random() * Math.floor(numberOfColumns));

        // Check to make sure a bomb does not exist on this spot
        if (board[randomRowIndex][randomColumnIndex] !== 'B') {
          // Place the bomb at the selected location and increment the bomb counter
          board[randomRowIndex][randomColumnIndex] = 'B';
          numberOfBombsPlaced++;
        }
      }
      // Return the completed board
      return board;
    }
  }]);

  return Board;
}();