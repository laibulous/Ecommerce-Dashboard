import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronDown } from 'lucide-react';
import { setSelectedKPI } from '../../store/slices/filtersSlice';

const KPISelector = () => {
  const dispatch = useDispatch();
  const { selectedKPI } = useSelector((state) => state.filters);
  const [isOpen, setIsOpen] = useState(false);

  const kpiOptions = [
    { value: 'ecommerceRevenue', label: 'Ecommerce Revenue', icon: '💰' },
    { value: 'newCustomers', label: 'New Customers', icon: '👥' },
    { value: 'repeatPurchaseRate', label: 'Repeat Purchase Rate', icon: '🔄' },
    { value: 'averageOrderValue', label: 'Average Order Value', icon: '📊' },
    { value: 'ecommerceConversionRate', label: 'Conversion Rate', icon: '🎯' },
  ];

  const handleKPISelect = (kpi) => {
    dispatch(setSelectedKPI(kpi.value));
    setIsOpen(false);
  };

  const selectedKPILabel = kpiOptions.find(kpi => kpi.value === selectedKPI)?.label || 'Select KPI';
  const selectedKPIIcon = kpiOptions.find(kpi => kpi.value === selectedKPI)?.icon || '📈';

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-dashboard-text-secondary hover:text-dashboard-text-primary border border-dashboard-border rounded-md hover:bg-gray-50 transition-colors duration-200 min-w-[200px] justify-between"
      >
        <div className="flex items-center space-x-2">
          <span>{selectedKPIIcon}</span>
          <span className="truncate">{selectedKPILabel}</span>
        </div>
        <ChevronDown size={16} className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute right-0 mt-1 w-64 bg-white border border-dashboard-border rounded-md shadow-lg z-20">
            <div className="py-1">
              {kpiOptions.map((kpi) => (
                <button
                  key={kpi.value}
                  onClick={() => handleKPISelect(kpi)}
                  className={`flex items-center space-x-3 w-full text-left px-4 py-3 text-sm transition-colors duration-200 ${
                    selectedKPI === kpi.value
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500'
                      : 'text-dashboard-text-secondary hover:text-dashboard-text-primary hover:bg-gray-50'
                  }`}
                >
                  <span className="text-lg">{kpi.icon}</span>
                  <span>{kpi.label}</span>
                  {selectedKPI === kpi.value && (
                    <span className="ml-auto text-blue-500">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default KPISelector;