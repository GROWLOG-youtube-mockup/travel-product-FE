import { http, HttpResponse } from 'msw';

import { products } from '../data/products';

export const productHandlers = [
  http.get('/products', () => {
    return HttpResponse.json(products);
  }),

  http.get('/products/:product_id', ({ params }) => {
    const product = products.find((p) => p.product_id === parseInt(params.product_id as string));
    if (!product) {
      return HttpResponse.json(
        {
          success: false,
          data: null,
          error: { code: 'PRODUCT_NOT_FOUND', message: '상품 없음' }
        },
        { status: 404 }
      );
    }
    return HttpResponse.json(product);
  })
];
