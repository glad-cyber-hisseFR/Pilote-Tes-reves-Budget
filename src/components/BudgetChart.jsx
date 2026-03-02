import React from 'react';
import { formatCurrency } from '../utils/calculations';

const BudgetChart = ({ totalIncome, totalExpenses, savings }) => {
  const max = Math.max(totalIncome, totalExpenses, savings, 1);

  const bars = [
    { label: 'Recettes', value: totalIncome, color: '#10B981', bg: 'bg-success' },
    { label: 'Dépenses', value: totalExpenses, color: '#F59E0B', bg: 'bg-alert' },
    { label: 'Économies', value: savings, color: '#8B5CF6', bg: 'bg-accent' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">📊 Vue d'ensemble financière</h2>
      <div
        role="img"
        aria-label={`Graphique financier : Recettes ${formatCurrency(totalIncome)}, Dépenses ${formatCurrency(totalExpenses)}, Économies ${formatCurrency(savings)}`}
        className="flex items-end justify-around gap-6 h-48"
      >
        {bars.map((bar) => {
          const heightPct = max > 0 ? (bar.value / max) * 100 : 0;
          return (
            <div key={bar.label} className="flex flex-col items-center flex-1 gap-2">
              <span className="text-xs font-semibold text-gray-700">
                {formatCurrency(bar.value)}
              </span>
              <div className="w-full flex items-end" style={{ height: '140px' }}>
                <div
                  className={`w-full rounded-t-lg transition-all duration-500 ${bar.bg}`}
                  style={{ height: `${Math.max(heightPct, bar.value > 0 ? 4 : 0)}%` }}
                />
              </div>
              <span className="text-sm text-gray-600 font-medium">{bar.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetChart;
