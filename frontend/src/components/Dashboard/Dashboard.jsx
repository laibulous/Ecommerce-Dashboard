import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchKPIs, 
  fetchRevenue, 
  fetchProducts, 
  fetchMarketing, 
  fetchStates,
  fetchDevices 
} from '../../store/slices/dashboardSlice';
import KPICards from '../KPICards/KPICards';
import RevenueLineChart from '../Charts/RevenueLineChart';
import ProductChart from '../Charts/ProductChart';
import MarketingChart from '../Charts/MarketingChart';
import DeviceChart from '../Charts/DeviceChart';
import StateMap from '../Charts/StateMap';
import DashboardHeader from './DashboardHeader';
import LoadingSpinner from '../UI/LoadingSpinner';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.dashboard);
  const filters = useSelector((state) => state.filters);

  // Fetch initial data on component mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        await Promise.all([
          dispatch(fetchKPIs()),
          dispatch(fetchRevenue()),
          dispatch(fetchProducts()),
          dispatch(fetchMarketing()),
          dispatch(fetchStates()),
          dispatch(fetchDevices()),
        ]);
      } catch (error) {
        console.error('Error fetching initial dashboard data:', error);
      }
    };

    fetchInitialData();
  }, [dispatch]);

  // Refetch data when ANY filter changes
  useEffect(() => {
    const buildFilterParams = () => {
      const params = {};
      
      // Date range filter
      if (filters.dateRange.startDate && filters.dateRange.endDate) {
        params.startDate = filters.dateRange.startDate;
        params.endDate = filters.dateRange.endDate;
      }

      // Selected KPI filter
      if (filters.selectedKPI) {
        params.kpi = filters.selectedKPI;
      }

      // Breakdown filters for each category
      if (filters.breakdown) {
        params.breakdown = filters.breakdown;
      }

      // Sort parameters
      if (filters.sortBy) {
        params.sortBy = filters.sortBy;
      }

      if (filters.sortOrder) {
        params.sortOrder = filters.sortOrder;
      }

      return params;
    };

    const params = buildFilterParams();
    
    // Only refetch if we have meaningful filter changes
    // (Skip the initial empty state)
    const hasFilters = Object.keys(params).length > 0;
    
    if (hasFilters) {
      console.log('🔄 Filters changed, refetching data with params:', params);
      
      // Fetch all data with new filter parameters
      dispatch(fetchKPIs(params));
      dispatch(fetchRevenue(params));
      dispatch(fetchProducts(params));
      dispatch(fetchMarketing(params));
      dispatch(fetchStates(params));
      dispatch(fetchDevices(params));
    }
  }, [
    dispatch, 
    filters.dateRange,
    filters.selectedKPI,
    filters.breakdown,
    filters.sortBy,
    filters.sortOrder
  ]); // ✅ Watch ALL filter changes

  // Handle breakdown change for revenue chart
  const handleRevenueBreakdownChange = (value) => {
    dispatch(setBreakdown({ category: 'revenue', value }));
  };

  const isInitialLoading = Object.values(loading).every(load => load === true);

  if (isInitialLoading) {
    return (
      <div className="min-h-screen bg-dashboard-bg flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <DashboardHeader />
      <KPICards />
      
      {/* MAIN ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Revenue takes full width on mobile, 2/3 on desktop */}
        <div className="lg:col-span-2">
          <RevenueLineChart onBreakdownChange={handleRevenueBreakdownChange} />
        </div>
        {/* Product Chart takes full width on mobile, 1/3 on desktop */}
        <div className="lg:col-span-1">
          <ProductChart />
        </div>
      </div>
      
      {/* BOTTOM ROW */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MarketingChart />
        <StateMap />
        <DeviceChart />
      </div>
    </div>
  );
};

export default Dashboard;