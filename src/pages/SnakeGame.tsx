
import React, { useEffect, useState } from 'react';
import './SnakeGame.css';

const SnakeGame: React.FC = () => {
    const [snake, setSnake] = useState([[0, 0]]);
    const [food, setFood] = useState([Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]);
    const [direction, setDirection] = useState({ x: 0, y: 0 });
    const [gameOver, setGameOver] = useState(false);
    
    const boardSize = 10;

    const moveSnake = () => {
        const head = snake[0];
        const newHead = [head[0] + direction.x, head[1] + direction.y];
        const newSnake = [newHead, ...snake];

        if (newHead[0] < 0 || newHead[0] >= boardSize || newHead[1] < 0 || newHead[1] >= boardSize || newSnake.slice(1).some(seg => seg[0] === newHead[0] && seg[1] === newHead[1])) {
            setGameOver(true);
            return;
        }

        if (newHead[0] === food[0] && newHead[1] === food[1]) {
            setFood([Math.floor(Math.random() * boardSize), Math.floor(Math.random() * boardSize)]);
        } else {
            newSnake.pop();
        }

        setSnake(newSnake);
    };

    useEffect(() => {
        if (!gameOver) {
            const interval = setInterval(moveSnake, 300);
            return () => clearInterval(interval);
        }
    }, [snake, direction, gameOver]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.key) {
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
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className="snake-game">
            {gameOver ? <h1>Game Over</h1> : null}
            <div className="board">
                {Array.from({ length: boardSize }).map((_, row) => (
                    <div key={row} className="row">
                        {Array.from({ length: boardSize }).map((_, col) => {
                            const isSnake = snake.some(seg => seg[0] === row && seg[1] === col);
                            const isFood = food[0] === row && food[1] === col;
                            return <div key={col} className={`cell ${isSnake ? 'snake' : ''} ${isFood ? 'food' : ''}`}></div>;
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SnakeGame;