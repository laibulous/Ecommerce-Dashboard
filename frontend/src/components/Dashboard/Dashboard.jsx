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
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <DashboardHeader />
      <KPICards />
      
      {/* MAIN ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Revenue takes full width on mobile, 2/3 on desktop */}
        <div className="lg:col-span-2">
          <RevenueLineChart />
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
