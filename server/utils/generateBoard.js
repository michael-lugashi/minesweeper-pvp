function generateBoard(totalRows, totalCols, mines) {
 const startRow = Math.floor(Math.random() * 6 + 1);
 const startCol = Math.floor(Math.random() * 8 + 1);
 //generate empty grid
 const grid = [];
 for (let row = 0; row < totalRows; row++) {
  const subArray = [];
  for (let col = 0; col < totalCols; col++) {
   subArray.push(0);
  }
  grid.push(subArray);
 }

 //randomize mines
 let mineCount = 0;
 while (mineCount < mines) {
  const row = Math.floor(Math.random() * totalRows);
  const col = Math.floor(Math.random() * totalCols);

  // MAKES SURE THE STARTING SQUARE HAS ZERO SAROUNDING MINES AND IS NOT MINED ITSELF

  // TOP

  // Top Left

  if (row === startRow - 1 && col === startCol - 1) {
   continue;
  }

  // Top Middle

  if (row === startRow - 1 && col === startCol) {
   continue;
  }

  // Top Right

  if (row === startRow - 1 && col === startCol + 1) {
   continue;
  }

  // MIDDLE

  // Middle Left

  if (row === startRow && col === startCol - 1) {
   continue;
  }

  // Middle Middle -starting square

  if (row === startRow && col === startCol) {
   continue;
  }

  // Middle Right

  if (row === startRow && col === startCol + 1) {
   continue;
  }

  // Bottom

  // Bottom Left

  if (row === startRow + 1 && col === startCol - 1) {
   continue;
  }

  // Bottom Middle

  if (row === startRow + 1 && col === startCol) {
   continue;
  }

  // Bottom Right

  if (row === startRow + 1 && col === startCol + 1) {
   continue;
  }

  if (grid[row][col] === 0) {
   grid[row][col] = '💣';
   mineCount++;
  }
 }

 // add adjacent bombs

 for (let row = 0; row < totalRows; row++) {
  for (let col = 0; col < totalCols; col++) {
   if (grid[row][col] === '💣') {
    continue;
   }

   // Top

   // Top Left
   if (row > 0 && col > 0 && grid[row - 1][col - 1] === '💣') {
    grid[row][col]++;
   }

   // Top Middle
   if (row > 0 && grid[row - 1][col] === '💣') {
    grid[row][col]++;
   }

   // Top Right
   if (row > 0 && col < totalCols - 1 && grid[row - 1][col + 1] === '💣') {
    grid[row][col]++;
   }

   // MIDDLE

   // Middle Left
   if (col > 0 && grid[row][col - 1] === '💣') {
    grid[row][col]++;
   }
   // Middle Right
   if (col < totalCols - 1 && grid[row][col + 1] === '💣') {
    grid[row][col]++;
   }

   //BOTTOM

   // Bottom Left
   if (row < totalRows - 1 && col > 0 && grid[row + 1][col - 1] === '💣') {
    grid[row][col]++;
   }

   // Bottom Middle
   if (row < totalRows - 1 && grid[row + 1][col] === '💣') {
    grid[row][col]++;
   }

   // Bottom Right
   if (
    row < totalRows - 1 &&
    col < totalCols - 1 &&
    grid[row + 1][col + 1] === '💣'
   ) {
    grid[row][col]++;
   }
  }
 }

 return fillBoardSquares(grid, startRow, startCol);
}

function fillBoardSquares(grid, startRow, startCol) {
 const board = [];
 for (let row = 0; row < grid.length; row++) {
  const rowOfSquares = [];
  for (let col = 0; col < grid[row].length; col++) {
   rowOfSquares.push(new Square(grid[row][col], row, col, startRow, startCol));
  }
  board.push(rowOfSquares);
 }
 return board;
}

class Square {
 constructor(_value, _row, _col, startRow, startCol) {
  this.isRevealed = false;
  this.isFlagged = false;
  this.value = _value;
  this.row = _row;
  this.col = _col;
  this.isStartingSquare = _row === startRow && _col === startCol;
 }
}

// console.log(generateBoard(8, 10, 10, 4, 5));
module.exports = generateBoard;
// && (i + 1) % 10 !== 0
// && i % 10 !== 0
