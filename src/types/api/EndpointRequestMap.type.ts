// 각 POST 엔드포인트별 요청 타입 정의 (OpenAPI 명세 기반)

export interface EndpointRequestMap {
  '/users/signup': {
    username: string;
    phoneNumber: string;
    email: string;
    password: string;
  };
  '/auth/login': {
    email: string;
    password: string;
  };
  '/carts': {
    productId: number;
    quantity: number;
    startDate: string;
  };
  '/orders': {
    items: Array<{
      peopleCount: number;
      product_id: number;
      start_date: string;
    }>;
  };
  // 필요에 따라 추가 엔드포인트 정의
}
