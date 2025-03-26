import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  salesData: [
    { id: 1, baseHeight: 77, valueHeight: 23 },
    { id: 2, baseHeight: 53, valueHeight: 47 },
    { id: 3, baseHeight: 32, valueHeight: 68 },
    { id: 4, baseHeight: 48, valueHeight: 52 },
    { id: 5, baseHeight: 11, valueHeight: 89 },
    { id: 6, baseHeight: 66, valueHeight: 34 },
    { id: 7, baseHeight: 24, valueHeight: 76 },
  ],
  totalSales: 350000,
  growthRate: 12.5,
};

const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {},
});

export const selectSalesData = (state) => state.sales.salesData;
export const selectTotalSales = (state) => state.sales.totalSales;
export const selectGrowthRate = (state) => state.sales.growthRate;

export default salesSlice.reducer;