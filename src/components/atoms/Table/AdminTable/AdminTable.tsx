import React, { useState } from 'react';

import DatePicker from '@/components/atoms/DatePicker/DatePicker';
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
        align: 'center'
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

  // 페이지 변경 시 스크롤을 테이블 상단으로 부드럽게 이동
  const handlePageChangeWithScroll = (pageIndex: number) => {
    // 테이블 컨테이너 찾기
    const tableContainer = document.querySelector(`.${styles.tableContainer}`);
    if (tableContainer) {
      // 부드러운 스크롤 애니메이션
      tableContainer.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }

    // 약간의 지연 후 페이지 변경 (스크롤 애니메이션과 겹치지 않도록)
    setTimeout(() => {
      onPageChange(pageIndex);
    }, 100);
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

  // 페이지 점프 핸들러
  const handlePageJump = () => {
    const { totalPages } = pagination;
    const input = prompt(`페이지 번호를 입력하세요 (1-${totalPages}):`);
    if (input) {
      const pageNum = parseInt(input, 10);
      if (pageNum >= 1 && pageNum <= totalPages) {
        onPageChange(pageNum - 1);
      } else {
        alert(`1부터 ${totalPages} 사이의 숫자를 입력해주세요.`);
      }
    }
  };

  // 프로그레스 슬라이더 핸들러
  const handleProgressSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { totalPages } = pagination;
    const percentage = parseInt(e.target.value, 10);
    const targetPage = Math.round((percentage / 100) * (totalPages - 1));
    handlePageChangeWithScroll(Math.max(0, Math.min(targetPage, totalPages - 1)));
  };

  const renderPagination = () => {
    const { currentPage, totalPages } = pagination;
    const pages = [];
    const maxVisiblePages = 3;
    const sidePages = Math.floor(maxVisiblePages / 2);

    // 첫 페이지로 이동 버튼 (항상 표시)
    pages.push(
      <button
        key="first"
        className={`${styles.paginationButton} ${styles.navButton} ${currentPage === 0 ? styles.disabled : ''}`}
        onClick={() => currentPage > 0 && handlePageChangeWithScroll(0)}
        disabled={currentPage === 0}
        title="첫 페이지로"
      >
        <span className={styles.navIcon}>⟪</span>
      </button>
    );

    // 이전 버튼
    pages.push(
      <button
        key="prev"
        className={`${styles.paginationButton} ${styles.navButton} ${currentPage === 0 ? styles.disabled : ''}`}
        onClick={() => currentPage > 0 && handlePageChangeWithScroll(currentPage - 1)}
        disabled={currentPage === 0}
        title="이전 페이지"
      >
        <span className={styles.navIcon}>⟨</span>
        <span className={styles.navText}>이전</span>
      </button>
    );

    // 페이지가 적을 때 (모든 페이지 표시)
    if (totalPages <= maxVisiblePages) {
      for (let i = 0; i < totalPages; i++) {
        pages.push(
          <button
            key={i}
            className={`${styles.paginationButton} ${styles.pageNumber} ${currentPage === i ? styles.active : ''}`}
            onClick={() => handlePageChangeWithScroll(i)}
            title={`${i + 1}페이지로 이동`}
          >
            {i + 1}
          </button>
        );
      }
    } else {
      // 페이지가 많을 때 (스마트 페이지네이션)
      let startPage: number;
      let endPage: number;

      // 현재 페이지가 앞쪽에 있을 때
      if (currentPage <= sidePages) {
        startPage = 0;
        endPage = maxVisiblePages - 1;
      }
      // 현재 페이지가 뒤쪽에 있을 때
      else if (currentPage >= totalPages - sidePages - 1) {
        startPage = totalPages - maxVisiblePages;
        endPage = totalPages - 1;
      }
      // 현재 페이지가 중간에 있을 때
      else {
        startPage = currentPage - sidePages;
        endPage = currentPage + sidePages;
      }

      // 첫 페이지 (시작 페이지가 0이 아닐 때만)
      if (startPage > 0) {
        pages.push(
          <button
            key={0}
            className={`${styles.paginationButton} ${styles.pageNumber} ${currentPage === 0 ? styles.active : ''}`}
            onClick={() => handlePageChangeWithScroll(0)}
            title="1페이지로 이동"
          >
            1
          </button>
        );

        // 첫 페이지와 시작 페이지 사이에 간격이 있으면 생략 표시
        if (startPage > 1) {
          const ellipsisStart = startPage === 2 ? 1 : Math.floor((0 + startPage) / 2);
          pages.push(
            <button
              key="ellipsis-start"
              className={`${styles.paginationButton} ${styles.ellipsis}`}
              onClick={() => handlePageChangeWithScroll(ellipsisStart)}
              title={`페이지 ${ellipsisStart + 1}로 이동`}
            >
              ...
            </button>
          );
        }
      }

      // 중간 페이지들
      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <button
            key={i}
            className={`${styles.paginationButton} ${styles.pageNumber} ${currentPage === i ? styles.active : ''}`}
            onClick={() => handlePageChangeWithScroll(i)}
            title={`${i + 1}페이지로 이동`}
          >
            {i + 1}
          </button>
        );
      }

      // 마지막 페이지 (끝 페이지가 마지막이 아닐 때만)
      if (endPage < totalPages - 1) {
        // 끝 페이지와 마지막 페이지 사이에 간격이 있으면 생략 표시
        if (endPage < totalPages - 2) {
          const ellipsisEnd =
            endPage === totalPages - 3 ? totalPages - 2 : Math.ceil((endPage + totalPages - 1) / 2);

          pages.push(
            <button
              key="ellipsis-end"
              className={`${styles.paginationButton} ${styles.ellipsis}`}
              onClick={() => handlePageChangeWithScroll(ellipsisEnd)}
              title={`페이지 ${ellipsisEnd + 1}로 이동`}
            >
              ...
            </button>
          );
        }

        pages.push(
          <button
            key={totalPages - 1}
            className={`${styles.paginationButton} ${styles.pageNumber} ${currentPage === totalPages - 1 ? styles.active : ''}`}
            onClick={() => handlePageChangeWithScroll(totalPages - 1)}
            title={`${totalPages}페이지로 이동`}
          >
            {totalPages}
          </button>
        );
      }
    }

    // 다음 버튼
    pages.push(
      <button
        key="next"
        className={`${styles.paginationButton} ${styles.navButton} ${currentPage === totalPages - 1 ? styles.disabled : ''}`}
        onClick={() => currentPage < totalPages - 1 && handlePageChangeWithScroll(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
        title="다음 페이지"
      >
        <span className={styles.navText}>다음</span>
        <span className={styles.navIcon}>⟩</span>
      </button>
    );

    // 마지막 페이지로 이동 버튼 (항상 표시)
    pages.push(
      <button
        key="last"
        className={`${styles.paginationButton} ${styles.navButton} ${currentPage === totalPages - 1 ? styles.disabled : ''}`}
        onClick={() => currentPage < totalPages - 1 && handlePageChangeWithScroll(totalPages - 1)}
        disabled={currentPage === totalPages - 1}
        title="마지막 페이지로"
      >
        <span className={styles.navIcon}>⟫</span>
      </button>
    );

    // 페이지 점프 버튼 (페이지가 많을 때만 표시)
    if (totalPages > 20) {
      pages.push(
        <button
          key="jump"
          className={`${styles.paginationButton} ${styles.jumpButton}`}
          onClick={handlePageJump}
          title="원하는 페이지로 바로 이동"
        >
          이동
        </button>
      );
    }

    return pages;
  };

  // 상세 페이지 정보 렌더링
  const renderDetailedPageInfo = () => {
    const { currentPage, totalPages } = pagination;

    // 프로그레스 슬라이더를 위한 현재 위치 계산
    const progressPercentage = totalPages > 1 ? (currentPage / (totalPages - 1)) * 100 : 0;

    return (
      <div className={styles.detailedPageInfo}>
        <span className={styles.pageRange}>
          {currentPage + 1} / {totalPages} 페이지
        </span>
        {totalPages > 1 && (
          <div className={styles.progressContainer}>
            <div className={styles.progressSliderContainer}>
              <div className={styles.progressTrack} />
              <input
                type="range"
                min="0"
                max="100"
                value={progressPercentage}
                onChange={handleProgressSliderChange}
                className={styles.progressSlider}
                title={`현재 위치: ${Math.round(progressPercentage)}%`}
              />
            </div>
            <span className={styles.progressText}>{Math.round(progressPercentage)}%</span>
          </div>
        )}
      </div>
    );
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
              ) : filter.type === 'date' ? (
                <DatePicker
                  value={filterValues[filter.key] || ''}
                  onChange={(value) => handleFilterChange(filter.key, value)}
                  placeholder={filter.placeholder || 'YYYY-MM-DD'}
                  className={styles.filterDatePicker}
                />
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
            {renderDetailedPageInfo()}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminTable;
