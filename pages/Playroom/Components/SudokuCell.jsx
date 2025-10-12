import React from 'react';

const SudokuCell = ({ value, row, col, isPrefilled, onChange }) => {
  const handleInputChange = (e) => {
    let inputValue = e.target.value;
    
    // Only allow single digit numbers from 1-9
    if (inputValue.length > 1) {
      inputValue = inputValue.slice(0, 1);
    }
    
    const numValue = parseInt(inputValue);
    
    if (isNaN(numValue) || numValue < 1 || numValue > 9) {
      onChange(row, col, 0); // Clear invalid input
    } else {
      onChange(row, col, numValue);
    }
  };

  const handleKeyDown = (e) => {
    // Clear cell on backspace/delete if empty
    if ((e.key === 'Backspace' || e.key === 'Delete') && e.target.value === '') {
      onChange(row, col, 0);
    }
  };

  return (
    <div className={`sudoku-cell ${isPrefilled ? 'prefilled' : ''}`}>
      <input
        type="number"
        min="1"
        max="9"
        value={value === 0 ? '' : value}
        readOnly={isPrefilled}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="cell-input"
      />
    </div>
  );
};

export default SudokuCell;