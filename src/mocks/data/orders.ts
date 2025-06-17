export const orders = [
  {
    order_id: 5001,
    user: {
      user_id: 1,
      name: '홍길동',
      email: 'hong@example.com'
    },
    status: 'PAID',
    total_quantity: 2,
    order_date: '2025-06-05T11:00:00Z',
    cancel_date: null,
    created_at: '2025-06-05T11:00:00Z',
    updated_at: '2025-06-05T11:30:00Z',
    order_items: [
      {
        order_item_id: 1,
        product: {
          product_id: 101,
          name: '시드니 4박 5일 자유 여행',
          price: 1200000
        },
        people_count: 2,
        start_date: '2025-07-01',
        created_at: '2025-06-05T11:00:00Z',
        updated_at: '2025-06-05T11:00:00Z'
      }
    ],
    payment: {
      payment_id: 9001,
      card_number: '****-****-****-1234',
      status: 'PAID',
      payment_datetime: '2025-06-05T11:10:00Z'
    }
  }
];
