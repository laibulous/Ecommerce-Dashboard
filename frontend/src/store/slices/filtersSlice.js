import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dateRange: {
    startDate: null,
    endDate: null,
  },
  selectedKPI: 'ecommerceRevenue',
  breakdown: {
    revenue: 'weekly',     // ✅ Add revenue breakdown
    products: 'revenue',
    marketing: 'revenue',
    states: 'revenue',
    devices: 'revenue',
  },
  sortBy: {
    products: 'revenue',
    marketing: 'revenue',
    states: 'revenue',
    devices: 'revenue',
  },
  sortOrder: {
    products: 'desc',
    marketing: 'desc',
    states: 'desc',
    devices: 'desc',
  },
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setDateRange: (state, action) => {
      state.dateRange = action.payload;
      console.log('📅 Date range updated:', action.payload);
    },
    setSelectedKPI: (state, action) => {
      state.selectedKPI = action.payload;
      console.log('📊 KPI selected:', action.payload);
    },
    setBreakdown: (state, action) => {
      const { category, value } = action.payload;
      state.breakdown[category] = value;
      console.log(`📈 Breakdown updated for ${category}:`, value);
    },
    setSortBy: (state, action) => {
      const { category, value } = action.payload;
      state.sortBy[category] = value;
      console.log(`🔄 Sort by updated for ${category}:`, value);
    },
    setSortOrder: (state, action) => {
      const { category, value } = action.payload;
      state.sortOrder[category] = value;
      console.log(`↕️ Sort order updated for ${category}:`, value);
    },
    resetFilters: (state) => {
      console.log('🔄 Filters reset to initial state');
      return initialState;
    },
  },
});

export const {
  setDateRange,
  setSelectedKPI,
  setBreakdown,
  setSortBy,
  setSortOrder,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;