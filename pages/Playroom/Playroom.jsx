import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import SudokuGrid from './Components/SudokuGrid';
import ControlButtons from './Components/ControlButton';
import MessageBox from './Components/MessageBox';
import ApiKeyInput from './Components/APIkey/APIkey';
import { generateNewPuzzle } from './Utils/PuzzleGenerator';
import { solveSudoku, checkCurrentBoard } from './Utils/SudokuSolver';
import { getHintFromGemini } from './Utils/GeminiAPI';
import './Playroom.css';
import Stopwatch from './Components/Timer/Stopwatch';

const initialPuzzle = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

const Playroom = () => {
  const [currentBoard, setCurrentBoard] = useState([]);
  const [originalBoard, setOriginalBoard] = useState([]);
  const [message, setMessage] = useState({ text: 'Welcome! Click "New Game" or solve this one.', type: '' });
  const [apiKey, setApiKey] = useState('');
  const [isHintLoading, setIsHintLoading] = useState(false);

  // Initialize the game on component mount
  useEffect(() => {
    const deepCopy = (arr) => JSON.parse(JSON.stringify(arr));
    setOriginalBoard(deepCopy(initialPuzzle));
    setCurrentBoard(deepCopy(initialPuzzle));
  }, []);

  // Handle cell value change
  const handleCellChange = (row, col, value) => {
    const newBoard = currentBoard.map(r => [...r]);
    newBoard[row][col] = value;
    setCurrentBoard(newBoard);
    setMessage({ text: 'Ready to play!', type: '' });
  };

  // Handle New Game button
  const handleNewGame = () => {
    setMessage({ text: 'Generating new puzzle...', type: '' });
    setTimeout(() => {
      const newPuzzle = generateNewPuzzle();
      const deepCopy = (arr) => JSON.parse(JSON.stringify(arr));
      setOriginalBoard(deepCopy(newPuzzle));
      setCurrentBoard(deepCopy(newPuzzle));
      setMessage({ text: 'New game started!', type: 'success' });
    }, 100);
  };

  // Handle Solve button
  const handleSolve = () => {
    setMessage({ text: 'Solving...', type: '' });
    setTimeout(() => {
      const boardToSolve = currentBoard.map(r => [...r]);
      if (solveSudoku(boardToSolve)) {
        setCurrentBoard(boardToSolve);
        setMessage({ text: 'Puzzle solved!', type: 'success' });
      } else {
        setMessage({ text: 'Could not solve the puzzle. Check your initial entries!', type: 'error' });
      }
    }, 100);
  };

  // Handle Check button
  const handleCheck = () => {
    setMessage({ text: 'Checking...', type: '' });
    setTimeout(() => {
      if (checkCurrentBoard(currentBoard)) {
        setMessage({ text: 'Looks good! Keep going or you solved it!', type: 'success' });
      } else {
        setMessage({ text: 'There are errors or empty cells. Keep trying!', type: 'error' });
      }
    }, 100);
  };

  // Handle Clear button
  const handleClear = () => {
    const deepCopy = (arr) => JSON.parse(JSON.stringify(arr));
    setCurrentBoard(deepCopy(originalBoard));
    setMessage({ text: 'Board cleared!', type: 'success' });
  };

  // Handle Get Hint button
  const handleGetHint = async () => {
    if (!apiKey) {
      setMessage({ text: 'Please enter your Gemini API key and click Save.', type: 'error' });
      return;
    }

    setIsHintLoading(true);
    setMessage({ text: 'Getting a hint from AI...', type: '' });

    try {
      const result = await getHintFromGemini(currentBoard, apiKey);

      if (result.success) {
        const newBoard = currentBoard.map(r => [...r]);
        newBoard[result.row][result.col] = result.value;
        setCurrentBoard(newBoard);
        setMessage({
          text: `Hint: Place ${result.value} at (${result.row + 1}, ${result.col + 1}). ${result.explanation}`,
          type: 'success'
        });
      } else {
        setMessage({ text: result.message, type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'An error occurred while getting a hint. Please check your network.', type: 'error' });
    } finally {
      setIsHintLoading(false);
    }
  };

  // Handle API Key save
  const handleApiKeySave = (key) => {
    setApiKey(key);
    setMessage({ text: 'API key saved!', type: 'success' });
  };

  return (
    <div>
      <div className='header-container'>
        <header>
          <span className='header-title'>Playroom</span>
          <NavLink to='/' className='header-link'>
            <button className='Exit-button'>Exit</button>
          </NavLink>
        </header>
      </div>
      <div className="message-box-container">
        <MessageBox message={message} />
      </div>
      <div className="playroom-container">
        <div className='left'>
          <div className="stopwatch-section">
            <Stopwatch />
          </div>
          <div className='api-key-section'>
            <ApiKeyInput onSave={handleApiKeySave} />
          </div>
        </div>
        <div className="sudoku-container">
          <h1 className="game-title">Sudoku Game</h1>


          <SudokuGrid
            currentBoard={currentBoard}
            originalBoard={originalBoard}
            onCellChange={handleCellChange}
          />

          <ControlButtons
            onNewGame={handleNewGame}
            onSolve={handleSolve}
            onGetHint={handleGetHint}
            onCheck={handleCheck}
            onClear={handleClear}
            isHintLoading={isHintLoading}
          />

        </div>
      </div>
    </div>
  );
};

export default Playroom;