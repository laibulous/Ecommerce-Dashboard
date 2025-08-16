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

const MarketingChart = () => {
  const { marketing, loading, error } = useSelector((state) => state.dashboard);

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

  if (loading.marketing) {
    return (
      <div className="chart-container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-dashboard-text-primary">
            Marketing Channel Performance
          </h2>
        </div>
        <div className="h-80 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
        </div>
      </div>
    );
  }

  if (error.marketing) {
    return (
      <div className="chart-container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-dashboard-text-primary">
            Marketing Channel Performance
          </h2>
        </div>
        <div className="h-80 flex items-center justify-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            <p className="font-medium">Error loading marketing data</p>
            <p className="text-sm">{error.marketing}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="chart-container">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-dashboard-text-primary">
          Marketing Channel Performance
        </h2>
        <div className="flex items-center space-x-4 text-sm text-dashboard-text-secondary">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Revenue</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span>Conversion Rate</span>
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={marketing} 
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            layout="horizontal"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              type="number"
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              tickFormatter={(value) => formatCurrency(value, false)}
            />
            <YAxis 
              type="category"
              dataKey="channel" 
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              width={100}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar
              dataKey="revenue"
              fill="#10b981"
              name="Revenue"
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary stats */}
      <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
        <div className="bg-green-50 p-3 rounded-lg">
          <p className="text-green-700 font-medium">
            Top Channel: {marketing[0]?.channel}
          </p>
          <p className="text-green-600">
            Revenue: {formatCurrency(marketing[0]?.revenue)}
          </p>
        </div>
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-blue-700 font-medium">
            Total Channels: {marketing?.length || 0}
          </p>
          <p className="text-blue-600">
            Total Revenue: {formatCurrency(
              marketing?.reduce((sum, channel) => sum + (channel.revenue || 0), 0) || 0
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MarketingChart;