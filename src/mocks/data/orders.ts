// data/orders.ts
export const orders = [
  {
    order_id: 5001,
    user: {
      user_id: 1,
      name: '홍길동',
      email: 'hong@example.com',
      phone_number: '01012345678'
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
          productId: 101,
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
  },
  {
    order_id: 5002,
    user: {
      user_id: 3,
      name: '김유저',
      email: 'kim@example.com',
      phone_number: '01023456789'
    },
    status: 'CANCELLED',
    total_quantity: 1,
    order_date: '2025-05-10T12:00:00Z',
    cancel_date: '2025-05-11T09:00:00Z',
    created_at: '2025-05-10T12:00:00Z',
    updated_at: '2025-05-11T09:00:00Z',
    order_items: [
      {
        order_item_id: 2,
        product: {
          productId: 102,
          name: '제주도 3박 4일 패키지',
          price: 800000
        },
        people_count: 1,
        start_date: '2025-05-20',
        created_at: '2025-05-10T12:00:00Z',
        updated_at: '2025-05-10T12:00:00Z'
      }
    ],
    payment: {
      payment_id: 9002,
      card_number: '****-****-****-5678',
      status: 'REFUNDED',
      payment_datetime: '2025-05-10T12:10:00Z'
    }
  },
  {
    order_id: 5003,
    user: {
      user_id: 2,
      name: '잠만보',
      email: 'jammanb0@example.com',
      phone_number: '01012345678'
    },
    status: 'PAID',
    total_quantity: 3,
    order_date: '2025-06-06T14:00:00Z',
    cancel_date: null,
    created_at: '2025-06-06T14:00:00Z',
    updated_at: '2025-06-06T15:00:00Z',
    order_items: [
      {
        order_item_id: 3,
        product: {
          productId: 103,
          name: '부산 해운대 투어',
          price: 400000
        },
        people_count: 3,
        start_date: '2025-07-20',
        created_at: '2025-06-06T14:00:00Z',
        updated_at: '2025-06-06T14:00:00Z'
      }
    ],
    payment: {
      payment_id: 9003,
      card_number: '****-****-****-9876',
      status: 'PAID',
      payment_datetime: '2025-06-06T14:10:00Z'
    }
  }
];
