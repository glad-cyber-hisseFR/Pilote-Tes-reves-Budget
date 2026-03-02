import React from 'react';
import { calculateExpensesByCategory, formatCurrency } from '../utils/calculations';

const COLORS = [
  '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6',
  '#EF4444', '#06B6D4', '#F97316', '#84CC16',
  '#EC4899', '#6366F1'
];

const ExpensePieChart = ({ expenses }) => {
  const byCategory = calculateExpensesByCategory(expenses);
  const categories = Object.entries(byCategory).sort((a, b) => b[1] - a[1]);
  const total = categories.reduce((sum, [, v]) => sum + v, 0);

  if (total === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">🥧 Dépenses par catégorie</h2>
        <p className="text-gray-500 text-center py-8">Aucune dépense enregistrée</p>
      </div>
    );
  }

  // Build SVG donut slices
  const cx = 80;
  const cy = 80;
  const r = 60;
  const innerR = 35;

  let cumAngle = -Math.PI / 2;
  const slices = categories.map(([name, value], i) => {
    const angle = (value / total) * 2 * Math.PI;
    const color = COLORS[i % COLORS.length];

    // SVG arcs can't draw a full circle (360°) as a single arc path; use two circles instead
    if (Math.abs(angle - 2 * Math.PI) < 1e-9) {
      const slice = { fullCircle: true, color, name, value };
      cumAngle += angle;
      return slice;
    }

    const x1 = cx + r * Math.cos(cumAngle);
    const y1 = cy + r * Math.sin(cumAngle);
    const x2 = cx + r * Math.cos(cumAngle + angle);
    const y2 = cy + r * Math.sin(cumAngle + angle);
    const ix1 = cx + innerR * Math.cos(cumAngle);
    const iy1 = cy + innerR * Math.sin(cumAngle);
    const ix2 = cx + innerR * Math.cos(cumAngle + angle);
    const iy2 = cy + innerR * Math.sin(cumAngle + angle);
    const largeArc = angle > Math.PI ? 1 : 0;
    const path = [
      `M ${x1} ${y1}`,
      `A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`,
      `L ${ix2} ${iy2}`,
      `A ${innerR} ${innerR} 0 ${largeArc} 0 ${ix1} ${iy1}`,
      'Z'
    ].join(' ');
    const slice = { path, color, name, value };
    cumAngle += angle;
    return slice;
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">🥧 Dépenses par catégorie</h2>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <svg
          viewBox="0 0 160 160"
          className="w-40 h-40 flex-shrink-0"
          role="img"
          aria-label={`Graphique circulaire des dépenses par catégorie. Total : ${formatCurrency(total)}`}
        >
          <title>Dépenses par catégorie</title>
          {slices.map((slice, i) =>
            slice.fullCircle ? (
              <g key={i}>
                <circle cx={cx} cy={cy} r={r} fill={slice.color} />
                <circle cx={cx} cy={cy} r={innerR} fill="white" />
              </g>
            ) : (
              <path key={i} d={slice.path} fill={slice.color} />
            )
          )}
          <text x={cx} y={cy - 4} textAnchor="middle" className="text-xs" fontSize="9" fill="#374151">Total</text>
          <text x={cx} y={cy + 8} textAnchor="middle" fontSize="8" fill="#374151">
            {formatCurrency(total)}
          </text>
        </svg>
        <div className="flex-1 space-y-2 w-full">
          {slices.map((slice, i) => (
            <div key={i} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: slice.color }}
                />
                <span className="text-sm text-gray-700 truncate">{slice.name}</span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-sm font-semibold text-gray-800">
                  {formatCurrency(slice.value)}
                </span>
                <span className="text-xs text-gray-500">
                  ({((slice.value / total) * 100).toFixed(1)}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpensePieChart;
