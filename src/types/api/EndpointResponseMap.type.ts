import type { AdminLog } from './AdminLog.type';
import type { Carts } from './Carts.type';
import type { Orders } from './Orders.type';
import type { PaginatedResponse } from './Pagination.type';
import type { Product } from './Product.type';
import type { ProductDetail } from './ProductDetail.type';
import type { ApiResponse } from './response.type';
import type { TripDto } from './Trip.type';
import type { User } from './User.type';

export type CartRes = ApiResponse<Carts[]>;
export type ProductRes = ApiResponse<Product>;
export type ProductDetailRes = ApiResponse<ProductDetail>;
export type OrdersRes = ApiResponse<Orders[]>;
export type OrderDetailRes = ApiResponse<Orders>;
export type UserRes = ApiResponse<User>;
export type LoginRes = ApiResponse<{
  accessToken: string;
  name: string;
  userId: number;
  roleCode: number;
}>;
export type PasswordVerifyRes = ApiResponse<{ verified: boolean }>;
export type PaymentApprove = ApiResponse<{
  status: string;
  method: string;
  payment_id: number;
  paid_at: string;
}>;
export type PaymentCancel = ApiResponse<number>;
export type PaymentSuccess = string;
export type EmailSendRes = ApiResponse<{ sent: boolean }>;
export type EmailVerifyRes = ApiResponse<{ verified: boolean }>;
export type FindEmailRes = ApiResponse<string>;
export type PhoneChangeRes = ApiResponse<string>;
export type ResetPasswordRes = ApiResponse<string>;
export type PasswordChangeRes = ApiResponse<string>;
export type NameChangeRes = ApiResponse<string>;
export type TripsRes = ApiResponse<TripDto[]>;
export type AdminLogsRes = ApiResponse<PaginatedResponse<AdminLog>>;

export interface EndpointResponseMap {
  '/carts': CartRes;
  '/products': ProductRes;
  [k: `/products/${string}`]: ProductDetailRes;
  '/orders': OrdersRes;
  [k: `/orders/${string}`]: OrderDetailRes;
  '/users/me': UserRes;
  '/users/me/trips': TripsRes;
  '/users/me/phone': PhoneChangeRes;
  '/users/me/password': PasswordChangeRes;
  '/users/me/name': NameChangeRes;
  '/users/verify-password': PasswordVerifyRes;
  '/payments/approve': PaymentApprove;
  '/payments/cancel': PaymentCancel;
  '/payments/success': PaymentSuccess;
  '/auth/login': LoginRes;
  '/auth/email/send': EmailSendRes;
  '/auth/email/verify': EmailVerifyRes;
  '/auth/find-email': FindEmailRes;
  '/auth/reset-password': ResetPasswordRes;
  '/admin/logs': AdminLogsRes;
}
