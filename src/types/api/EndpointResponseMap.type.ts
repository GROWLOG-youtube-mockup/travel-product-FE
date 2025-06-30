import type { Carts } from './Carts.type';
import type { Orders } from './Orders.type';
import type { Product } from './Product.type';
import type { ProductDetail } from './ProductDetail.type';
import type { ApiResponse } from './response.type';
import type { Trip } from './trip.type';
import type { User } from './User.type';

export type CartRes = ApiResponse<Carts[]>;
export type ProductRes = ApiResponse<Product>;
export type ProductDetailRes = ApiResponse<ProductDetail>;
export type OrdersRes = ApiResponse<Orders[]>;
export type OrderDetailRes = ApiResponse<Orders>;
export type UserRes = ApiResponse<User>;
export type LoginRes = ApiResponse<{ accessToken: string; name: string; userId: number }>;
export type PasswordVerifyRes = ApiResponse<{ verified: boolean }>;
export type EmailSendRes = ApiResponse<{ sent: boolean }>;
export type EmailVerifyRes = ApiResponse<{ verified: boolean }>;
export type FindEmailRes = ApiResponse<string>;
export type PhoneChangeRes = ApiResponse<string>;
export type ResetPasswordRes = ApiResponse<string>;
export type TripsRes = ApiResponse<Trip[]>;

export interface EndpointResponseMap {
  '/carts': CartRes;
  '/products': ProductRes;
  [k: `/products/${string}`]: ProductDetailRes;
  '/orders': OrdersRes;
  [k: `/orders/${string}`]: OrderDetailRes;
  '/users/me': UserRes;
  '/users/me/trips': TripsRes;
  '/auth/login': LoginRes;
  '/users/verify-password': PasswordVerifyRes;
  '/auth/email/send': EmailSendRes;
  '/auth/email/verify': EmailVerifyRes;
  '/auth/find-email': FindEmailRes;
  '/users/me/phone': PhoneChangeRes;
  '/auth/reset-password': ResetPasswordRes;
}
