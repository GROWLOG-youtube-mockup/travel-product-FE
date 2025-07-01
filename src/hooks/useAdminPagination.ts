import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

interface PaginationOptions {
  defaultPageSize?: number;
  pageSizeOptions?: number[];
}

interface PaginationResult {
  // 현재 상태
  currentPage: number;
  currentSize: number;

  // API용 파라미터 (확장 가능한 타입)
  apiParams: Record<string, unknown>;

  // AdminTable용 페이지네이션 객체
  pagination: {
    currentPage: number; // 0부터 시작 (AdminTable용)
    totalPages: number;
    totalElements: number;
  };

  // 핸들러들
  handlePageChange: (page: number) => void;
  handlePageSizeChange: (size: number) => void;

  // 필터 관련
  handleFiltersChange: (filters: Record<string, string>) => void;
  getFilterValues: () => Record<string, string>;

  // 페이지네이션 설정
  updatePagination: (data: { totalPages: number; totalElements: number }) => void;
}

export const useAdminPagination = (options: PaginationOptions = {}): PaginationResult => {
  const { defaultPageSize = 10 } = options;
  const [searchParams, setSearchParams] = useSearchParams();

  // URL 파라미터를 상태로 관리
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSize, setCurrentSize] = useState(defaultPageSize);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  // URL 파라미터 변화 감지
  useEffect(() => {
    const page = parseInt(searchParams.get('page') || '1', 10);
    const size = parseInt(searchParams.get('size') || defaultPageSize.toString(), 10);

    setCurrentPage(page);
    setCurrentSize(size);
  }, [searchParams, defaultPageSize]);

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(window.location.search);
    newParams.set('page', (page + 1).toString()); // AdminTable(0부터) → 서버(1부터)
    setSearchParams(newParams, { replace: true });
  };

  // 페이지 크기 변경 핸들러
  const handlePageSizeChange = (size: number) => {
    const newSearchParams = new URLSearchParams(window.location.search);
    newSearchParams.set('page', '1'); // 첫 페이지로 리셋
    newSearchParams.set('size', size.toString());
    setSearchParams(newSearchParams, { replace: true });
  };

  // 필터 변경 핸들러
  const handleFiltersChange = (filters: Record<string, string>) => {
    const newSearchParams = new URLSearchParams(window.location.search);
    newSearchParams.set('page', '1'); // 필터 변경 시 첫 페이지로

    // 필터 값들을 URL에 반영
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        newSearchParams.set(key, value);
      } else {
        newSearchParams.delete(key);
      }
    });

    setSearchParams(newSearchParams, { replace: true });
  };

  // 현재 필터 값들 가져오기
  const getFilterValues = (): Record<string, string> => {
    const filters: Record<string, string> = {};

    // page, size를 제외한 모든 파라미터를 필터로 간주
    searchParams.forEach((value, key) => {
      if (key !== 'page' && key !== 'size') {
        filters[key] = value;
      }
    });

    return filters;
  };

  // 페이지네이션 데이터 업데이트 (API 응답 후 호출)
  const updatePagination = (data: { totalPages: number; totalElements: number }) => {
    setTotalPages(data.totalPages);
    setTotalElements(data.totalElements);
  };

  return {
    // 현재 상태
    currentPage,
    currentSize,

    // API용 파라미터 (서버는 1부터 시작, 확장 가능)
    apiParams: {
      page: currentPage,
      size: currentSize
    } as Record<string, unknown>,

    // AdminTable용 페이지네이션 (0부터 시작)
    pagination: {
      currentPage: currentPage - 1,
      totalPages,
      totalElements
    },

    // 핸들러들
    handlePageChange,
    handlePageSizeChange,
    handleFiltersChange,
    getFilterValues,
    updatePagination
  };
};
