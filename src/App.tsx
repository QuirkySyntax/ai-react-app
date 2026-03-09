
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';

const App: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={Login} />
                {/* Add other routes here */}
            </Switch>
        </Router>
    );
};

export default App;