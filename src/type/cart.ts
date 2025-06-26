export type CartItem = {
  cartItemId: number;
  price: number;
  productId: number;
  productName: string;
  quantity: number;
  startDate: string;
  stockQuantity: number;
  totalPrice: number;
};

export type CartItems = CartItem[];
