
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SnakeGame from './pages/SnakeGame';
import './App.css';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SnakeGame />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;