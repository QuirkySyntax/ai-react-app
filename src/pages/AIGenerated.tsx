```javascript
import React from 'react';
import './Dashboard.css'; // Import your styles here

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <h1>Dashboard</h1>
        {/* Add your main dashboard content here */}
      </div>
    </div>
  );
};

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Menu</h2>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#profile">Profile</a></li>
        <li><a href="#settings">Settings</a></li>
        <li><a href="#logout">Logout</a></li>
      </ul>
    </div>
  );
};

export default Dashboard;
```

--- 

### CSS (Dashboard.css)
```css
.dashboard {
  display: flex;
}

.sidebar {
  width: 200px;
  background-color: #f4f4f4;
  padding: 20px;
  border-right: 1px solid #ccc;
}

.sidebar h2 {
  text-align: center;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar ul li {
  margin: 15px 0;
}

.sidebar ul li a {
  text-decoration: none;
  color: #333;
}

.dashboard-content {
  flex: 1;
  padding: 20px;
}
```

This will create a simple dashboard layout with a sidebar menu. You can enhance it further by adding more styles and functionality as needed.