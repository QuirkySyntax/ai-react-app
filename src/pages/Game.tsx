
import React, { useEffect, useState } from 'react';
import './Game.css';

const initialSnake = [[0, 0]];
const initialFood = [Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)];

const Game: React.FC = () => {
  const [snake, setSnake] = useState(initialSnake);
  const [food, setFood] = useState(initialFood);
  const [direction, setDirection] = useState([0, 1]);
  const [gameOver, setGameOver] = useState(false);
  
  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp':
        setDirection([-1, 0]);
        break;
      case 'ArrowDown':
        setDirection([1, 0]);
        break;
      case 'ArrowLeft':
        setDirection([0, -1]);
        break;
      case 'ArrowRight':
        setDirection([0, 1]);
        break;
    }
  };

  useEffect(() => {
    if (gameOver) return;

    const moveSnake = () => {
      setSnake(prevSnake => {
        const newSnake = [...prevSnake];
        const head = newSnake[0];
        const newHead = [head[0] + direction[0], head[1] + direction[1]];

        if (
          newHead[0] < 0 || newHead[0] >= 20 || 
          newHead[1] < 0 || newHead[1] >= 20 || 
          newSnake.slice(1).some(segment => segment[0] === newHead[0] && segment[1] === newHead[1])
        ) {
          setGameOver(true);
          return prevSnake;
        }

        newSnake.unshift(newHead);
        
        if (newHead[0] === food[0] && newHead[1] === food[1]) {
          setFood([Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)]);
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const gameInterval = setInterval(moveSnake, 200);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(gameInterval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [direction, food, gameOver]);

  return (
    <div className="game">
      {gameOver ? (
        <h1>Game Over</h1>
      ) : (
        <>
          <div className="food" style={{ top: `${food[0] * 20}px`, left: `${food[1] * 20}px` }} />
          {snake.map((segment, idx) => (
            <div key={idx} className="snake" style={{ top: `${segment[0] * 20}px`, left: `${segment[1] * 20}px` }} />
          ))}
        </>
      )}
    </div>
  );
};

export default Game;