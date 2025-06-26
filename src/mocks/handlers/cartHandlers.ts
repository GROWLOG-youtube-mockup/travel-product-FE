import { http, HttpResponse } from 'msw';

import { carts } from '../data/carts';

export const cartHandlers = [
  // 장바구니 담기
  http.post('/cart', async ({ request }) => {
    const body = (await request.json()) as {
      productId: number;
      quantity: number;
      start_date: string;
    };

    return HttpResponse.json(
      {
        cartItemId: 10,
        productId: body.productId,
        quantity: body.quantity,
        start_date: body.start_date
      },
      { status: 201 }
    );
  }),

  // 장바구니 조회
  http.get('/cart', () => {
    return HttpResponse.json(carts);
  }),

  // 장바구니 수정
  http.put('/cart/:cartItemId', async () => {
    return HttpResponse.json({ message: 'Updated successfully' });
  }),

  // 장바구니 항목 삭제
  http.delete('/cart/:cartItemId', async () => {
    return HttpResponse.json({ message: 'Item removed' });
  })
];
