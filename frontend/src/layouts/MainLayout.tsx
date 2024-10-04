import React from 'react';
import Sidebar from '../components/Sidebar';
import '../index.css';

type MainLayoutProps = {
  children?: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
