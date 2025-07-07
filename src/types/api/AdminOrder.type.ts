export interface AdminOrder extends Record<string, unknown> {
  orderId: number;
  userId: number;
  userName: string;
  userEmail: string;
  status: 'PENDING' | 'PAID' | 'CANCELLED';
  peopleCount: number;
  orderDate: string;
  cancelDate: string | null;
  updatedAt: string | null;
}

export interface AdminOrderDetail {
  user: {
    name: string;
    email: string;
    user_id: number;
    phone_number: string;
  };
  status: 'PENDING' | 'PAID' | 'CANCELLED';
  payment: {
    status: string;
    payment_id: number;
    card_number: string;
    payment_datetime: string;
  };
  order_id: number;
  order_date: string;
  cancel_date: string | null;
  updated_at: string | null;
  order_items: Array<{
    product: {
      name: string;
      product_id: number;
    };
    order_item_id: number;
    price: number;
    people_count: number;
    total_price: number;
    start_date: string;
  }>;
  total_price: number | null;
}

export interface AdminOrderUpdateRequest {
  status: 'PENDING' | 'PAID' | 'CANCELLED';
}

export interface AdminOrderUpdateResponse {
  updated_at: string;
  status: string;
  order_id: number;
}
