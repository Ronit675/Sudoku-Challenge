// Find the next empty cell (represented by 0) on the board
export const findEmpty = (board) => {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] === 0) {
        return [r, c];
      }
    }
  }
  return null; // No empty cells found
};

// Check if placing a number at a specific position is valid
export const isValid = (board, num, row, col) => {
  // Check row
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num && x !== col) {
      return false;
    }
  }

  // Check column
  for (let x = 0; x < 9; x++) {
    if (board[x][col] === num && x !== row) {
      return false;
    }
  }

  // Check 3x3 box
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[startRow + i][startCol + j] === num && 
          (startRow + i !== row || startCol + j !== col)) {
        return false;
      }
    }
  }

  return true;
};

// Solve the Sudoku board using backtracking algorithm
export const solveSudoku = (board) => {
  const find = findEmpty(board);
  if (!find) {
    return true; // No empty cells, puzzle solved
  }

  const [row, col] = find;

  for (let num = 1; num <= 9; num++) {
    if (isValid(board, num, row, col)) {
      board[row][col] = num;

      if (solveSudoku(board)) {
        return true; // Solution found
      }

      board[row][col] = 0; // Backtrack
    }
  }
  return false; // No solution found for this path
};

// Check if the current board state is valid and complete
export const checkCurrentBoard = (board) => {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const num = board[r][c];
      if (num === 0 || !isValid(board, num, r, c)) {
        return false; // Cell is empty or invalid
      }
    }
  }
  return true; // All cells are filled and valid
};