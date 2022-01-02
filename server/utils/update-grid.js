const updateGrid = (arr, row, col) => {
 if (arr[row][col].isRevealed) {
  return arr;
 }
 let flipped = [];
 flipped.push(arr[row][col]);
 while (flipped.length !== 0) {
  let single = flipped.pop();

  if (!single.isRevealed) {
   single.isRevealed = true;
  }

  if (single.value !== 0) {
   break;
  }
  if (
   single.row > 0 &&
   single.col > 0 &&
   arr[single.row - 1][single.col - 1].value === 0 &&
   !arr[single.row - 1][single.col - 1].isRevealed
  ) {
   flipped.push(arr[single.row - 1][single.col - 1]);
  }
  if (
   single.row < arr.length - 1 &&
   single.col < arr[0].length - 1 &&
   arr[single.row + 1][single.col + 1].value === 0 &&
   !arr[single.row + 1][single.col + 1].isRevealed
  ) {
   flipped.push(arr[single.row + 1][single.col + 1]);
  }
  if (
   single.row < arr.length - 1 &&
   single.col > 0 &&
   arr[single.row + 1][single.col - 1].value === 0 &&
   !arr[single.row + 1][single.col - 1].isRevealed
  ) {
   flipped.push(arr[single.row + 1][single.col - 1]);
  }
  if (
   single.row > 0 &&
   single.col < arr[0].length - 1 &&
   arr[single.row - 1][single.col + 1].value === 0 &&
   !arr[single.row - 1][single.col + 1].isRevealed
  ) {
   flipped.push(arr[single.row - 1][single.col + 1]);
  }

  // Single ones
  if (
   single.row > 0 &&
   arr[single.row - 1][single.col].value === 0 &&
   !arr[single.row - 1][single.col].isRevealed
  ) {
   flipped.push(arr[single.row - 1][single.col]);
  }
  if (
   single.row < arr.length - 1 &&
   arr[single.row + 1][single.col].value === 0 &&
   !arr[single.row + 1][single.col].isRevealed
  ) {
   flipped.push(arr[single.row + 1][single.col]);
  }
  if (
   single.col > 0 &&
   arr[single.row][single.col - 1].value === 0 &&
   !arr[single.row][single.col - 1].isRevealed
  ) {
   flipped.push(arr[single.row][single.col - 1]);
  }
  if (
   single.col < arr[0].length - 1 &&
   arr[single.row][single.col + 1].value === 0 &&
   !arr[single.row][single.col + 1].isRevealed
  ) {
   flipped.push(arr[single.row][single.col + 1]);
  }

  // Start Revealing Items
  if (
   single.row > 0 &&
   single.col > 0 &&
   !arr[single.row - 1][single.col - 1].isRevealed
  ) {
   //Top Left Reveal

   arr[single.row - 1][single.col - 1].isRevealed = true;
  }

  if (single.col > 0 && !arr[single.row][single.col - 1].isRevealed) {
   // Top Reveal
   arr[single.row][single.col - 1].isRevealed = true;
  }

  if (
   single.row < arr.length - 1 &&
   single.col > 0 &&
   !arr[single.row + 1][single.col - 1].isRevealed
  ) {
   //Top Right Reveal
   arr[single.row + 1][single.col - 1].isRevealed = true;
  }

  if (single.row > 0 && !arr[single.row - 1][single.col].isRevealed) {
   //Left Reveal
   arr[single.row - 1][single.col].isRevealed = true;
  }

  if (
   single.row < arr.length - 1 &&
   !arr[single.row + 1][single.col].isRevealed
  ) {
   // Right Reveal
   arr[single.row + 1][single.col].isRevealed = true;
  }

  if (
   single.row > 0 &&
   single.col < arr[0].length - 1 &&
   !arr[single.row - 1][single.col + 1].isRevealed
  ) {
   // Bottom Left Reveal
   arr[single.row - 1][single.col + 1].isRevealed = true;
  }

  if (
   single.col < arr[0].length - 1 &&
   !arr[single.row][single.col + 1].isRevealed
  ) {
   //Bottom Reveal
   arr[single.row][single.col + 1].isRevealed = true;
  }

  if (
   single.row < arr.length - 1 &&
   single.col < arr[0].length - 1 &&
   !arr[single.row + 1][single.col + 1].isRevealed
  ) {
   // Bottom Right Reveal
   arr[single.row + 1][single.col + 1].isRevealed = true;
  }
 }

 // return { arr, nonMinesRevealedCount, };
 return arr;
};

module.exports = updateGrid;
