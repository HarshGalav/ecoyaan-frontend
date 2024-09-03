export type ProductCategory = {
  id: number;
  parent_id: number | null;
  name: string;
  child_categories: ProductCategory[];
};
