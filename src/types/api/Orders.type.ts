export interface Orders {
  items: {
    productId: number;
    productName: string;
    startDate: string;
    peopleCount: number;
    price: number;
    totalPrice: number;
  }[];
  order_id: number;
  order_date: string;
  total_price: number;
}
