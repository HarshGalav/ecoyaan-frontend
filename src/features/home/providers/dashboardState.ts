import { ProductCategory } from "../../../types/productCategory";

export interface IDashboardState {
  productCategory: ProductCategory | null;
}

export const DashboardState: IDashboardState = {
  productCategory: null,
};
