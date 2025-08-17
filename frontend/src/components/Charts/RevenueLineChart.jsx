import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ChevronDown } from 'lucide-react';

const RevenueLineChart = () => {
  const { revenue, loading } = useSelector((state) => state.dashboard);
  const [kpi1Open, setKpi1Open] = useState(false);
  const [kpi2Open, setKpi2Open] = useState(false);
  const [selectedKpi1, setSelectedKpi1] = useState("KPI1");
  const [selectedKpi2, setSelectedKpi2] = useState("KPI2");
  const [selectedBreakdown, setSelectedBreakdown] = useState("weekly"); // default
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
      <h1 className="text-gray-700 font-medium">
        {selectedKpi1} and {selectedKpi2} Over Time
      </h1>
      {/* Chart Header with Integrated Dropdowns */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">

  {/* Right side - KPI dropdowns + Breakdown */}
  <div className="flex flex-wrap items-center gap-3">
    {/* KPI1 */}
    <DropdownButton
      label={selectedKpi1}
      color="blue"
      isOpen={kpi1Open}
      setIsOpen={setKpi1Open}
      options={kpiOptions}
      onChange={(value) => setSelectedKpi1(value)}
    />

    {/* KPI2 */}
    <DropdownButton
      label={selectedKpi2}
      color="orange"
      isOpen={kpi2Open}
      setIsOpen={setKpi2Open}
      options={kpiOptions}
      onChange={(value) => setSelectedKpi2(value)}
    />

    {/* Date Breakdown */}
<div className="flex items-center space-x-2 self-start md:self-auto">
  <span className="text-sm text-gray-500">Date Breakdown</span>
  <div className="relative">
    <button
      onClick={() => setBreakdownOpen(!breakdownOpen)}
      className="flex items-center space-x-2 px-3 py-1 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
    >
      <span>
        {breakdownOptions.find((opt) => opt.value === selectedBreakdown)?.label}
      </span>
      <ChevronDown
        size={14}
        className={`transform transition-transform ${
          breakdownOpen ? "rotate-180" : ""
        }`}
      />
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
                  setSelectedBreakdown(option.value); // ✅ update selected value
                  setBreakdownOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  option.value === selectedBreakdown
                    ? "bg-gray-100 font-medium"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
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