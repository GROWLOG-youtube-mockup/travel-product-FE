import { http, HttpResponse } from 'msw';

import { products } from '../data/products';

export const productHandlers = [
  http.get('/products', ({ request }) => {
    const url = new URL(request.url);
    const regionId = url.searchParams.get('regionId');
    const parentRegionId = url.searchParams.get('parentRegionId');
    const tagsParam = url.searchParams.get('tags'); // 예: 'Best 추천,예약 폭주'

    let filteredProducts = products;

    if (regionId) {
      filteredProducts = filteredProducts.filter((p) => p.region.regionId === Number(regionId));
    }

    if (parentRegionId) {
      filteredProducts = filteredProducts.filter(
        (p) => p.region.parentId === Number(parentRegionId)
      );
    }

    if (tagsParam) {
      const tagList = tagsParam.split(',');
      filteredProducts = filteredProducts.filter((p) =>
        p.tags.some((tag) => tagList.includes(tag))
      );
    }

    return HttpResponse.json(filteredProducts);
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
