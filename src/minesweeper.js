// Create the function to generate the player generateBombBoard
// Returns a fully generated player board
const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
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
};

// Function creates the game board that holds the bomb locations
// Returns a completed game board with bomb locations
const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
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
};

// Creates a function that checks squares adjacent to a selected tile
const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
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
  const numberOfRows = bombBoard.length;
  const numberOfColumns = bombBoard[0].length;
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
          if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
            numberOfBombs++;
          }
        }
  });
  // Return the number of bombs next to this node
  return numberOfBombs;
};

//Create function that flips a tile over
const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
  // Check to see if this tile has already been flipped
  if (playerBoard[rowIndex][columnIndex] !== ' ' ) {
    console.log('This tile has already been flipped!');
    // If not flipped, check to see if there is a bomb under that tile
  } else if (bombBoard[rowIndex][columnIndex] === 'B') {
    playerBoard[rowIndex][columnIndex] = 'B';
    // If both of those conditions are passed, get the number of neighboring bombs
  } else {
    playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
  }
};

// Create a function to print boards
const printBoard = (board) => {
  // Join the columns together using pipes, the join the rows on different lines
  // and log the board to the console
  console.log(board.map(row => row.join(' | ')).join('\n'));
};

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
