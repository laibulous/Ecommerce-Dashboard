import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronDown } from 'lucide-react';
import { setBreakdown, setSortBy, setSortOrder } from '../../store/slices/filtersSlice';

const BreakdownFilter = ({ category, title }) => {
  const dispatch = useDispatch();
  const { breakdown, sortBy, sortOrder } = useSelector((state) => state.filters);
  const [isOpen, setIsOpen] = useState(false);

  const breakdownOptions = [
    { value: 'revenue', label: 'Revenue', icon: '💰' },
    { value: 'conversionRate', label: 'Conversion Rate', icon: '📈' },
  ];

  const sortOptions = [
    { value: 'asc', label: 'Ascending', icon: '↑' },
    { value: 'desc', label: 'Descending', icon: '↓' },
  ];

  const currentBreakdown = breakdown[category] || 'revenue';
  const currentSortBy = sortBy[category] || 'revenue';
  const currentSortOrder = sortOrder[category] || 'desc';

  const handleBreakdownChange = (value) => {
    dispatch(setBreakdown({ category, value }));
    dispatch(setSortBy({ category, value }));
  };

  const handleSortOrderChange = (value) => {
    dispatch(setSortOrder({ category, value }));
  };

  const getDisplayText = () => {
    const breakdownLabel = breakdownOptions.find(opt => opt.value === currentBreakdown)?.label || 'Revenue';
    const sortIcon = currentSortOrder === 'desc' ? '↓' : '↑';
    return `${breakdownLabel} ${sortIcon}`;
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-dashboard-text-secondary hover:text-dashboard-text-primary border border-dashboard-border rounded-md hover:bg-gray-50 transition-colors duration-200 min-w-[160px] justify-between"
      >
        <span className="truncate">{getDisplayText()}</span>
        <ChevronDown size={16} className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute right-0 mt-1 w-56 bg-white border border-dashboard-border rounded-md shadow-lg z-20">
            <div className="py-2">
              {/* Breakdown Options */}
              <div className="px-3 py-1">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sort By
                </p>
              </div>
              {breakdownOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleBreakdownChange(option.value)}
                  className={`flex items-center space-x-3 w-full text-left px-4 py-2 text-sm transition-colors duration-200 ${
                    currentBreakdown === option.value
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-dashboard-text-secondary hover:text-dashboard-text-primary hover:bg-gray-50'
                  }`}
                >
                  <span>{option.icon}</span>
                  <span>{option.label}</span>
                  {currentBreakdown === option.value && (
                    <span className="ml-auto text-blue-500">✓</span>
                  )}
                </button>
              ))}

              {/* Sort Order */}
              <div className="border-t border-gray-100 mt-2 pt-2">
                <div className="px-3 py-1">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order
                  </p>
                </div>
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSortOrderChange(option.value)}
                    className={`flex items-center space-x-3 w-full text-left px-4 py-2 text-sm transition-colors duration-200 ${
                      currentSortOrder === option.value
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-dashboard-text-secondary hover:text-dashboard-text-primary hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-lg">{option.icon}</span>
                    <span>{option.label}</span>
                    {currentSortOrder === option.value && (
                      <span className="ml-auto text-blue-500">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BreakdownFilter;