import type { ReactNode } from 'react';

export interface TableColumn {
  key: string;
  label: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: unknown, row: Record<string, unknown>) => ReactNode;
}

// 간단한 컬럼 정의 타입
export interface SimpleColumn {
  key: string;
  label: string;
  render?: (value: unknown, row: Record<string, unknown>) => ReactNode;
}

// 필터 옵션 타입
export interface FilterOption {
  key: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'date';
  options?: { value: string; label: string }[]; // select용
  placeholder?: string;
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

// 기존 AdminTableProps (하위 호환성 유지)
export interface AdminTableProps<T extends Record<string, unknown>> {
  columns: TableColumn[];
  data: T[];
  pagination: PaginationData;
  loading?: boolean;
  onPageChange: (page: number) => void;
  emptyMessage?: string;
  className?: string;
}

// 확장된 AdminTableProps (새로운 기능 포함)
export interface ExtendedAdminTableProps<T extends Record<string, unknown>>
  extends Omit<AdminTableProps<T>, 'columns'> {
  columns?: TableColumn[]; // 기존 상세 컬럼 정의 (선택적)
  simpleColumns?: SimpleColumn[]; // 새로운 간단한 컬럼 정의 (선택적)
  pageSizeOptions?: number[]; // 페이지 크기 옵션
  onPageSizeChange?: (size: number) => void; // 페이지 크기 변경 콜백
  showPaginationAlways?: boolean; // 항상 페이지네이션 표시 여부
  fullWidth?: boolean; // 전체 너비 사용 여부
  currentPageSize?: number; // 현재 페이지 크기 (외부에서 제어)

  // 새로운 범용 기능들
  filters?: FilterOption[]; // 필터 옵션들
  onFiltersChange?: (filters: Record<string, string>) => void; // 필터 변경 콜백
  showFilterBar?: boolean; // 필터 바 표시 여부
  error?: Error | null; // 에러 상태
  onRetry?: () => void; // 재시도 콜백
  errorMessage?: string; // 커스텀 에러 메시지

  // 제목과 요약 정보
  title?: string; // 테이블 제목
  summary?: string; // 요약 정보 (예: "총 X개의 항목")

  // 추가 버튼 기능
  showAddButton?: boolean; // 추가 버튼 표시 여부
  addButtonText?: string; // 추가 버튼 텍스트
  onAddClick?: () => void; // 추가 버튼 클릭 콜백
}
