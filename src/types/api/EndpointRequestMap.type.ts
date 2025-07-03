import type { AdminProductCreateRequest, AdminProductUpdateRequest } from './AdminProduct.type';

export type OrderItem = {
  peopleCount: number;
  product_id: number;
  start_date: string;
};

export interface EndpointRequestMap {
  '/users/signup': {
    username: string;
    phoneNumber: string;
    email: string;
    password: string;
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
  '/payments/success': object;
  '/orders': {
    items: OrderItem[];
  };
  '/images': FormData | string[];
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
  '/admin/products': AdminProductCreateRequest;
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
  [k: `/admin/users/${string}`]: {
    name?: string;
    email?: string;
    phoneNumber?: string;
    roleCode?: number;
  };
  [k: `/admin/orders/${string}`]: {
    status?: 'PENDING' | 'PAID' | 'CANCELLED';
  };
  [k: `/admin/products/${string}`]: AdminProductUpdateRequest;
}
