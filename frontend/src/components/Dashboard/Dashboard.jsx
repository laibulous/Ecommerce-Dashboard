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
import RevenueChart from '../Charts/RevenueChart';
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

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
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
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  // Refetch data when filters change
  useEffect(() => {
    const filterParams = {};
    
    if (filters.dateRange.startDate && filters.dateRange.endDate) {
      filterParams.startDate = filters.dateRange.startDate;
      filterParams.endDate = filters.dateRange.endDate;
    }

    // Only refetch if we have filter changes
    if (Object.keys(filterParams).length > 0) {
      dispatch(fetchKPIs(filterParams));
      dispatch(fetchRevenue(filterParams));
      dispatch(fetchProducts(filterParams));
      dispatch(fetchMarketing(filterParams));
      dispatch(fetchStates(filterParams));
      dispatch(fetchDevices(filterParams));
    }
  }, [dispatch, filters.dateRange]);

  const isInitialLoading = Object.values(loading).every(load => load === true);

  if (isInitialLoading) {
    return (
      <div className="min-h-screen bg-dashboard-bg flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dashboard-bg">
      {/* Header */}
      <DashboardHeader />
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Cards */}
        <KPICards />

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Chart - Full Width */}
          <div className="lg:col-span-2">
            <RevenueChart />
          </div>

          {/* Product Performance */}
          <ProductChart />

          {/* Marketing Channels */}
          <MarketingChart />

          {/* Device Performance */}
          <DeviceChart />

          {/* State Map */}
          <StateMap />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;