import React from 'react';

const LoadingSpinner = ({ size = 'medium', text = 'Loading...' }) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'h-4 w-4';
      case 'large':
        return 'h-12 w-12';
      default:
        return 'h-8 w-8';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className={`animate-spin rounded-full border-b-2 border-primary-500 ${getSizeClasses()}`}></div>
      <p className="text-dashboard-text-secondary text-sm font-medium">{text}</p>
    </div>
  );
};

export default LoadingSpinner;