import React, { useState } from 'react';
import './index.css';

function App() {
  const [gameBoard, setGameBoard] = useState(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameActive, setGameActive] = useState(true);
  const [result, setResult] = useState('');

  const handleClick = (index) => {
    if (gameBoard[index] === '' && gameActive) {
      const updatedBoard = [...gameBoard];
      updatedBoard[index] = currentPlayer;
      setGameBoard(updatedBoard);

      if (checkWinner(updatedBoard)) {
        setResult(`Player ${currentPlayer} wins!`);
        setGameActive(false);
      } else if (updatedBoard.every((cell) => cell !== '')) {
        setResult("It's a draw!");
        setGameActive(false);
      } else {
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      }
    }
  };

  const checkWinner = (board) => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winConditions.some(([a, b, c]) => {
      return board[a] !== '' && board[a] === board[b] && board[a] === board[c];
    });
  };

  const resetGame = () => {
    setGameBoard(Array(9).fill(''));
    setCurrentPlayer('X');
    setGameActive(true);
    setResult('');
  };

  const exitGame = () => {
    // Attempt to close the current tab or navigate to a new page
    if (window.confirm('Are you sure you want to exit the game?')) {
      window.location.href = 'about:blank'; // Navigate to a blank page
    }
  };

  return (
    <div className="container">
      <h1>Tic-Tac-Toe</h1>
      <div className="board">
        {gameBoard.map((cell, index) => (
          <div
            key={index}
            className="cell"
            onClick={() => handleClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>
      <div className="status">
        {result ? result : `Player ${currentPlayer}'s turn`}
      </div>
      {result && (
        <div className="result-screen">
          <div className="result-text">{result}</div>
          <button className="result-button" onClick={resetGame}>
            Restart Game
          </button>
          <button className="result-button exit-button" onClick={exitGame}>
            Exit Game
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
