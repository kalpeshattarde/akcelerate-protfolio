import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/AppIcon';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-integration-surface via-background to-integration-surface p-4">
      <div className="max-w-lg w-full text-center bg-white/80 backdrop-blur-sm rounded-xl shadow-integration border border-integration-border p-8">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-integration rounded-full flex items-center justify-center shadow-integration">
            <Icon name="Search" size={40} className="text-white" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-integration-primary bg-clip-text text-transparent">
          404 - Page Not Found
        </h1>
        
        <p className="text-text-secondary mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => navigate('/')}
            className="bg-gradient-integration hover:opacity-90 text-white py-2 px-6 rounded-lg font-medium transition-all flex items-center justify-center gap-2 shadow-integration"
          >
            <Icon name="Home" size={20} />
            <span>Go to Dashboard</span>
          </button>
          
          <button 
            onClick={() => navigate(-1)}
            className="bg-white hover:bg-primary-50 text-primary-600 py-2 px-6 rounded-lg font-medium border border-integration-border transition-all flex items-center justify-center gap-2 shadow-soft"
          >
            <Icon name="ArrowLeft" size={20} />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;