// Create Board class
class Board {
  // constructor taht assign parameter values for rows, columns, and numberOfBombs
  // and generates the player board and the bomb board
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberofBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  // Get method for the player board
  get playerBoard() {
    return this._playerBoard;
  }

  // Method for flipping over a tile over
  flipTile (rowIndex, columnIndex) {
    // Check to see if this tile has already been flipped
    if (this._playerBoard[rowIndex][columnIndex] !== ' ' ) {
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
  getNumberOfNeighborBombs (rowIndex, columnIndex) {
    // Constant that identifies all possible offset (adjacent) squares
    // to selected square
    const neighborOffsets = [[1, 1],
                             [1, 0],
                             [1, -1],
                             [0, 1],
                             [0, -1],
                             [-1, 1],
                             [-1, 0],
                             [-1, -1]];
    // Constants that get the board dimensions
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;
    // Variable that determines the number of adjacent bombs
    let numberOfBombs = 0;
    // Check each offset to determine the number of bombs next to it
    neighborOffsets.forEach(offset => {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];
      // Check to make sure that the array position is valid
      if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows &&
          neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
            // If board position is valid, check for a bomb and increment if found
            if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
              numberOfBombs++;
            }
          }
        });
    // Return the number of bombs next to this node
    return numberOfBombs;
  }

  hasSafeTiles() {
     return this._numberOfTiles !== this._numberofBombs;
  }

  // Method to print the player board
  print() {
    // Join the columns together using pipes, the join the rows on different lines
    // and log the board to the console
    console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
  }

  // Method the function to generate the player generateBombBoard
  // Returns a fully generated player board
  static generatePlayerBoard(numberOfRows, numberOfColumns) {
    // create the variable to hold the board
    let board = [];
    // Loop through the number of rows needing to be generated based on the
    // passed parameter
    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
      // Create a variable to create a row
      let row = [];
      // Loop through each column
      for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
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
  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    // create the variable to hold the board
    let board = [];
    // Loop through the number of rows needing to be generated based on the
    // passed parameter
    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
      // Create a variable to create a row
      let row = [];
      // Loop through each column
      for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
        // Push a null slot to each place where a bomb isn't held
        row.push(null);
      }
      // Push the completed row with columns to the board
      board.push(row);
    }
    // Place randomly generated bombs on the board
    // Track the number of bombs placed
    numberOfBombsPlaced = 0;
    // Continue looping until all bombs have been placed on the board
    while (numberOfBombsPlaced < numberOfBombs) {
      // Get a random row number
      let randomRowIndex = Math.floor(Math.random() * Math.floor(numberOfRows));
      // Get a random column number
      let randomColumnIndex = Math.floor(Math.random() * Math.floor(numberOfColumns));

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

}





// Test the functions, creating a 3 x 4 player board
// and a bomb board with 5 bombs and print them
let playerBoard = generatePlayerBoard(3,4);
let bombBoard = generateBombBoard(3,4,5);
console.log("Player board: ");
printBoard(playerBoard);
console.log("Bomb board: ");
printBoard(bombBoard);
// Testing tile flips
flipTile(playerBoard, bombBoard, 1, 2);
console.log('Updated player board:');
printBoard(playerBoard);
