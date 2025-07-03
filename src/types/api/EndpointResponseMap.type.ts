import type { AdminLog } from './AdminLog.type';
import type { AdminOrder, AdminOrderDetail } from './AdminOrder.type';
import type {
  AdminProduct,
  AdminProductCreateResponse,
  AdminProductDeleteResponse,
  AdminProductDetail,
  AdminProductUpdateResponse,
  ImageUploadResponse
} from './AdminProduct.type';
import type { AdminUser } from './AdminUser.type';
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
export type AdminUsersRes = ApiResponse<PaginatedResponse<AdminUser>>;
export type UserUpdateRes = ApiResponse<{ updated_at: string; user_id: number }>;
export type UserDeleteRes = ApiResponse<{ message: string }>;
export type AdminOrdersRes = ApiResponse<PaginatedResponse<AdminOrder>>;
export type AdminOrderDetailRes = ApiResponse<AdminOrderDetail>;
export type AdminOrderUpdateRes = ApiResponse<{
  updated_at: string;
  status: string;
  order_id: number;
}>;

// 상품 관리 관련 응답 타입
export type AdminProductsRes = ApiResponse<PaginatedResponse<AdminProduct>>;
export type AdminProductDetailRes = ApiResponse<AdminProductDetail>;
export type AdminProductCreateRes = ApiResponse<AdminProductCreateResponse>;
export type AdminProductUpdateRes = ApiResponse<AdminProductUpdateResponse>;
export type AdminProductDeleteRes = ApiResponse<AdminProductDeleteResponse>;
export type ImageUploadRes = ImageUploadResponse; // 직접 배열 반환

export interface EndpointResponseMap {
  '/carts': CartRes;
  '/products': ProductRes;
  [k: `/products/${string}`]: ProductDetailRes;
  '/orders': OrdersRes;
  [k: `/orders/${string}`]: OrderDetailRes;
  '/users/me': UserRes;
  '/users/signup': UserRes;
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
  '/admin/users': AdminUsersRes;
  [k: `/admin/users/${string}`]: UserUpdateRes | UserDeleteRes;
  '/admin/orders': AdminOrdersRes;
  [k: `/admin/orders/${string}`]: AdminOrderDetailRes | AdminOrderUpdateRes;
  '/admin/products': AdminProductsRes;
  [k: `/admin/products/${string}`]: AdminProductDetailRes;
  '/images': ImageUploadRes;
  [k: `/images/${string}`]: void;
}
