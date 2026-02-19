import React from 'react';
import { formatCurrency } from '../utils/calculations';

const FinancialCard = ({ title, amount, icon, color = 'primary', trend = null }) => {
  const colorClasses = {
    primary: 'bg-primary text-white',
    success: 'bg-success text-white',
    alert: 'bg-alert text-white',
    accent: 'bg-accent text-white',
    neutral: 'bg-gray-100 text-gray-800'
  };

  const trendColors = {
    up: 'text-success',
    down: 'text-alert',
    neutral: 'text-gray-500'
  };

  return (
    <div className={`rounded-lg shadow-md p-6 ${colorClasses[color]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-90 mb-1">{title}</p>
          <p className="text-3xl font-bold">{formatCurrency(amount)}</p>
          {trend && (
            <p className={`text-sm mt-2 ${trendColors[trend.type]}`}>
              {trend.text}
            </p>
          )}
        </div>
        {icon && (
          <div className="text-4xl opacity-80">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialCard;
