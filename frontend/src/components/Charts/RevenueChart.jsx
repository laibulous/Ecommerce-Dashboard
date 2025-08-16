import React from 'react';
import { useSelector } from 'react-redux';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { formatDate, formatCurrency, formatPercentage } from '../../utils/formatters';

const RevenueChart = () => {
  const { revenue, loading, error } = useSelector((state) => state.dashboard);

  // Transform data for the chart
  const chartData = revenue?.map((item) => ({
    ...item,
    date: formatDate(item.date, 'short'),
    formattedRevenue: formatCurrency(item.revenue, false),
    formattedConversionRate: (item.conversionRate * 100).toFixed(2),
  })) || [];

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

  if (loading.revenue) {
    return (
      <div className="chart-container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-dashboard-text-primary">
            Revenue & Conversion Rate Over Time
          </h2>
        </div>
        <div className="h-80 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
        </div>
      </div