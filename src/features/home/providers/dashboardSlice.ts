import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DashboardState } from "./dashboardState";
import { ProductCategory } from "../../../types/productCategory";

const Provider = "DashboardProvider";

export const DashboardProvider = createSlice({
  name: Provider,
  initialState: DashboardState,
  reducers: {
    updateProductCategories: (
      state,
      action: PayloadAction<ProductCategory>,
    ) => {
      state.productCategory = action.payload;
    },
  },
});

export const { updateProductCategories } = DashboardProvider.actions;

export default DashboardProvider.reducer;
