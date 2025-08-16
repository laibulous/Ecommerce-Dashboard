import React from 'react';
import { useSelector } from 'react-redux';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

const DEVICE_COLORS = {
  Desktop: '#3b82f6',
  Mobile: '#10b981', 
  Tablet: '#f59e0b',
};

const DeviceChart = () => {
  const { devices, loading, error } = useSelector((state) => state.dashboard);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-2">{data.device}</p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Revenue:</span> {formatCurrency(data.revenue)}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Conversion:</span> {data.conversionRate}%
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Share:</span> {data.percentage}%
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percentage }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${percentage}%`}
      </text>
    );
  };

  if (loading.devices) {
    return (
      <div className="chart-container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-dashboard-text-primary">
            Device Performance
          </h2>
        </div>
        <div className="h-80 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
        </div>
      </div>
    );
  }

  if (error.devices) {
    return (
      <div className="chart-container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-dashboard-text-primary">
            Device Performance
          </h2>
        </div>
        <div className="h-80 flex items-center justify-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            <p className="font-medium">Error loading device data</p>
            <p className="text-sm">{error.devices}</p>
          </div>
        </div>
      </div>
    );
  }

  // Calculate percentages
  const totalRevenue = devices?.reduce((sum, device) => sum + device.revenue, 0) || 0;
  const chartData = devices?.map(device => ({
    ...device,
    percentage: ((device.revenue / totalRevenue) * 100).toFixed(1)
  })) || [];

  return (
    <div className="chart-container">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-dashboard-text-primary">
          Device Performance
        </h2>
        <div className="text-sm text-dashboard-text-secondary">
          Total Revenue: {formatCurrency(totalRevenue)}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={CustomLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="revenue"
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={DEVICE_COLORS[entry.device] || '#8884d8'} 
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Device Stats */}
        <div className="space-y-4">
          {chartData.map((device, index) => (
            <div key={device.device} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: DEVICE_COLORS[device.device] }}
                ></div>
                <div>
                  <p className="font-medium text-dashboard-text-primary">{device.device}</p>
                  <p className="text-sm text-dashboard-text-secondary">
                    {device.conversionRate}% conversion
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-dashboard-text-primary">
                  {formatCurrency(device.revenue)}
                </p>
                <p className="text-sm text-dashboard-text-secondary">
                  {device.percentage}% share
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeviceChart;