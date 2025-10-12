import { solveSudoku } from './SudokuSolver';

// Generate a new solvable Sudoku puzzle
export const generateNewPuzzle = () => {
  // Create an empty 9x9 board
  let newBoard = Array(9).fill(0).map(() => Array(9).fill(0));

  // Fill the board completely using the solver
  // This ensures a valid starting point
  solveSudoku(newBoard);

  // Create a deep copy to remove cells from
  let puzzle = JSON.parse(JSON.stringify(newBoard));

  // Randomly remove cells to create the puzzle
  // Adjust this number for difficulty (more cells removed = harder)
  let cellsToRemove = 50; // Medium difficulty
  
  while (cellsToRemove > 0) {
    const r = Math.floor(Math.random() * 9);
    const c = Math.floor(Math.random() * 9);
    if (puzzle[r][c] !== 0) {
      puzzle[r][c] = 0;
      cellsToRemove--;
    }
  }
  
  return puzzle;
};