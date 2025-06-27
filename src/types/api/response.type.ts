import type { ApiMeta } from './common.type';

export type ApiResponse<T> = ApiMeta & {
  data: T;
};
