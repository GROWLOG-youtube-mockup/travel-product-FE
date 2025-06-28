// 각 POST 엔드포인트별 요청 타입 정의 (OpenAPI 명세 기반)

export type OrderItem = {
  peopleCount: number;
  product_id: number;
  start_date: string;
};

export interface EndpointRequestMap {
  '/users/signup': {
    userId?: number;
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    roleCode?: number;
  };
  '/payments/cancel': {
    orderId: number;
  };
  '/payments/approve': {
    amount: number;
    payment_key: string;
    order_id: number;
    payment_gateway: string;
    transaction_id?: string;
  };
  '/orders': {
    items: OrderItem[];
    email: string;
  };
  '/images': {
    files: File[];
  };
  '/carts': {
    productId: number;
    quantity: number;
    startDate: string;
  };
  '/auth/reset-password': {
    name: string;
    phoneNumber: string;
    email: string;
  };
  '/auth/logout': object;
  '/auth/login': {
    email: string;
    password: string;
  };
  '/auth/find-email': {
    name: string;
    phoneNumber: string;
  };
  '/auth/email/verify': {
    email: string;
    code: string;
  };
  '/auth/email/send': {
    email: string;
  };
  '/admin/products': {
    name: string;
    price: number;
    totalQuantity: number;
    description: string;
    saleStatus: number;
    type: number;
    duration: number;
    regionId: number;
    imageUrls: string[];
    descriptionGroups: Array<{
      title: string;
      type: number;
      sortOrder: number;
      items: Array<{
        title: string;
        description: string;
      }>;
    }>;
  };
  '/users/verify-password': {
    password: string;
  };
  '/users/me/password': {
    currentPassword: string;
    newPassword: string;
  };
  '/users/me/name': {
    name: string;
  };
  '/users/me/phone': {
    phoneNumber: string;
  };
  // 필요에 따라 추가 엔드포인트 정의
}
