import React, { useEffect, useState } from 'react';
import '../index.css';
import MainLayout from '../layouts/MainLayout';

interface User {
  _id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer' | 'Data Entry';
  organizations: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

useEffect(() => {
  fetch('http://localhost:3000/api/users')
    .then((response) => response.json())
    .then((data) => setUsers(data))
    .catch((error) => console.error('Error fetching Users:', error));
  }, []);


  return (
    <MainLayout>
    <div className="user-management-container">
      <h1>User Management</h1>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td><button>Edit User</button></td>
              <td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </MainLayout>
  );
};

export default UserManagement;
