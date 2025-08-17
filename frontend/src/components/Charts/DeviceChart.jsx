import React from 'react';
import { useSelector } from 'react-redux';
import { Monitor, Smartphone, Tablet } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

const DeviceChart = () => {
  const { devices, loading, error } = useSelector((state) => state.dashboard);

  // Device icons mapping
  const DeviceIcon = ({ device, className }) => {
    switch (device) {
      case 'Desktop':
        return <Monitor className={className} />;
      case 'Mobile':
        return <Smartphone className={className} />;
      case 'Tablet':
        return <Tablet className={className} />;
      default:
        return <Monitor className={className} />;
    }
  };

  // Sort devices by revenue (descending)
  const sortedDevices = React.useMemo(() => {
    if (!devices || !Array.isArray(devices)) return [];
    
    return [...devices].sort((a, b) => b.revenue - a.revenue);
  }, [devices]);

  // Find max values for scaling
  const maxRevenue = Math.max(...(sortedDevices.map(d => d.revenue) || [0]));
  const maxConversion = Math.max(...(sortedDevices.map(d => d.conversionRate) || [0]));

  // Calculate total revenue
  const totalRevenue = sortedDevices.reduce((sum, device) => sum + device.revenue, 0);

  if (loading.devices) {
    return (
      <div className="chart-container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-dashboard-text-primary">
            Ecommerce Revenue and Conversion Rate by Device
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
            Ecommerce Revenue and Conversion Rate by Device
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

  return (
    <div className="chart-container">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-dashboard-text-primary">
          Ecommerce Revenue and Conversion Rate by Device
        </h2>
      </div>

      <div className="h-48 p-4">
        <div className="space-y-6">
          {sortedDevices.map((device, index) => {
            const revenueWidth = (device.revenue / maxRevenue) * 60; // Scale to 60% of container
            const conversionWidth = (device.conversionRate / maxConversion) * 40; // Scale to 40% of container
            const sharePercentage = ((device.revenue / totalRevenue) * 100).toFixed(1);
            
            return (
              <div key={device.device} className="flex items-center space-x-3">
                {/* Device Icon - Left Side */}
                <div className="w-8 flex justify-center flex-shrink-0">
                  <DeviceIcon 
                    device={device.device} 
                    className="w-5 h-5 text-gray-600" 
                  />
                </div>
                
                {/* Combined Bar Container */}
                <div className="flex-1 relative h-6">
                  {/* Revenue Bar (Green/Teal) */}
                  <div 
                    className="absolute top-0 h-6 bg-teal-500 rounded-sm flex items-center justify-end pr-2"
                    style={{ width: `${revenueWidth}%` }}
                  >
                    <span className="text-xs font-medium text-white">
                      {formatCurrency(device.revenue, false)}
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
                      {device.conversionRate}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Bottom Legend */}
      <div className="mt-4 flex justify-center space-x-8 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-3 bg-teal-500 rounded-sm"></div>
          <span className="text-gray-600">Ecommerce Revenue</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-3 bg-orange-400 rounded-sm"></div>
          <span className="text-gray-600">Ecommerce Conversion Rate</span>
        </div>
      </div>
    </div>
  );
};

export default DeviceChart;