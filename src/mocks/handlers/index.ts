import { adminHandlers } from './adminHandlers';
import { authHandlers } from './authHandlers';
import { cartHandlers } from './cartHandlers';
import { imageHandlers } from './imageHandlers';
import { orderHandlers } from './orderHandlers';
import { paymentHandlers } from './paymentHandlers';
import { productHandlers } from './productHandlers';
import { regionHandlers } from './regionHandlers';
import { userHandlers } from './userHandlers';

export const handlers = [
  ...authHandlers,
  ...userHandlers,
  ...adminHandlers,
  ...productHandlers,
  ...cartHandlers,
  ...orderHandlers,
  ...paymentHandlers,
  ...imageHandlers,
  ...regionHandlers
];
