export const AdminOrdersDetailData = [
  {
    user: {
      name: 'kim',
      email: 'kim1@test.com',
      user_id: 1,
      phone_number: '010-1111-1111'
    },
    status: 'PENDING',
    payment: {
      status: 'PAID',
      payment_id: 1,
      card_number: '****-****-****-5432',
      payment_datetime: '2025-06-05T11:01:00'
    },
    order_id: 1001,
    total_quantity: 2,
    order_date: '2025-06-05T11:00:00',
    cancel_date: null,
    updated_at: '2025-06-05T11:30:00',
    order_items: [
      {
        product: {
          name: '제주도 2박3일 패키지',
          price: 250000,
          product_id: 1
        },
        order_item_id: 1,
        people_count: 2,
        start_date: '2025-06-05',
        created_at: null,
        updated_at: null
      }
    ]
  }
];
