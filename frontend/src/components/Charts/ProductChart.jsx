import React from 'react';
import { useSelector } from 'react-redux';
import { formatCurrency } from '../../utils/formatters';

const ProductChart = () => {
  const { products, loading, error } = useSelector((state) => state.dashboard);

  // Sort products by revenue (descending)
  const sortedProducts = React.useMemo(() => {
    if (!products || !Array.isArray(products)) return [];
    
    return [...products].sort((a, b) => b.revenue - a.revenue);
  }, [products]);

  // Find max revenue for scaling
  const maxRevenue = Math.max(...(sortedProducts.map(p => p.revenue) || [0]));

  if (loading.products) {
    return (
      <div className="chart-container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-dashboard-text-primary">
            Ecommerce Revenue and Ecommerce Conversion Rate by Product
          </h2>
        </div>
        <div className="h-80 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
        </div>
      </div>
    );
  }

  if (error.products) {
    return (
      <div className="chart-container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-dashboard-text-primary">
            Ecommerce Revenue and Ecommerce Conversion Rate by Product
          </h2>
        </div>
        <div className="h-80 flex items-center justify-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            <p className="font-medium">Error loading product data</p>
            <p className="text-sm">{error.products}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="chart-container">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-dashboard-text-primary">
          Ecommerce Revenue and Ecommerce Conversion Rate by Product
        </h2>
        <div className="flex items-center space-x-4 text-sm text-dashboard-text-secondary">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-slate-700 rounded-full"></div>
            <span>Revenue</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span>Conversion Rate</span>
          </div>
        </div>
      </div>

      <div className="h-80 p-4">
        <div className="space-y-3">
          {sortedProducts.map((product, index) => {
            const revenueWidth = (product.revenue / maxRevenue) * 100;
            const conversionWidth = (product.conversionRate / 2) * 100; // Scale conversion rate (assuming max ~2%)
            
            return (
              <div key={product.product} className="space-y-0.5">
                <div className="text-xs font-medium text-gray-600 mb-1">
                  {product.product}
                </div>
                
                {/* Revenue Bar */}
                <div className="relative mb-0.5">
                  <div 
                    className="h-3 bg-slate-700 rounded-sm"
                    style={{ width: `${revenueWidth}%` }}
                  />
                  <span className="absolute top-0 text-xs font-medium text-gray-700 ml-1" 
                        style={{ left: `${revenueWidth}%` }}>
                    {formatCurrency(product.revenue, false)}
                  </span>
                </div>
                
                {/* Conversion Rate Bar */}
                <div className="relative">
                  <div 
                    className="h-3 bg-orange-500 rounded-sm"
                    style={{ width: `${conversionWidth}%` }}
                  />
                  <span className="absolute top-0 text-xs font-medium text-orange-600 ml-1" 
                        style={{ left: `${conversionWidth}%` }}>
                    {product.conversionRate}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductChart;