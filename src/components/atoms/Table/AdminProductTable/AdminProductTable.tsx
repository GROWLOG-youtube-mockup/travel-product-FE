import { useMemo } from 'react';

import styles from './AdminProductTable.module.scss';

interface Column<T> {
  header: string;
  accessor: keyof T | string;
  render?: (row: T) => React.ReactNode;
  width?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
  onDelete?: (row: T) => void;
  onViewEdit?: (row: T) => void; // 상세보기와 수정을 합친 기능
}

export function AdminTable<T>({
  columns,
  data,
  page,
  pageSize,
  totalCount,
  totalPages: externalTotalPages,
  currentPage,
  onPageChange,
  onDelete,
  onViewEdit
}: TableProps<T>) {
  const totalPages = useMemo(
    () => externalTotalPages || Math.ceil(totalCount / pageSize),
    [externalTotalPages, totalCount, pageSize]
  );

  const startItem = (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, totalCount);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* 헤더 섹션 */}
        <div className={styles.header}>
          <div className={styles.headerCard}>
            <div className={styles.headerContent}>
              <div>
                <h2 className={styles.title}>상품 관리</h2>
                <p className={styles.subtitle}>
                  총 <span className={styles.highlight}>{totalCount.toLocaleString()}</span>개 상품
                  {totalCount > 0 && (
                    <span className={styles.range}>
                      ({startItem}-{endItem} 표시)
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 테이블 섹션 */}
        <div className={styles.tableCard}>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead className={styles.tableHead}>
                <tr>
                  {columns.map((col, i) => (
                    <th key={i} style={{ width: col.width }} className={styles.tableHeader}>
                      {col.header}
                    </th>
                  ))}
                  {onViewEdit && (
                    <th className={`${styles.tableHeader} ${styles.actionHeader}`}>관리</th>
                  )}
                  {onDelete && (
                    <th className={`${styles.tableHeader} ${styles.actionHeader}`}>삭제</th>
                  )}
                </tr>
              </thead>
              <tbody className={styles.tableBody}>
                {data.length > 0 ? (
                  data.map((row, rowIdx) => (
                    <tr key={rowIdx} className={styles.tableRow}>
                      {columns.map((col, colIdx) => (
                        <td key={colIdx} className={styles.tableCell}>
                          {col.render ? col.render(row) : String(row[col.accessor as keyof T])}
                        </td>
                      ))}
                      {onViewEdit && (
                        <td className={`${styles.tableCell} ${styles.actionCell}`}>
                          <button onClick={() => onViewEdit(row)} className={styles.editBtn}>
                            <svg
                              className={styles.btnIcon}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                              />
                            </svg>
                            편집
                          </button>
                        </td>
                      )}
                      {onDelete && (
                        <td className={`${styles.tableCell} ${styles.actionCell}`}>
                          <button onClick={() => onDelete(row)} className={styles.deleteBtn}>
                            <svg
                              className={styles.btnIcon}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                            삭제
                          </button>
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={columns.length + (onDelete ? 1 : 0) + (onViewEdit ? 1 : 0)}
                      className={styles.noData}
                    >
                      <div className={styles.noDataContent}>
                        <svg
                          className={styles.noDataIcon}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                          />
                        </svg>
                        <p className={styles.noDataTitle}>상품이 없습니다</p>
                        <p className={styles.noDataText}>새로운 상품을 추가해보세요</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div className={styles.pagination}>
              <div className={styles.paginationContent}>
                <div className={styles.paginationMobile}>
                  <button
                    onClick={() => onPageChange(page - 1)}
                    disabled={page <= 1}
                    className={styles.paginationBtn}
                  >
                    이전
                  </button>
                  <button
                    onClick={() => onPageChange(page + 1)}
                    disabled={page >= totalPages}
                    className={styles.paginationBtn}
                  >
                    다음
                  </button>
                </div>
                <div className={styles.paginationDesktop}>
                  <div className={styles.paginationInfo}>
                    <p>
                      총 <span>{totalCount}</span>개 중 <span>{startItem}</span>-
                      <span>{endItem}</span> 표시
                    </p>
                  </div>
                  <div className={styles.paginationNav}>
                    <button
                      onClick={() => onPageChange(page - 1)}
                      disabled={page <= 1}
                      className={`${styles.paginationArrow} ${styles.paginationArrowLeft}`}
                    >
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>

                    {/* 페이지 번호들 */}
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNum = Math.max(1, Math.min(totalPages - 4, page - 2)) + i;
                      if (pageNum > totalPages) return null;

                      return (
                        <button
                          key={pageNum}
                          onClick={() => onPageChange(pageNum)}
                          className={`${styles.paginationNumber} ${
                            pageNum === (currentPage || page) ? styles.paginationNumberActive : ''
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    <button
                      onClick={() => onPageChange(page + 1)}
                      disabled={page >= totalPages}
                      className={`${styles.paginationArrow} ${styles.paginationArrowRight}`}
                    >
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
