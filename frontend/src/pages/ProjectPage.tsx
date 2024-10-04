import React, { useEffect, useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import '../index.css';

type proj = {
  _id: string;
  user: string;
  name:String;
  action: string;
  userRole: string;
  timestamp: string;
};
type Projects = {
  _id: string;
  projName: string;
  description: string;
  organization: string;
  owner: string;
  activities: proj[];
};



const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Projects[]>([]);

useEffect(() => {
  // Fetch data from the backend
  fetch('http://localhost:3000/api/projects/allProjects')
    .then((response) => response.json())
    .then((data) => setProjects(data))
    .catch((error) => console.error('Error fetching Projects:', error));
}, []);
  return (
    
    <MainLayout>
    <div className="project-list-container">
      <h2 className="project-list-title">Projects</h2>
      <div className="project-cards-container">
      {projects.map((project) => (
        project.activities.map((proj) => (
          <div key={proj._id} className= "project-card">
            <h3 className="project-name">{project.projName}</h3>
            <p className="project-description">{project.description}</p>
            <p className="project-owner"><strong>Owner:</strong> {proj.name}</p>
            <p className="project-dates">
              <strong>Date:</strong> {new Date(proj.timestamp).toLocaleString()} <br />
            </p>
          </div>
          ))
        ))}
      </div>
    </div>
    </MainLayout>
  );
};

export default ProjectList;
