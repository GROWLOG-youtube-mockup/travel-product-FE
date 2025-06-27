export interface ProductDetail {
  productId: number;
  name: string;
  price: number;
  totalQuantity: number;
  stockQuantity: number;
  description: string;
  saleStatus: number;
  type: number;
  duration: number;
  region: {
    regionId: number;
    name: string;
    parentId: number;
  };
  imageUrls: string[];
  descriptionGroups: [
    {
      groupId: number;
      title: string;
      type: number;
      sortOrder: number;
      items: {
        itemId: number;
        content: string;
        sortOrder: number;
      }[];
    }
  ];
}
