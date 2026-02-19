import React from 'react';

const ProgressBar = ({ progress, label, showPercentage = true, color = 'primary' }) => {
  const percentage = Math.min(100, Math.max(0, progress));
  
  const colorClasses = {
    primary: 'bg-primary',
    success: 'bg-success',
    alert: 'bg-alert',
    accent: 'bg-accent'
  };

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          {showPercentage && (
            <span className="text-sm font-semibold text-gray-600">
              {percentage.toFixed(1)}%
            </span>
          )}
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <div
          className={`h-full ${colorClasses[color]} transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
