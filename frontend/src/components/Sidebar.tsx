import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <h2>Project Management</h2>
      <nav>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/organizations">Organizations</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/activities">Activity Logs</Link>
        <Link to="/user-management">User Management</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
