import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchKPIs,
  fetchRevenue,
  fetchProducts,
  fetchMarketing,
  fetchStates,
  fetchDevices,
} from '../store/slices/dashboardSlice';

export const useDashboardData = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  const dashboardData = useSelector((state) => state.dashboard);

  // Helper function to build API params from filters
  const buildApiParams = (additionalParams = {}) => {
    const params = {
      ...additionalParams,
    };

    // Add date range if selected
    if (filters.dateRange.startDate && filters.dateRange.endDate) {
      params.startDate = filters.dateRange.startDate;
      params.endDate = filters.dateRange.endDate;
    }

    return params;
  };

  // Fetch all data when filters change
  const fetchAllData = () => {
    const baseParams = buildApiParams();

    // Fetch KPIs
    dispatch(fetchKPIs(baseParams));

    // Fetch revenue over time
    dispatch(fetchRevenue(baseParams));

    // Fetch products with breakdown and sorting
    dispatch(fetchProducts({
      ...baseParams,
      sortBy: filters.sortBy.products,
      sortOrder: filters.sortOrder.products,
    }));

    // Fetch marketing channels
    dispatch(fetchMarketing({
      ...baseParams,
      sortBy: filters.sortBy.marketing,
      sortOrder: filters.sortOrder.marketing,
    }));

    // Fetch state performance
    dispatch(fetchStates({
      ...baseParams,
      sortBy: filters.sortBy.states,
      sortOrder: filters.sortOrder.states,
    }));

    // Fetch device performance
    dispatch(fetchDevices({
      ...baseParams,
      sortBy: filters.sortBy.devices,
      sortOrder: filters.sortOrder.devices,
    }));
  };

  // Initial data fetch
  useEffect(() => {
    fetchAllData();
  }, []); // Load once on component mount

  // Re-fetch when filters change
  useEffect(() => {
    fetchAllData();
  }, [
    filters.dateRange.startDate,
    filters.dateRange.endDate,
    filters.breakdown.products,
    filters.breakdown.marketing,
    filters.breakdown.states,
    filters.breakdown.devices,
    filters.sortBy.products,
    filters.sortBy.marketing,
    filters.sortBy.states,
    filters.sortBy.devices,
    filters.sortOrder.products,
    filters.sortOrder.marketing,
    filters.sortOrder.states,
    filters.sortOrder.devices,
  ]);

  return {
    ...dashboardData,
    filters,
    isLoading: Object.values(dashboardData.loading).some(loading => loading),
    hasError: Object.values(dashboardData.error).some(error => error !== null),
  };
};