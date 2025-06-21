export type CartItem = {
  cart_item_id: number;
  product: {
    product_id: number;
    name: string;
    thumbnail_image_url: string;
    price: number;
  };
  quantity: number;
  start_date: string;
};

export type CartItems = CartItem[];
