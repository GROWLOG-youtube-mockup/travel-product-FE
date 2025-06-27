import type { ApiMeta } from './common.type';

export type ApiResponse<T> = T & ApiMeta;
