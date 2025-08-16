import React from 'react';
import { useSelector } from 'react-redux';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { formatCurrency } from '../../utils/formatters';

const ProductChart = () => {
  const { products, loading, error } = useSelector((state) => state.dashboard);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              <span className="font-medium">{entry.name}:</span>{' '}
              {entry.dataKey === 'revenue'
                ? formatCurrency(entry.value)
                : `${entry.value}%`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (loading.products) {
    return (
      <div className="chart-container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-dashboard-text-primary">
            Product Performance
          </h2>
        </div>
        <div className="h-80 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
        </div>
      </div>
    );
  }

  if (error.products) {
    return (
      <div className="chart-container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-dashboard-text-primary">
            Product Performance
          </h2>
        </div>
        <div className="h-80 flex items-center justify-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            <p className="font-medium">Error loading product data</p>
            <p className="text-sm">{error.products}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="chart-container">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-dashboard-text-primary">
          Product Performance
        </h2>
        <div className="flex items-center space-x-4 text-sm text-dashboard-text-secondary">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>Revenue</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span>Conversion Rate</span>
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={products} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="product" 
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              yAxisId="revenue"
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              tickFormatter={(value) => formatCurrency(value, false)}
            />
            <YAxis 
              yAxisId="conversion"
              orientation="right"
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar
              yAxisId="revenue"
              dataKey="revenue"
              fill="#3b82f6"
              name="Revenue"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              yAxisId="conversion"
              dataKey="conversionRate"
              fill="#8b5cf6"
              name="Conversion Rate"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProductChart;