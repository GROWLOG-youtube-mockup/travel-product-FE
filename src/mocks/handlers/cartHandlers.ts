import { http, HttpResponse } from 'msw';

import { carts } from '../data/carts';

export const cartHandlers = [
  // 장바구니 담기
  http.post('/cart', async ({ request }) => {
    const body = (await request.json()) as {
      product_id: number;
      quantity: number;
      start_date: string;
    };

    return HttpResponse.json(
      {
        cart_item_id: 10,
        product_id: body.product_id,
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
  http.put('/cart/:cart_item_id', async () => {
    return HttpResponse.json({ message: 'Updated successfully' });
  }),

  // 장바구니 항목 삭제
  http.delete('/cart/:cart_item_id', async () => {
    return HttpResponse.json({ message: 'Item removed' });
  })
];
