export type CartItem = {
  cartItemId?: number;
  price: number;
  productId: number;
  imageUrls: string;
  productName: string;
  quantity: number;
  startDate: string;
  stockQuantity: number;
};

export type CartItems = CartItem[];
