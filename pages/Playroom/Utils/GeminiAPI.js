import { findEmpty, isValid } from '../Utils/SudokuSolver';
// import { GoogleGenAI } from "@google/genai";
// Get a hint from the Gemini API for an empty cell
export const getHintFromGemini = async (currentBoard, apiKey) => {
  const emptyCell = findEmpty(currentBoard);
  
  if (!emptyCell) {
    return {
      success: false,
      message: 'The board is already solved! No hints needed.'
    };
  }

  const [row, col] = emptyCell;

  const prompt = `Given the following Sudoku board, find a valid number (1-9) that can be placed in row ${row}, column ${col} (0-indexed). Provide the suggested number and a very brief explanation for why it's a good move. Ensure the number is valid according to standard Sudoku rules (no duplicates in row, column, or 3x3 box).

Board:
${JSON.stringify(currentBoard)}

Provide the response in JSON format with the following structure:
{
  "hintFound": boolean,
  "row": number,
  "col": number,
  "value": number,
  "explanation": string,
  "message": string
}
If no valid hint can be found for this specific cell, set hintFound to false and provide a message.`;

  const chatHistory = [{ 
    role: "user", 
    parts: [{ text: prompt }] 
  }];

  const payload = {
    contents: chatHistory,
    generationConfig: {
      responseMimeType: "application/json"
    }
  };

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok) {
      const detail = (result && result.error && result.error.message) || response.statusText;
      return {
        success: false,
        message: `AI request failed: ${detail}`
      };
    }

    if (result.candidates && 
        result.candidates.length > 0 &&
        result.candidates[0].content && 
        result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0) {
      
      const rawText = result.candidates[0].content.parts[0].text || '';
      let parsedHint;
      
      try {
        parsedHint = JSON.parse(rawText);
      } catch (e) {
        return {
          success: false,
          message: 'AI returned an unexpected format. Try again.'
        };
      }

      // Validate the hint
      if (parsedHint.hintFound && 
          parsedHint.row === row && 
          parsedHint.col === col &&
          parsedHint.value >= 1 && 
          parsedHint.value <= 9 &&
          isValid(currentBoard, parsedHint.value, parsedHint.row, parsedHint.col)) {
        
        return {
          success: true,
          row: parsedHint.row,
          col: parsedHint.col,
          value: parsedHint.value,
          explanation: parsedHint.explanation
        };
      } else {
        return {
          success: false,
          message: parsedHint.message || 'Could not get a useful hint. Try again!'
        };
      }
    } else {
      const blocked = (result.promptFeedback && result.promptFeedback.blockReason) || 'No candidates';
      return {
        success: false,
        message: `Failed to get a hint from AI (${blocked}). Please try again.`
      };
    }
  } catch (error) {
    console.error('Error fetching hint:', error);
    throw error;
  }
};