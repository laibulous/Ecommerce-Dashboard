import React from 'react';

const DashboardHeader = () => {
  return (
    <div className="flex items-center justify-between mb-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      {/* Left side - Logo and title */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          {/* PenPath Logo */}
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </div>
          <span className="text-lg font-semibold text-gray-800">PenPath</span>
        </div>
        
        <div className="h-6 w-px bg-gray-300"></div>
        
        <h1 className="text-lg font-medium text-gray-600">
          Ecommerce Performance Overview
        </h1>
      </div>

      {/* Right side - Date inputs and button */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="flex flex-col">
            <label className="text-xs text-gray-500 mb-1">Start Date</label>
            <input
              type="date"
              defaultValue="2020-02-01"
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xs text-gray-500 mb-1">End Date</label>
            <input
              type="date"
              defaultValue="2020-08-31"
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xs text-gray-500 mb-1">Comparison Period</label>
            <select className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="previous-year">Previous Year</option>
              <option value="previous-quarter">Previous Quarter</option>
              <option value="previous-month">Previous Month</option>
            </select>
          </div>
        </div>
        
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
          View All Dashboards
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;