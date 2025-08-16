import React from 'react';
import { formatNumber } from '../../utils/formatters';

const KPICard = ({ 
  title, 
  value, 
  prefix, 
  suffix, 
  format, 
  icon: Icon, 
  color, 
  bgColor, 
  description 
}) => {
  const formattedValue = formatNumber(value, format);

  return (
    <div className="kpi-card group cursor-pointer transition-all duration-300 hover:scale-105">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg ${bgColor} ${color} transition-all duration-300 group-hover:scale-110`}>
          <Icon size={20} />
        </div>
        <div className="text-xs text-dashboard-text-muted">
          {/* Optional trend indicator can go here */}
        </div>
      </div>
      
      <div className="space-y-1">
        <div className="text-2xl font-bold text-dashboard-text-primary">
          {prefix}{formattedValue}{suffix}
        </div>
        <h3 className="text-sm font-medium text-dashboard-text-secondary">
          {title}
        </h3>
        <p className="text-xs text-dashboard-text-muted">
          {description}
        </p>
      </div>

      {/* Subtle bottom border for visual enhancement */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};

export default KPICard;