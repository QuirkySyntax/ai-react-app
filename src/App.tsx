```tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Login';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<h1>Welcome to the App!</h1>} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
```

### 3. Add Basic Styles for Login

You can style the login page by adding some CSS, either in `App.css` or you can create a new CSS file specifically for the login page. For simplicity, I'll add styles to `App.css`.