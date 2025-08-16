import React from 'react';
import { useSelector } from 'react-redux';
import { formatCurrency } from '../../utils/formatters';

const StateMap = () => {
  const { states, loading, error } = useSelector((state) => state.dashboard);

  // Simple state visualization as bars (since we don't have a proper map library)
  const maxRevenue = Math.max(...(states?.map(s => s.revenue) || [0]));
  
  const getIntensityColor = (revenue) => {
    const intensity = revenue / maxRevenue;
    if (intensity > 0.8) return 'bg-blue-600';
    if (intensity > 0.6) return 'bg-blue-500';
    if (intensity > 0.4) return 'bg-blue-400';
    if (intensity > 0.2) return 'bg-blue-300';
    return 'bg-blue-200';
  };

  const getTextColor = (revenue) => {
    const intensity = revenue / maxRevenue;
    return intensity > 0.4 ? 'text-white' : 'text-gray-700';
  };

  if (loading.states) {
    return (
      <div className="chart-container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-dashboard-text-primary">
            Revenue by State
          </h2>
        </div>
        <div className="h-80 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
        </div>
      </div>
    );
  }

  if (error.states) {
    return (
      <div className="chart-container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-dashboard-text-primary">
            Revenue by State
          </h2>
        </div>
        <div className="h-80 flex items-center justify-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            <p className="font-medium">Error loading state data</p>
            <p className="text-sm">{error.states}</p>
          </div>
        </div>
      </div>
    );
  }

  // Sort states by revenue (descending)
  const sortedStates = [...(states || [])].sort((a, b) => b.revenue - a.revenue);

  return (
    <div className="chart-container">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-dashboard-text-primary">
          Revenue by State
        </h2>
        <div className="text-sm text-dashboard-text-secondary">
          {states?.length || 0} states
        </div>
      </div>

      {/* State Revenue Bars */}
      <div className="space-y-3">
        {sortedStates.map((state, index) => (
          <div key={state.state} className="flex items-center">
            {/* State Name */}
            <div className="w-24 text-sm font-medium text-dashboard-text-secondary flex-shrink-0">
              {state.state}
            </div>
            
            {/* Revenue Bar */}
            <div className="flex-1 mx-4">
              <div className="relative bg-gray-100 rounded-full h-8 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-3 ${getIntensityColor(state.revenue)}`}
                  style={{ width: `${(state.revenue / maxRevenue) * 100}%` }}
                >
                  <span className={`text-xs font-medium ${getTextColor(state.revenue)}`}>
                    {formatCurrency(state.revenue, false)}
                  </span>
                </div>
              </div>
            </div>

            {/* Percentage */}
            <div className="w-16 text-right text-sm text-dashboard-text-secondary">
              {((state.revenue / sortedStates[0].revenue) * 100).toFixed(0)}%
            </div>
          </div>
        ))}
      </div>

      {/* Color Legend */}
      <div className="mt-6 flex items-center justify-center space-x-4 text-xs text-dashboard-text-secondary">
        <span>Low</span>
        <div className="flex space-x-1">
          <div className="w-3 h-3 bg-blue-200 rounded"></div>
          <div className="w-3 h-3 bg-blue-300 rounded"></div>
          <div className="w-3 h-3 bg-blue-400 rounded"></div>
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <div className="w-3 h-3 bg-blue-600 rounded"></div>
        </div>
        <span>High</span>
      </div>

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-blue-700 font-medium">
            Top State: {sortedStates[0]?.state}
          </p>
          <p className="text-blue-600">
            {formatCurrency(sortedStates[0]?.revenue)}
          </p>
        </div>
        <div className="bg-green-50 p-3 rounded-lg">
          <p className="text-green-700 font-medium">
            Total Revenue
          </p>
          <p className="text-green-600">
            {formatCurrency(
              states?.reduce((sum, state) => sum + (state.revenue || 0), 0) || 0
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StateMap;