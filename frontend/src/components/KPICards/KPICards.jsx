import React from 'react';
import { useSelector } from 'react-redux';
import { TrendingUp, Users, RotateCcw, DollarSign, Target } from 'lucide-react';
import KPICard from './KPICard';

const KPICards = () => {
  const { kpis, loading, error } = useSelector((state) => state.dashboard);

  const kpiConfig = [
    {
      title: 'Ecommerce Revenue',
      value: kpis?.ecommerceRevenue || 0,
      prefix: '$',
      suffix: '',
      format: 'currency',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: 'Total revenue generated',
    },
    {
      title: 'New Customers',
      value: kpis?.newCustomers || 0,
      prefix: '',
      suffix: '',
      format: 'number',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'New customer acquisitions',
    },
    {
      title: 'Repeat Purchase Rate',
      value: kpis?.repeatPurchaseRate || 0,
      prefix: '',
      suffix: '%',
      format: 'percentage',
      icon: RotateCcw,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: 'Customer retention rate',
    },
    {
      title: 'Average Order Value',
      value: kpis?.averageOrderValue || 0,
      prefix: '$',
      suffix: '',
      format: 'currency',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      description: 'Average value per order',
    },
    {
      title: 'Conversion Rate',
      value: kpis?.ecommerceConversionRate || 0,
      prefix: '',
      suffix: '%',
      format: 'percentage',
      icon: Target,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      description: 'Ecommerce conversion rate',
    },
  ];

  if (loading.kpis) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="kpi-card animate-pulse">
            <div className="flex items-center justify-between mb-4">
              <div className="w-8 h-8 bg-gray-200 rounded loading-shimmer"></div>
              <div className="w-4 h-4 bg-gray-200 rounded loading-shimmer"></div>
            </div>
            <div className="space-y-2">
              <div className="w-20 h-8 bg-gray-200 rounded loading-shimmer"></div>
              <div className="w-full h-4 bg-gray-200 rounded loading-shimmer"></div>
              <div className="w-3/4 h-3 bg-gray-200 rounded loading-shimmer"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error.kpis) {
    return (
      <div className="mb-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          <p className="font-medium">Error loading KPIs</p>
          <p className="text-sm">{error.kpis}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      {kpiConfig.map((kpi, index) => (
        <KPICard key={index} {...kpi} />
      ))}
    </div>
  );
};

export default KPICards;