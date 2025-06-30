export interface PaginationMeta {
  totalElements: number;
  totalPages: number;
  currentPage: number;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
}
