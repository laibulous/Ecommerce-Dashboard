import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronDown } from 'lucide-react';
import { setDateRange } from '../../store/slices/filtersSlice';
import { formatDate } from '../../utils/formatters';

const DateRangePicker = () => {
  const dispatch = useDispatch();
  const { dateRange } = useSelector((state) => state.filters);
  const [isOpen, setIsOpen] = useState(false);

  const presetRanges = [
    {
      label: 'Last 7 days',
      value: 'last7days',
      startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      endDate: new Date(),
    },
    {
      label: 'Last 30 days',
      value: 'last30days',
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      endDate: new Date(),
    },
    {
      label: 'Last 90 days',
      value: 'last90days',
      startDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
      endDate: new Date(),
    },
    {
      label: 'This month',
      value: 'thismonth',
      startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      endDate: new Date(),
    },
    {
      label: 'Last month',
      value: 'lastmonth',
      startDate: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
      endDate: new Date(new Date().getFullYear(), new Date().getMonth(), 0),
    },
  ];

  const handleRangeSelect = (range) => {
    dispatch(setDateRange({
      startDate: range.startDate.toISOString(),
      endDate: range.endDate.toISOString(),
    }));
    setIsOpen(false);
  };

  const handleClear = () => {
    dispatch(setDateRange({ startDate: null, endDate: null }));
    setIsOpen(false);
  };

  const getDisplayText = () => {
    if (dateRange.startDate && dateRange.endDate) {
      return `${formatDate(dateRange.startDate, 'short')} - ${formatDate(dateRange.endDate, 'short')}`;
    }
    return 'Select date range';
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-dashboard-text-secondary hover:text-dashboard-text-primary border border-dashboard-border rounded-md hover:bg-gray-50 transition-colors duration-200 min-w-[180px] justify-between"
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
          <div className="absolute right-0 mt-1 w-48 bg-white border border-dashboard-border rounded-md shadow-lg z-20">
            <div className="py-1">
              {presetRanges.map((range) => (
                <button
                  key={range.value}
                  onClick={() => handleRangeSelect(range)}
                  className="block w-full text-left px-4 py-2 text-sm text-dashboard-text-secondary hover:text-dashboard-text-primary hover:bg-gray-50 transition-colors duration-200"
                >
                  {range.label}
                </button>
              ))}
              
              {dateRange.startDate && (
                <>
                  <div className="border-t border-dashboard-border my-1"></div>
                  <button
                    onClick={handleClear}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors duration-200"
                  >
                    Clear selection
                  </button>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DateRangePicker;