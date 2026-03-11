
import React, { useState, useEffect } from 'react';

const Game: React.FC = () => {
  const [gameState, setGameState] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  useEffect(() => {
    if (gameState >= 10) {
      setIsGameOver(true);
    }
  }, [gameState]);

  const handleClick = () => {
    if (!isGameOver) {
      setGameState(prev => prev + 1);
    }
  };

  const resetGame = () => {
    setGameState(0);
    setIsGameOver(false);
  };

  return (
    <div>
      <h1>{isGameOver ? "Game Over" : "Current Score: " + gameState}</h1>
      <button onClick={handleClick} disabled={isGameOver}>
        Click to increase score
      </button>
      {isGameOver && <button onClick={resetGame}>Restart Game</button>}
    </div>
  );
}

export default Game;