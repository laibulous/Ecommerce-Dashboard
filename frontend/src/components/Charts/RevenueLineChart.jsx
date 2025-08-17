import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ChevronDown } from 'lucide-react';

const RevenueLineChart = () => {
  const { revenue, loading } = useSelector((state) => state.dashboard);
  const [kpi1Open, setKpi1Open] = useState(false);
  const [kpi2Open, setKpi2Open] = useState(false);
  const [breakdownOpen, setBreakdownOpen] = useState(false);
  
  // Transform data for the chart
  const chartData = revenue?.map(item => ({
    ...item,
    // Format date for display (Feb 1, Mar 1, etc.)
    dateFormatted: new Date(item.date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    }),
    // Convert revenue to thousands
    revenueK: item.revenue / 1000,
    // Conversion rate as decimal for right axis
    conversionRateDecimal: item.conversionRate
  })) || [];

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
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
          <div className="absolute left-0 mt-1 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-20">
            <div className="py-1">
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onChange?.(option.value);
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
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

  // Custom tick formatter for left Y-axis (Revenue)
  const formatRevenueAxis = (value) => `${value}K`;
  
  // Custom tick formatter for right Y-axis (Conversion Rate)  
  const formatConversionAxis = (value) => value.toFixed(2);

  if (loading.revenue) {
    return (
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div className="h-8 bg-gray-200 rounded mb-4 animate-pulse"></div>
        <div className="h-80 bg-gray-100 rounded animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      {/* Chart Header with Integrated Dropdowns */}
      <div className="flex items-center justify-between mb-6">
        {/* Left side - Title and KPI selectors */}
        <div className="flex items-center space-x-6">
          <h3 className="text-lg font-medium text-gray-900">Ecommerce Revenue</h3>
          
          <div className="flex items-center space-x-1">
            <DropdownButton
              label="Ecommerce Revenue"
              color="blue"
              isOpen={kpi1Open}
              setIsOpen={setKpi1Open}
              options={kpiOptions}
              onChange={(value) => console.log('KPI1 changed:', value)}
            />
            
            <span className="text-gray-400 font-medium">and</span>
            
            <DropdownButton
              label="Ecommerce Conversion Rate"
              color="orange"
              isOpen={kpi2Open}
              setIsOpen={setKpi2Open}
              options={kpiOptions}
              onChange={(value) => console.log('KPI2 changed:', value)}
            />
            
            <span className="text-gray-500 text-sm">Over Time</span>
          </div>
        </div>

        {/* Right side - Breakdown selector */}
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
                <div className="fixed inset-0 z-10" onClick={() => setBreakdownOpen(false)}></div>
                <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                  <div className="py-1">
                    {breakdownOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          console.log('Breakdown changed:', option.value);
                          setBreakdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
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
      </div>

      {/* Dual-Axis Line Chart */}
      <div style={{ width: '100%', height: 320 }}>
        <ResponsiveContainer>
          <LineChart data={chartData} margin={{ top: 20, right: 60, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            
            {/* X-axis */}
            <XAxis 
              dataKey="dateFormatted" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
            />
            
            {/* Left Y-axis for Revenue */}
            <YAxis 
              yAxisId="revenue"
              orientation="left"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              tickFormatter={formatRevenueAxis}
              domain={[0, 'dataMax']}
            />
            
            {/* Right Y-axis for Conversion Rate */}
            <YAxis 
              yAxisId="conversion"
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              tickFormatter={formatConversionAxis}
              domain={[0, 'dataMax']}
            />
            
            {/* Revenue Line (Blue) */}
            <Line
              yAxisId="revenue"
              type="monotone"
              dataKey="revenueK"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
            />
            
            {/* Conversion Rate Line (Orange) */}
            <Line
              yAxisId="conversion"
              type="monotone"
              dataKey="conversionRateDecimal"
              stroke="#f97316"
              strokeWidth={3}
              dot={{ fill: '#f97316', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#f97316', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueLineChart;