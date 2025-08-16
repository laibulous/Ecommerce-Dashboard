import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const ChartHeader = ({ 
  title, 
  kpi1Label, 
  kpi2Label, 
  kpi1Color = "blue", 
  kpi2Color = "orange",
  onKPI1Change,
  onKPI2Change,
  onBreakdownChange,
  showBreakdown = false
}) => {
  const [kpi1Open, setKpi1Open] = useState(false);
  const [kpi2Open, setKpi2Open] = useState(false);
  const [breakdownOpen, setBreakdownOpen] = useState(false);

  const kpiOptions = [
    { value: 'ecommerceRevenue', label: 'Ecommerce Revenue' },
    { value: 'ecommerceConversionRate', label: 'Ecommerce Conversion Rate' },
    { value: 'newCustomers', label: 'New Customers' },
    { value: 'repeatPurchaseRate', label: 'Repeat Purchase Rate' },
    { value: 'averageOrderValue', label: 'Average Order Value' },
  ];

  const breakdownOptions = [
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'daily', label: 'Daily' },
  ];

  const DropdownButton = ({ 
    label, 
    color, 
    isOpen, 
    setIsOpen, 
    options, 
    onChange 
  }) => (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
          color === 'blue' 
            ? 'text-blue-600 hover:bg-blue-50' 
            : 'text-orange-600 hover:bg-orange-50'
        }`}
      >
        {/* Color dot */}
        <div className={`w-3 h-3 rounded-full ${
          color === 'blue' ? 'bg-blue-500' : 'bg-orange-500'
        }`}></div>
        <span>{label}</span>
        <ChevronDown size={14} className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute left-0 mt-1 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-20">
            <div className="py-1">
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onChange?.(option.value);
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="flex items-center justify-between mb-4">
      {/* Left side - Title and KPI selectors */}
      <div className="flex items-center space-x-6">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        
        <div className="flex items-center space-x-1">
          <DropdownButton
            label={kpi1Label}
            color={kpi1Color}
            isOpen={kpi1Open}
            setIsOpen={setKpi1Open}
            options={kpiOptions}
            onChange={onKPI1Change}
          />
          
          <span className="text-gray-400 font-medium">and</span>
          
          <DropdownButton
            label={kpi2Label}
            color={kpi2Color}
            isOpen={kpi2Open}
            setIsOpen={setKpi2Open}
            options={kpiOptions}
            onChange={onKPI2Change}
          />
          
          <span className="text-gray-500 text-sm">Over Time</span>
        </div>
      </div>

      {/* Right side - Breakdown selector */}
      {showBreakdown && (
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Date Breakdown</span>
          <div className="relative">
            <button
              onClick={() => setBreakdownOpen(!breakdownOpen)}
              className="flex items-center space-x-2 px-3 py-1 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
            >
              <span>Weekly</span>
              <ChevronDown size={14} className={`transform transition-transform ${breakdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {breakdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setBreakdownOpen(false)}
                ></div>
                <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                  <div className="py-1">
                    {breakdownOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          onBreakdownChange?.(option.value);
                          setBreakdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChartHeader;