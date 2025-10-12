import React from 'react';

const ControlButtons = ({ 
  onNewGame, 
  onSolve, 
  onGetHint, 
  onCheck, 
  onClear,
  isHintLoading 
}) => {
  return (
    <div className="button-group">
      <button 
        className="btn btn-primary" 
        onClick={onNewGame}
      >
        New Game
      </button>
      
      <button 
        className="btn btn-primary" 
        onClick={onSolve}
      >
        Solve
      </button>
      
      <button 
        className="btn btn-primary" 
        onClick={onGetHint}
        disabled={isHintLoading}
      >
        {isHintLoading ? 'Getting Hint...' : 'Get Hint ✨'}
      </button>
      
      <button 
        className="btn btn-secondary" 
        onClick={onCheck}
      >
        Check
      </button>
      
      <button 
        className="btn btn-secondary" 
        onClick={onClear}
      >
        Clear
      </button>
    </div>
  );
};

export default ControlButtons;