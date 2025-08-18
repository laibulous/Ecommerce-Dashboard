import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ChevronDown } from 'lucide-react';
import { setBreakdown } from '../../store/slices/filtersSlice';

const RevenueLineChart = () => {
  const dispatch = useDispatch();
  const { revenue, loading } = useSelector((state) => state.dashboard);
  const { breakdown } = useSelector((state) => state.filters);
  
  // Local UI state for dropdowns
  const [kpi1Open, setKpi1Open] = useState(false);
  const [kpi2Open, setKpi2Open] = useState(false);
  const [breakdownOpen, setBreakdownOpen] = useState(false);
  
  // Chart configuration state (these control what's displayed)
  const [selectedKpi1, setSelectedKpi1] = useState("ecommerceRevenue");
  const [selectedKpi2, setSelectedKpi2] = useState("ecommerceConversionRate");
  
  // Get current breakdown for revenue chart from Redux
  const selectedBreakdown = breakdown.revenue || 'weekly';
  
  // Transform data for the chart based on selected KPIs
  const chartData = revenue?.map(item => {
    const baseData = {
      ...item,
      dateFormatted: new Date(item.date).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      }),
    };

    // Add data for selected KPIs
    if (selectedKpi1 === 'ecommerceRevenue') {
      baseData.kpi1Value = item.revenue / 1000; // Convert to K
    } else if (selectedKpi1 === 'ecommerceConversionRate') {
      baseData.kpi1Value = item.conversionRate;
    }
    // Add more KPI mappings as needed

    if (selectedKpi2 === 'ecommerceRevenue') {
      baseData.kpi2Value = item.revenue / 1000;
    } else if (selectedKpi2 === 'ecommerceConversionRate') {
      baseData.kpi2Value = item.conversionRate;
    }
    // Add more KPI mappings as needed

    return baseData;
  }) || [];

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

  // Handle breakdown change - update Redux state
  const handleBreakdownChange = (value) => {
    dispatch(setBreakdown({ category: 'revenue', value }));
  };

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

  // Get display labels for current selections
  const kpi1Label = kpiOptions.find(opt => opt.value === selectedKpi1)?.label || selectedKpi1;
  const kpi2Label = kpiOptions.find(opt => opt.value === selectedKpi2)?.label || selectedKpi2;

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
      <h1 className="text-gray-700 font-medium mb-4">
        {kpi1Label} and {kpi2Label} Over Time
      </h1>
      
      {/* Chart Header with Integrated Dropdowns */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        {/* Right side - KPI dropdowns + Breakdown */}
        <div className="flex flex-wrap items-center gap-3">
          {/* KPI1 */}
          <DropdownButton
            label={kpi1Label}
            color="blue"
            isOpen={kpi1Open}
            setIsOpen={setKpi1Open}
            options={kpiOptions}
            onChange={setSelectedKpi1}
          />

          {/* KPI2 */}
          <DropdownButton
            label={kpi2Label}
            color="orange"
            isOpen={kpi2Open}
            setIsOpen={setKpi2Open}
            options={kpiOptions}
            onChange={setSelectedKpi2}
          />

          {/* Date Breakdown - Now connected to Redux */}
          <div className="flex items-center space-x-2">
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
                            handleBreakdownChange(option.value); // ✅ Now updates Redux
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
            
            {/* Left Y-axis for KPI1 */}
            <YAxis 
              yAxisId="kpi1"
              orientation="left"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              domain={[0, 'dataMax']}
            />
            
            {/* Right Y-axis for KPI2 */}
            <YAxis 
              yAxisId="kpi2"
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              domain={[0, 'dataMax']}
            />
            
            {/* KPI1 Line (Blue) */}
            <Line
              yAxisId="kpi1"
              type="monotone"
              dataKey="kpi1Value"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
            />
            
            {/* KPI2 Line (Orange) */}
            <Line
              yAxisId="kpi2"
              type="monotone"
              dataKey="kpi2Value"
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