import { http, HttpResponse } from 'msw';

import { regions } from '../data/regions';

export const regionHandlers = [
  // 전체 지역 조회
  http.get('/regions', () => {
    return HttpResponse.json(regions);
  }),

  // 특정 지역 조회
  http.get('/regions/:regionId', ({ params }) => {
    const regionId = parseInt(params.regionId as string);
    const region = regions.find((r) => r.regionId === regionId);
    if (!region) {
      return HttpResponse.json(
        {
          success: false,
          data: null,
          error: { code: 'REGION_NOT_FOUND', message: '요청하신 지역 정보를 찾을 수 없습니다.' }
        },
        { status: 404 }
      );
    }
    return HttpResponse.json(region);
  })
];
