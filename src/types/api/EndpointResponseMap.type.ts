import type { Carts } from './Carts.type';
import type { Orders } from './Orders.type';
import type { Product } from './Product.type';
import type { ProductDetail } from './ProductDetail.type';
import type { ApiResponse } from './response.type';

export type CartRes = ApiResponse<Carts[]>;
export type ProductRes = ApiResponse<Product>;
export type ProductDetailRes = ApiResponse<ProductDetail>;
export type OrdersRes = ApiResponse<Orders[]>;
export type OrderDetailRes = ApiResponse<Orders>;

export interface EndpointResponseMap {
  '/carts': CartRes;
  '/products': ProductRes;
  [k: `/product/${string}`]: ProductDetailRes;
  '/orders': OrdersRes;
  [k: `/orders/${string}`]: OrderDetailRes;
}
