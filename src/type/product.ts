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
  description?: string;
  descriptionGroups?: {
    groupId: number;
    title: string;
    type: number;
    sortOrder: number;
    items: {
      itemId: number;
      content: string;
      sortOrder: number;
    }[];
  }[];
};
