import React from 'react';
import { useSelector } from 'react-redux';

const KPICards = () => {
  const { kpis, loading } = useSelector((state) => state.dashboard);

  const kpiData = [
    {
      title: 'Ecommerce Revenue',
      value: kpis?.ecommerceRevenue || 268277,
      change: '+10.52%',
      changeType: 'positive',
      color: 'blue'
    },
    {
      title: 'New Customers',
      value: kpis?.newCustomers || 198,
      change: '+12.66%',
      changeType: 'positive',
      color: 'green'
    },
    {
      title: 'Repeat Purchase Rate',
      value: `${kpis?.repeatPurchaseRate || 67.54}%`,
      change: '+11.32% (+3.68%)',
      changeType: 'positive',
      color: 'purple'
    },
    {
      title: 'Average Order Value',
      value: `$${kpis?.averageOrderValue || 402}`,
      change: '+12.10% (+$5.36)',
      changeType: 'negative',
      color: 'orange'
    },
    {
      title: 'Ecommerce Conversion Rate',
      value: `${kpis?.ecommerceConversionRate || 1.27}%`,
      change: '+0.99% (+0.01%)',
      changeType: 'positive',
      color: 'red'
    }
  ];

  const formatValue = (value) => {
    if (typeof value === 'number') {
      return value.toLocaleString();
    }
    return value;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
      {kpiData.map((kpi, index) => (
        <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
         {/* Title */}
          <div className="mb-2">
            <p className="text-sm font-medium text-gray-700">{kpi.title}</p>
            <p className="text-xs text-gray-500">{kpi.subtitle}</p>
          </div>
          {/* Main value */}
          <div className="mb-1">
            <h3 className="text-2xl font-bold text-gray-900">
              {loading.kpis ? (
                <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
              ) : (
                formatValue(kpi.value)
              )}
            </h3>
          </div>
         
          
          {/* Change indicator */}
          <div className="flex items-center">
            <span 
              className={`inline-flex items-center text-xs font-medium ${
                kpi.changeType === 'positive' 
                  ? 'text-green-600' 
                  : 'text-red-600'
              }`}
            >
              {kpi.changeType === 'positive' ? '▲' : '▼'}
              <span className="ml-1">{kpi.change}</span>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KPICards;