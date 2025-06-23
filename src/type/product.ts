export type Product = {
  product_id: number;
  name: string;
  imageUrls: string[];
  price: number;
  stock_quantity: number;
  duration: number;
  sale_status: number;
  type: number;
  region: { regionId: number; name: string; level: number; parentId: number };
  tags: string[];
};
