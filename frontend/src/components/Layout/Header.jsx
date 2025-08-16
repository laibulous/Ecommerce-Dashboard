import React from 'react';
import { useDispatch } from 'react-redux';
import { RotateCcw } from 'lucide-react';
import DateRangePicker from './DateRangePicker';
import KPISelector from './KPISelector';
import BreakdownFilter from './BreakdownFilter';
import { resetFilters } from '../../store/slices/filtersSlice';

const FilterBar = () => {
  const dispatch = useDispatch();

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-dashboard-border shadow-sm mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Left side - Main filters */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center gap-3">
            <DateRangePicker />
            <KPISelector />
          </div>
          
          {/* Breakdown filters */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-dashboard-text-secondary whitespace-nowrap">
              Sort by:
            </span>
            <div className="flex gap-2">
              <BreakdownFilter category="products" title="Products" />
              <BreakdownFilter category="marketing" title="Marketing" />
            </div>
          </div>
        </div>

        {/* Right side - Reset button */}
        <button
          onClick={handleResetFilters}
          className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-dashboard-text-secondary hover:text-dashboard-text-primary border border-dashboard-border rounded-md hover:bg-gray-50 transition-colors duration-200 self-start lg:self-auto"
        >
          <RotateCcw size={16} />
          <span>Reset</span>
        </button>
      </div>
      
      {/* Filter summary */}
      <div className="mt-3 pt-3 border-t border-gray-100">
        <div className="flex items-center text-xs text-dashboard-text-secondary">
          <span>Active filters will update all charts in real-time</span>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;