import React from 'react';

export const Loading: React.FC = () => {
  return (
    <div className="loading">
      <div className="text-center">
        <div className="loading__spinner"></div>
        <p className="loading__text">Loading amazing films...</p>
      </div>
    </div>
  );
};
