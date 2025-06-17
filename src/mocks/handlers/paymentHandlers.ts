import { http, HttpResponse } from 'msw';

export const paymentHandlers = [
  // 결제 승인
  http.post('/payments/approve', async () => {
    return HttpResponse.json(
      {
        payment_id: 9001,
        status: 'PAID',
        paid_at: '2025-06-05T11:10:00Z'
      },
      { status: 201 }
    );
  }),

  // 주문 결제 상태 조회
  http.get('/payments/:order_id', () => {
    return HttpResponse.json({
      payment_id: 9001,
      status: 'PAID',
      payment_gateway: 'kakao',
      transaction_id: 'abc123',
      paid_at: '2025-06-05T11:10:00Z'
    });
  })
];
