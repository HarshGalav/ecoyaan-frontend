import { PackagingType, ProductType } from "../enums/ProductEnums";
import { ProductDetails } from "./productDetails";
import { ProductGallery } from "./productGallery";

export type Product = {
  id: number;
  name: string;
  description: string;
  content: string;
  type: ProductType;
  net_weight: number;
  volumetric_weight: number;
  sku: string;
  upc: string;
  ean: string;
  mpn: string;
  packaging_type: PackagingType;
  green_rating: number;
  product_gallery: ProductGallery[];
  product_details: ProductDetails[];
};
