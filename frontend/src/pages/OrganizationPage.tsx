import React, { useState, useEffect } from 'react';
import '../index.css';
import MainLayout from '../layouts/MainLayout';
import { useNavigate } from 'react-router-dom';
import OrganizationForm from './OrganizationForm';

type User = {
  id: string;
  user: string;
  name: string;
  role: string;
  timestamp: string;
};
type Organization = {
  _id: string;
  name: string;
  description: string;
  members: number;
  users: User[];
};

const Organizations: React.FC = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/organizations/allOrganizations');
        const data = await response.json();
        setOrganizations(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching organizations:', error);
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, []);

  const handleClick = (id: string) => {
    navigate(`/organizations/${id}`);
  };


  return (
    <MainLayout>
    <OrganizationForm />
      <div className="organizations-container">
        <h1>Organizations</h1>
        {loading ? (
          <p>Loading organizations...</p>
        ) : (
          <div className="organizations-list">
            {organizations.map((org) => (
              <div className="organization-card" key={org._id}>
                <h2>{org.name}</h2>
                <p>{org.description}</p>
                <p>Members: {org.users.length}</p>
                <p>Admin: {org.users.find((user) => user.role === 'admin')?.name}</p>
                <div className="organization-actions">
                  <button
                    className="btn manage-role-btn"
                    onClick={() => handleClick(org._id)} // Pass org.id to handleClick
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Organizations;
