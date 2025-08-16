import { configureStore } from '@reduxjs/toolkit';
import dashboardSlice from './slices/dashboardSlice';
import filtersSlice from './slices/filtersSlice';

export const store = configureStore({
  reducer: {
    dashboard: dashboardSlice,
    filters: filtersSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

