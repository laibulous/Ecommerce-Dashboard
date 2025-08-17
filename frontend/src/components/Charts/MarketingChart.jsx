import React from 'react';
import { useSelector } from 'react-redux';
import { formatCurrency } from '../../utils/formatters';

const MarketingChart = () => {
  const { marketing, loading, error } = useSelector((state) => state.dashboard);

  // Sort marketing channels by revenue (descending)
  const sortedMarketing = React.useMemo(() => {
    if (!marketing || !Array.isArray(marketing)) return [];
    
    return [...marketing].sort((a, b) => b.revenue - a.revenue);
  }, [marketing]);

  // Find max revenue for scaling
  const maxRevenue = Math.max(...(sortedMarketing.map(m => m.revenue) || [0]));
  const maxConversion = Math.max(...(sortedMarketing.map(m => m.conversionRate) || [0]));

  if (loading.marketing) {
    return (
      <div className="chart-container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-dashboard-text-primary">
            Attributed Revenue and Conversion Rate by Marketing Channel
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
            Attributed Revenue and Conversion Rate by Marketing Channel
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
          Attributed Revenue and Conversion Rate by Marketing Channel
        </h2>
      </div>

      <div className="h-64 p-4">
        <div className="space-y-4">
          {sortedMarketing.map((channel, index) => {
            const revenueWidth = (channel.revenue / maxRevenue) * 60; // Scale to 60% of container
            const conversionWidth = (channel.conversionRate / maxConversion) * 40; // Scale to 40% of container
            
            return (
              <div key={channel.channel} className="flex items-center space-x-3">
                {/* Channel Name - Left Side */}
                <div className="w-20 text-xs font-medium text-gray-600 text-right flex-shrink-0">
                  {channel.channel}
                </div>
                
                {/* Combined Bar Container */}
                <div className="flex-1 relative h-6">
                  {/* Revenue Bar (Green) */}
                  <div 
                    className="absolute top-0 h-6 bg-green-500 rounded-sm flex items-center justify-end pr-2"
                    style={{ width: `${revenueWidth}%` }}
                  >
                    <span className="text-xs font-medium text-white">
                      {formatCurrency(channel.revenue, false)}
                    </span>
                  </div>
                  
                  {/* Conversion Rate Bar (Orange) - Positioned after revenue bar */}
                  <div 
                    className="absolute top-0 h-6 bg-orange-400 rounded-sm flex items-center justify-end pr-2"
                    style={{ 
                      width: `${conversionWidth}%`, 
                      left: `${revenueWidth + 2}%` 
                    }}
                  >
                    <span className="text-xs font-medium text-white">
                      {channel.conversionRate}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Legend/Summary */}
      <div className="mt-4 flex justify-center space-x-8 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-3 bg-green-500 rounded-sm"></div>
          <span className="text-gray-600">Attributed Revenue</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-3 bg-orange-400 rounded-sm"></div>
          <span className="text-gray-600">Ecommerce Conversion Rate</span>
        </div>
      </div>
    </div>
  );
};

export default MarketingChart;