import React, { useState } from 'react';

const ApiKeyInput = ({ onSave }) => {
  const [apiKey, setApiKey] = useState('');

  const handleSave = () => {
    if (!apiKey.trim()) {
      alert('Please enter a valid API key');
      return;
    }
    onSave(apiKey.trim());
  };

  return (
    <div className="api-key-container">
      <label htmlFor="api-key" className="api-key-label">
        Gemini API Key (for AI hints)
      </label>
      <div className="api-key-input-group">
        <input
          id="api-key"
          type="password"
          placeholder="Paste your Google AI Studio API key"
          className="api-key-input"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          autoComplete="off"
        />
        <button 
          className="btn btn-secondary save-key-btn" 
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ApiKeyInput;