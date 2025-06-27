export interface Product {
  productId: number;
  name: string;
  imageUrls: string[];
  price: number;
  stockQuantity: number;
  duration: number;
  saleStatus: number;
  type: number;
  region: {
    regionId: number;
    name: string;
    parentId: number;
  };
  tags: string[];
}
