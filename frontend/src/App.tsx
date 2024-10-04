import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import OrganizationPage from './pages/OrganizationPage';
import ProjectPage from './pages/ProjectPage';
import ActivityLogPage from './pages/ActivityLogPage';
import UserManagementPage from './pages/UserManagementPage';
import './index.css';
import Organization from './pages/Organization';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/organizations/:id" element={<Organization/>} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/organizations" element={<OrganizationPage />} />
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/activities" element={<ActivityLogPage />} />
        <Route path="/user-management" element={<UserManagementPage />} />
      </Routes>
    </Router>
  );
};

export default App;
