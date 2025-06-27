import React from 'react';

import type { AdminTableProps, TableColumn } from '@/types/adminTable.types';

import styles from './AdminTable.module.scss';

function AdminTable<T extends Record<string, unknown>>({
  columns,
  data,
  pagination,
  loading = false,
  onPageChange,
  emptyMessage = '데이터가 없습니다.',
  className = ''
}: AdminTableProps<T>) {
  const renderCell = (column: TableColumn, row: T): React.ReactNode => {
    if (column.render) {
      return column.render(row[column.key], row);
    }
    const value = row[column.key];
    // unknown 타입을 ReactNode로 안전하게 변환
    if (value === null || value === undefined) {
      return '';
    }
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      return String(value);
    }
    return String(value);
  };

  const renderPagination = () => {
    const { currentPage, totalPages } = pagination;
    const pages = [];
    const maxVisiblePages = 5;

    // 시작과 끝 페이지 계산
    let startPage = Math.max(0, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);

    // 끝 페이지가 총 페이지보다 작을 때 시작 페이지 조정
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

  if (loading) {
    return (
      <div className={`${styles.tableContainer} ${className}`}>
        <div className={styles.loading}>로딩 중...</div>
      </div>
    );
  }

  return (
    <div className={`${styles.tableContainer} ${className}`}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((column) => (
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
              <td colSpan={columns.length} className={styles.empty}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td key={column.key} className={column.align ? styles[column.align] : ''}>
                    {renderCell(column, row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {pagination.totalPages > 1 && (
        <div className={styles.paginationContainer}>
          {renderPagination()}
          <div className={styles.paginationInfo}>
            총 {pagination.totalElements}개 중 {pagination.currentPage + 1} /{' '}
            {pagination.totalPages} 페이지
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminTable;
