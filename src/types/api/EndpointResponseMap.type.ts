import type { Carts } from './Carts.type';
import type { Orders } from './Orders.type';
import type { Product } from './Product.type';
import type { ProductDetail } from './ProductDetail.type';
import type { ApiResponse } from './response.type';
import type { User } from './User.type';

export type CartRes = ApiResponse<Carts[]>;
export type ProductRes = ApiResponse<Product>;
export type ProductDetailRes = ApiResponse<ProductDetail>;
export type OrdersRes = ApiResponse<Orders[]>;
export type OrderDetailRes = ApiResponse<Orders>;
export type UserRes = ApiResponse<User>;
export type LoginRes = ApiResponse<{ accessToken: string; name: string; userId: number }>;
export type PasswordVerifyRes = ApiResponse<{ verified: boolean }>;
export type PaymentApprove = ApiResponse<{
  status: string;
  method: string;
  payment_id: number;
  paid_at: string;
}>;
export type PaymentCancel = ApiResponse<string>;
export type PaymentSuccess = string;

export interface EndpointResponseMap {
  '/carts': CartRes;
  '/products': ProductRes;
  [k: `/products/${string}`]: ProductDetailRes;
  '/orders': OrdersRes;
  [k: `/orders/${string}`]: OrderDetailRes;
  '/users/me': UserRes;
  '/auth/login': LoginRes;
  '/users/verify-password': PasswordVerifyRes;
  '/payments/approve': PaymentApprove;
  '/payments/cancel': PaymentCancel;
  '/payments/success': PaymentSuccess;
}
