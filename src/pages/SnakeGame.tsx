
import React, { useEffect, useRef, useState } from 'react';
import './SnakeGame.css';

const SnakeGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [snake, setSnake] = useState([{ x: 0, y: 0 }]);
  const [food, setFood] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [direction, setDirection] = useState({ x: 0, y: 0 });
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.fillStyle = 'green';
      snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, 10, 10);
      });

      ctx.fillStyle = 'red';
      ctx.fillRect(food.x, food.y, 10, 10);
    };

    const moveSnake = () => {
      if (gameOver) return;

      const newSnake = [...snake];
      const head = { x: newSnake[0].x + direction.x * 10, y: newSnake[0].y + direction.y * 10 };

      if (head.x >= ctx.canvas.width || head.y >= ctx.canvas.height || head.x < 0 || head.y < 0 || newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        return;
      }

      newSnake.unshift(head);

      if (head.x === food.x && head.y === food.y) {
        setFood({ x: Math.floor(Math.random() * (ctx.canvas.width / 10)) * 10, y: Math.floor(Math.random() * (ctx.canvas.height / 10)) * 10 });
      } else {
        newSnake.pop();
      }

      setSnake(newSnake);
    };

    draw();
    moveSnake();
  }, [snake, food, direction, gameOver]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          setDirection({ x: 1, y: 0 });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!gameOver) {
      const interval = setInterval(() => {
        setSnake(snake => [...snake]); // triggers a re-render and updates the position
      }, 100);
      return () => clearInterval(interval);
    }
  }, [gameOver]);

  return (
    <div>
      <canvas ref={canvasRef} width={400} height={400} />
      {gameOver && <div className="game-over">Game Over!</div>}
    </div>
  );
};

export default SnakeGame;