import type { ReactNode } from 'react';

export interface TableColumn {
  key: string;
  label: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: unknown, row: Record<string, unknown>) => ReactNode;
}

export interface PaginationData {
  totalElements: number;
  totalPages: number;
  currentPage: number;
}

export interface ApiResponse<T> {
  success?: boolean;
  data?: {
    content: T[];
    totalElements: number;
    totalPages: number;
    currentPage: number;
  };
  content?: T[];
  totalElements?: number;
  totalPages?: number;
  currentPage?: number;
  error?: {
    code: string;
    message: string;
  };
}

export interface AdminTableProps<T extends Record<string, unknown>> {
  columns: TableColumn[];
  data: T[];
  pagination: PaginationData;
  loading?: boolean;
  onPageChange: (page: number) => void;
  emptyMessage?: string;
  className?: string;
}
