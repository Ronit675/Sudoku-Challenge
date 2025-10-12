import React from 'react';
import SudokuCell from './SudokuCell';

const SudokuGrid = ({ currentBoard, originalBoard, onCellChange }) => {
  return (
    <div className="sudoku-grid">
      {currentBoard.map((row, rowIndex) => (
        row.map((value, colIndex) => (
          <SudokuCell
            key={`${rowIndex}-${colIndex}`}
            value={value}
            row={rowIndex}
            col={colIndex}
            isPrefilled={originalBoard[rowIndex][colIndex] !== 0}
            onChange={onCellChange}
          />
        ))
      ))}
    </div>
  );
};

export default SudokuGrid;