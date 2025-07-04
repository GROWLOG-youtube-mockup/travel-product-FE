import React, { useState } from 'react';

import type { ExtendedAdminTableProps, TableColumn } from '@/types/adminTable.types';

import styles from './AdminTable.module.scss';

function AdminTable<T extends Record<string, unknown>>({
  columns: detailedColumns,
  simpleColumns,
  data,
  pagination,
  loading = false,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 20, 50],
  showPaginationAlways = false,
  emptyMessage = '데이터가 없습니다.',
  className = '',
  fullWidth = false,
  currentPageSize,

  // 새로운 범용 기능들
  filters = [],
  onFiltersChange,
  showFilterBar = false,
  error = null,
  onRetry,
  errorMessage = '데이터를 불러오는 중 오류가 발생했습니다.',
  title,
  summary,

  // 추가 버튼 기능
  showAddButton = false,
  addButtonText = '추가',
  onAddClick
}: ExtendedAdminTableProps<T>) {
  const [pageSize, setPageSize] = useState(currentPageSize || pageSizeOptions[1] || 10);
  const [isCustomInput, setIsCustomInput] = useState(false);
  const [customPageSize, setCustomPageSize] = useState('');
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});

  // 현재 pageSize가 변경될 때마다 내부 상태도 업데이트
  React.useEffect(() => {
    if (currentPageSize && currentPageSize !== pageSize) {
      setPageSize(currentPageSize);
    }
  }, [currentPageSize, pageSize]);

  // 드롭다운 옵션 생성
  const sortedPageSizeOptions = React.useMemo(() => {
    const allOptions = [...pageSizeOptions];

    if (!pageSizeOptions.includes(pageSize)) {
      allOptions.push(pageSize);
    }

    allOptions.sort((a, b) => a - b);

    return allOptions.map((size) => ({
      value: size,
      label: `${size}개${!pageSizeOptions.includes(size) ? ' (사용자 설정)' : ''}`
    }));
  }, [pageSize, pageSizeOptions]);

  // 간단한 컬럼을 상세 컬럼으로 변환
  const processedColumns: TableColumn[] = React.useMemo(() => {
    if (detailedColumns) return detailedColumns;

    if (simpleColumns) {
      return simpleColumns.map((col, index) => ({
        key: col.key,
        label: col.label,
        render: col.render,
        width: index === 0 ? '120px' : index === simpleColumns.length - 1 ? '180px' : '150px',
        align: 'center' // 모든 항목을 중앙 정렬로 변경
      }));
    }

    return [];
  }, [detailedColumns, simpleColumns]);

  const renderCell = (column: TableColumn, row: T): React.ReactNode => {
    if (column.render) {
      return column.render(row[column.key], row);
    }
    const value = row[column.key];
    if (value === null || value === undefined) {
      return '';
    }
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      return String(value);
    }
    return String(value);
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setIsCustomInput(false);
    if (onPageSizeChange) {
      onPageSizeChange(newSize);
    }
  };

  const handleCustomPageSizeSubmit = () => {
    const customSize = parseInt(customPageSize, 10);
    if (customSize > 0 && customSize <= 1000) {
      setPageSize(customSize);
      setIsCustomInput(false);
      setCustomPageSize('');
      if (onPageSizeChange) {
        onPageSizeChange(customSize);
      }
    } else {
      alert('1~1000 사이의 숫자를 입력해주세요.');
    }
  };

  const handleCustomInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCustomPageSizeSubmit();
    } else if (e.key === 'Escape') {
      setIsCustomInput(false);
      setCustomPageSize('');
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filterValues, [key]: value };
    setFilterValues(newFilters);
    if (onFiltersChange) {
      onFiltersChange(newFilters);
    }
  };

  const handleResetFilters = () => {
    const resetFilters: Record<string, string> = {};
    filters.forEach((filter) => {
      resetFilters[filter.key] = '';
    });
    setFilterValues(resetFilters);
    if (onFiltersChange) {
      onFiltersChange(resetFilters);
    }
  };

  const renderPagination = () => {
    const { currentPage, totalPages } = pagination;
    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(0, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(0, endPage - maxVisiblePages + 1);
    }

    // 이전 버튼
    pages.push(
      <button
        key="prev"
        className={`${styles.paginationButton} ${currentPage === 0 ? styles.disabled : ''}`}
        onClick={() => currentPage > 0 && onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
      >
        이전
      </button>
    );

    // 첫 페이지
    if (startPage > 0) {
      pages.push(
        <button
          key={0}
          className={`${styles.paginationButton} ${currentPage === 0 ? styles.active : ''}`}
          onClick={() => onPageChange(0)}
        >
          1
        </button>
      );

      if (startPage > 1) {
        pages.push(
          <span
            key="ellipsis1"
            className={styles.paginationButton}
            style={{ cursor: 'default', border: 'none' }}
          >
            ...
          </span>
        );
      }
    }

    // 페이지 번호들
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`${styles.paginationButton} ${currentPage === i ? styles.active : ''}`}
          onClick={() => onPageChange(i)}
        >
          {i + 1}
        </button>
      );
    }

    // 마지막 페이지
    if (endPage < totalPages - 1) {
      if (endPage < totalPages - 2) {
        pages.push(
          <span
            key="ellipsis2"
            className={styles.paginationButton}
            style={{ cursor: 'default', border: 'none' }}
          >
            ...
          </span>
        );
      }

      pages.push(
        <button
          key={totalPages - 1}
          className={`${styles.paginationButton} ${currentPage === totalPages - 1 ? styles.active : ''}`}
          onClick={() => onPageChange(totalPages - 1)}
        >
          {totalPages}
        </button>
      );
    }

    // 다음 버튼
    pages.push(
      <button
        key="next"
        className={`${styles.paginationButton} ${currentPage === totalPages - 1 ? styles.disabled : ''}`}
        onClick={() => currentPage < totalPages - 1 && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
      >
        다음
      </button>
    );

    return pages;
  };

  // 에러 처리
  if (error) {
    return (
      <div className={`${styles.tableContainer} ${fullWidth ? styles.fullWidth : ''} ${className}`}>
        {title && (
          <div className={styles.header}>
            <h1>{title}</h1>
          </div>
        )}
        <div className={styles.errorContainer}>
          <p>{errorMessage}</p>
          {onRetry && (
            <button onClick={onRetry} className={styles.retryButton}>
              다시 시도
            </button>
          )}
        </div>
      </div>
    );
  }

  const showPagination = showPaginationAlways || pagination.totalPages > 1;

  return (
    <div className={`${styles.tableContainer} ${fullWidth ? styles.fullWidth : ''} ${className}`}>
      {/* 헤더 영역 */}
      {(title || summary || showAddButton) && (
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            {title && <h1>{title}</h1>}
            {summary && <div className={styles.summary}>{summary}</div>}
          </div>
          {showAddButton && onAddClick && (
            <div className={styles.headerRight}>
              <button onClick={onAddClick} className={styles.addButton}>
                + {addButtonText}
              </button>
            </div>
          )}
        </div>
      )}

      {/* 필터 영역 */}
      {showFilterBar && filters.length > 0 && (
        <div className={styles.filterContainer}>
          {filters.map((filter) => (
            <div key={filter.key} className={styles.filterGroup}>
              <label htmlFor={filter.key}>{filter.label}:</label>
              {filter.type === 'select' ? (
                <select
                  id={filter.key}
                  value={filterValues[filter.key] || ''}
                  onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                  className={styles.filterSelect}
                >
                  {filter.options?.map((option, index) => (
                    <option key={option.value || `empty-${index}`} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={filter.key}
                  type={filter.type}
                  value={filterValues[filter.key] || ''}
                  onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                  placeholder={filter.placeholder}
                  className={styles.filterInput}
                />
              )}
            </div>
          ))}
          <button onClick={handleResetFilters} className={styles.resetButton}>
            필터 초기화
          </button>
        </div>
      )}

      {/* 로딩 오버레이 */}
      {loading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingSpinner}>
            <div className={styles.spinner}></div>
            <span>데이터를 불러오는 중...</span>
          </div>
        </div>
      )}

      <div className={styles.tableScrollWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              {processedColumns.map((column) => (
                <th
                  key={column.key}
                  className={column.align ? styles[column.align] : ''}
                  style={{ width: column.width }}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={processedColumns.length} className={styles.empty}>
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr key={index}>
                  {processedColumns.map((column) => (
                    <td key={column.key} className={column.align ? styles[column.align] : ''}>
                      {renderCell(column, row)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showPagination && (
        <div className={styles.paginationContainer}>
          <div className={styles.paginationControls}>{renderPagination()}</div>

          <div className={styles.paginationInfo}>
            <div className={styles.pageSize}>
              <span>페이지당 </span>
              {isCustomInput ? (
                <div className={styles.customPageSize}>
                  <input
                    type="number"
                    value={customPageSize}
                    onChange={(e) => setCustomPageSize(e.target.value)}
                    onKeyDown={handleCustomInputKeyPress}
                    placeholder="직접 입력"
                    className={styles.customInput}
                    min="1"
                    max="1000"
                    autoFocus
                  />
                  <button onClick={handleCustomPageSizeSubmit} className={styles.customSubmitBtn}>
                    ✓
                  </button>
                  <button
                    onClick={() => {
                      setIsCustomInput(false);
                      setCustomPageSize('');
                    }}
                    className={styles.customCancelBtn}
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div className={styles.pageSizeSelector}>
                  <select
                    value={pageSize}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === 'custom') {
                        setIsCustomInput(true);
                      } else {
                        handlePageSizeChange(Number(value));
                      }
                    }}
                    className={styles.pageSizeSelect}
                  >
                    {sortedPageSizeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                    <option value="custom">직접 입력...</option>
                  </select>
                </div>
              )}
            </div>
            <div className={styles.pageInfo}>
              총 {pagination.totalElements}개 중 {pagination.currentPage + 1} /{' '}
              {pagination.totalPages} 페이지
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminTable;
