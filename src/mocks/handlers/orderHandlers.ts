import { http, HttpResponse } from 'msw';

export const orderHandlers = [
  // 주문 생성
  http.post('/orders', async () => {
    return HttpResponse.json(
      {
        order_id: 5001,
        status: 'PENDING',
        created_at: '2025-06-05T11:00:00Z'
      },
      { status: 201 }
    );
  }),

  // 내 주문 목록 조회
  http.get('/orders', () => {
    return HttpResponse.json([
      {
        order_id: 5001,
        order_date: '2025-06-05T11:00:00Z',
        total_quantity: 2,
        total_price: 2400000
      }
    ]);
  }),

  // 주문 상세 조회
  http.get('/orders/:order_id', () => {
    return HttpResponse.json({
      order_id: 5001,
      order_date: '2025-06-05T11:00:00Z',
      total_quantity: 2,
      total_price: 2400000
    });
  })
];
