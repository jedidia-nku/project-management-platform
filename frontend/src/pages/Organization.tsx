// OrganizationDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import '../index.css';
import UserSelectionModal from './UserSelectionModal';


// types.ts
type project = {
  _id: string;
  projName: string;
  description: string;
  organization: string;
  owner: string;
  timestamp: string;
}

type User = {
  _id: string;
  user: string;
  name: string;
  email: string;
  role: string;
  timestamp: string;
};

type Organization = {
  id: string;
  name: string;
  description: string;
  members: number;
  users: User[];
  projects: project[];
};

const Organization: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Retrieve the id from the URL
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [isModalOpen, setModalOpen] = useState(false); // State for modal visibility
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    // Fetch the individual organization data using the id
    const fetchOrganization = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/organizations/${id}`);
        const data = await response.json();
        setOrganization(data);
      } catch (error) {
        console.error('Error fetching organization:', error);
      }
    };

    fetchOrganization();
  }, [id]);

  const handleUserSelection = (userId: string) => {
    const user = organization?.users.find((user) => user._id === userId);
    if (user) {
      setSelectedUser(user);
      console.log('Selected user:', user); // Log or handle selected user
    }
  };

  if (!organization) {
    return <p>Loading organization details...</p>;
  }

  return (
    <MainLayout>
      <button className="btn edit-btn" onClick={() => setModalOpen(true)}>
        Add User
      </button>
    <div className="organization-container p-6">
      <h1 className="text-3xl font-bold mb-4">{organization?.name}</h1>
      <p className="text-lg mb-6">{organization?.description}</p>

      <div className="projects-section mb-8">
        <h2 className="text-2xl font-semibold mb-4">Projects</h2>
        <ul>
          {organization.projects && organization?.projects.map((project: project) => (
            <li key={project._id} className="p-4 border-b">
              <h3 className="text-xl font-medium">{project.projName}</h3>
              <p>{project.description}</p>
              <p>Date: {new Date(project.timestamp).toLocaleDateString()}</p>
              </li>
          ))}
        </ul>
      </div>
        {/* User Selection Modal */}
        <UserSelectionModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        users={organization.users}
        onSelectUser={handleUserSelection}
      />

      {/* Users Section */}
      <div className="users-section">
        <h2 className="text-2xl font-semibold mb-4">Users</h2>
        <ul>
          {organization?.users.map((user: User) => (
            <li key={user._id} className="p-4 border-b">
              <h3 className="text-xl font-medium">{user.name}</h3>
              <p>Email: {user.email}</p>
              <p>Role: {user.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </MainLayout>
  );
};

export default Organization;
