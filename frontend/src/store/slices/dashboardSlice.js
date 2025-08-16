import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { dashboardAPI } from '../../services/api';

// Async thunks
export const fetchKPIs = createAsyncThunk(
  'dashboard/fetchKPIs',
  async (params, { rejectWithValue }) => {
    try {
      const response = await dashboardAPI.getKPIs(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch KPIs');
    }
  }
);

export const fetchRevenue = createAsyncThunk(
  'dashboard/fetchRevenue',
  async (params, { rejectWithValue }) => {
    try {
      const response = await dashboardAPI.getRevenue(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch revenue');
    }
  }
);

export const fetchProducts = createAsyncThunk(
  'dashboard/fetchProducts',
  async (params, { rejectWithValue }) => {
    try {
      const response = await dashboardAPI.getProducts(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
    }
  }
);

export const fetchMarketing = createAsyncThunk(
  'dashboard/fetchMarketing',
  async (params, { rejectWithValue }) => {
    try {
      const response = await dashboardAPI.getMarketing(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch marketing');
    }
  }
);

export const fetchStates = createAsyncThunk(
  'dashboard/fetchStates',
  async (params, { rejectWithValue }) => {
    try {
      const response = await dashboardAPI.getStates(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch states');
    }
  }
);

export const fetchDevices = createAsyncThunk(
  'dashboard/fetchDevices',
  async (params, { rejectWithValue }) => {
    try {
      const response = await dashboardAPI.getDevices(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch devices');
    }
  }
);

// Initial state
const initialState = {
  kpis: null,
  revenue: [],
  products: [],
  marketing: [],
  states: [],
  devices: [],
  loading: {
    kpis: false,
    revenue: false,
    products: false,
    marketing: false,
    states: false,
    devices: false,
  },
  error: {
    kpis: null,
    revenue: null,
    products: null,
    marketing: null,
    states: null,
    devices: null,
  },
};

// Slice
const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = {
        kpis: null,
        revenue: null,
        products: null,
        marketing: null,
        states: null,
        devices: null,
      };
    },
  },
  extraReducers: (builder) => {
    // KPIs
    builder
      .addCase(fetchKPIs.pending, (state) => {
        state.loading.kpis = true;
        state.error.kpis = null;
      })
      .addCase(fetchKPIs.fulfilled, (state, action) => {
        state.loading.kpis = false;
        state.kpis = action.payload;
      })
      .addCase(fetchKPIs.rejected, (state, action) => {
        state.loading.kpis = false;
        state.error.kpis = action.payload;
      })
      
    // Revenue
      .addCase(fetchRevenue.pending, (state) => {
        state.loading.revenue = true;
        state.error.revenue = null;
      })
      .addCase(fetchRevenue.fulfilled, (state, action) => {
        state.loading.revenue = false;
        state.revenue = action.payload;
      })
      .addCase(fetchRevenue.rejected, (state, action) => {
        state.loading.revenue = false;
        state.error.revenue = action.payload;
      })
      
    // Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading.products = true;
        state.error.products = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading.products = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading.products = false;
        state.error.products = action.payload;
      })
      
    // Marketing
      .addCase(fetchMarketing.pending, (state) => {
        state.loading.marketing = true;
        state.error.marketing = null;
      })
      .addCase(fetchMarketing.fulfilled, (state, action) => {
        state.loading.marketing = false;
        state.marketing = action.payload;
      })
      .addCase(fetchMarketing.rejected, (state, action) => {
        state.loading.marketing = false;
        state.error.marketing = action.payload;
      })
      
    // States
      .addCase(fetchStates.pending, (state) => {
        state.loading.states = true;
        state.error.states = null;
      })
      .addCase(fetchStates.fulfilled, (state, action) => {
        state.loading.states = false;
        state.states = action.payload;
      })
      .addCase(fetchStates.rejected, (state, action) => {
        state.loading.states = false;
        state.error.states = action.payload;
      })
      
    // Devices
      .addCase(fetchDevices.pending, (state) => {
        state.loading.devices = true;
        state.error.devices = null;
      })
      .addCase(fetchDevices.fulfilled, (state, action) => {
        state.loading.devices = false;
        state.devices = action.payload;
      })
      .addCase(fetchDevices.rejected, (state, action) => {
        state.loading.devices = false;
        state.error.devices = action.payload;
      });
  },
});

export const { clearErrors } = dashboardSlice.actions;
export default dashboardSlice.reducer;