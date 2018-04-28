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
    if board[randomRowIndex][randomColumnIndex] !== 'B') {
      // Place the bomb at the selected location and increment the bomb counter
      board[randomRowIndex][randomColumnIndex] = 'B';
      numberOfBombsPlaced++;
    }
  }
  // Return the completed board
  return board;
};

// Creates a function that checks squares adjacent to a selected tile
// TODO: finish function logic, including adding interactivity components
// TODO: add necessary return parameter
const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
  // Constant that identifies all possible offset (adjacent) squares
  // to selected square
  const neighborOffsets = [[1,1],[1,0],[1,-1],[0,1],[0,-1],[-1,1],[-1,0],[-1,-1]];
  // Constants that get the board dimensions
  const numberOfRows = bombBoard.length;
  const numberOfColumns = bombboard[0].length;
  // Variable that determines the number of adjacent bombs
  let numberOfBombs = 0;
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
