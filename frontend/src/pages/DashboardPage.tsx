import React, { useEffect, useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import '../index.css';

const DashboardPage: React.FC = () => {

  type activity = {
    _id: string;
    user: string;
    action: string;
    userRole: string;
    name: string;
    timestamp: string;
  };
  type project = {
    _id: string;
    projName: string;
    description: string;
    organization: string;
    owner: string;
    activities: activity[];
  };
  type User = {

  };

  //fetch data from the backend
  const [activities, setActivities] = useState<project[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Fetch data from the backend
    fetch('http://localhost:3000/api/projects/allProjects')
      .then((response) => response.json())
      .then((data) => setActivities(data))
      .catch((error) => console.error('Error fetching activities:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/api/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching activities:', error));
  }, []);

  return (
    <MainLayout>
      <div className="dashboard-container">
        <h1>Dashboard</h1>
        {/* Summary Cards */}
        <div className="dashboard-cards">
          <div className="card">
            <h2>Total Activities</h2>
            <p>{activities.length}</p>
          </div>
          <div className="card">
            <h2>Active Projects</h2>
            <p>{activities.length}</p>
          </div>
          <div className="card">
            <h2>Total Users</h2>
            <p>{users.length}</p>
          </div>
        </div>

        {/* Activity Log Table */}
        <div className="activity-log">
          <h2>Activity Logs</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Activity</th>
                <th>Project Name</th>
                <th>User</th>
                <th>Role</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
                {activities.map((project) => (
                  project.activities.map((activity) => (
                    <tr key={activity._id}>
                      <td>{activity.action}</td>
                      <td>{project.projName}</td>
                      <td>{activity.name}</td>
                      <td>{activity.userRole}</td>
                      <td>{new Date(activity.timestamp).toLocaleString()}</td>
                    </tr>
                  ))
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
