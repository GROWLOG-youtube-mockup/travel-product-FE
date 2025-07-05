// 현재 날짜 포맷팅
const getTodayString = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = renderToString(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
import { useEffect, useState } from 'react';
import { renderToString } from 'react-dom/server';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import AdminTable from '@/components/atoms/Table/AdminTable/AdminTable';
import AdminEditModal from '@/components/Modals/AdminEditModal';
import { useAdminPagination } from '@/hooks/useAdminPagination';
import { useGetApi } from '@/hooks/useGetAPI';
import { usePatchApi } from '@/hooks/usePatchAPI';
import { handleApiError } from '@/lib/handleApiError';
import type { SimpleColumn } from '@/types/adminTable.types';
import type { AdminOrder } from '@/types/api/AdminOrder.type';
import { createOrderEditFields, getOrderStatusText } from '@/utils/adminModalUtils';

import styles from './AdminOrders.module.scss';

const AdminOrdersPage = () => {
  const navigate = useNavigate();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
  const [dateValidationError, setDateValidationError] = useState<string>('');

  const {
    apiParams,
    pagination,
    handlePageChange,
    handlePageSizeChange,
    handleFiltersChange,
    getFilterValues,
    updatePagination
  } = useAdminPagination({
    defaultPageSize: 10,
    pageSizeOptions: [5, 10, 20, 50]
  });

  // 현재 필터 값들
  const filterValues = getFilterValues();

  // 날짜 유효성 검사
  const validateDateRange = (startDate: string, endDate: string): string => {
    if (!startDate && !endDate) {
      return ''; // 둘 다 비어있으면 유효함
    }

    if (!startDate && endDate) {
      return '종료일을 설정하려면 시작일을 먼저 선택해주세요.';
    }

    // 둘 다 있을 때 날짜 비교
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (end < start) {
        return '종료일은 시작일보다 늦어야 합니다.';
      }
    }

    return ''; // 시작일만 있거나, 둘 다 있고 유효한 경우
  };

  // 날짜 필터 변경 시 유효성 검사
  useEffect(() => {
    const error = validateDateRange(filterValues.startDate || '', filterValues.endDate || '');
    setDateValidationError(error);

    // Toast 팝업 제거 - 안내 섹션으로만 표시
  }, [filterValues.startDate, filterValues.endDate]);

  // API 호출 파라미터에 필터 추가
  const finalApiParams: Record<string, unknown> = { ...apiParams };

  // 상태 필터는 항상 적용
  if (filterValues.status) {
    finalApiParams.status = filterValues.status;
  }

  // 날짜 필터는 유효성 검사 통과한 경우에만 적용
  if (!dateValidationError) {
    if (filterValues.startDate) {
      finalApiParams.startDate = filterValues.startDate;
    }
    if (filterValues.endDate) {
      finalApiParams.endDate = filterValues.endDate;
    }
  }

  // useGetApi 사용. API 호출
  const { data, isLoading, error, refetch } = useGetApi('/admin/orders', finalApiParams);

  // PATCH API 훅
  const patchOrderMutation = usePatchApi(
    selectedOrder ? `/admin/orders/${selectedOrder.orderId}` : '/admin/orders/0',
    {
      onSuccess: () => {
        toast.success('주문 정보가 성공적으로 수정되었습니다.');
        setEditModalOpen(false);
        setSelectedOrder(null);
        refetch();
      },
      onError: (error) => {
        handleApiError(error, navigate, '/admin/orders', {
          useToast: true,
          defaultMessage: '주문 정보 수정 중 오류가 발생했습니다.'
        });
      }
    }
  );

  // API 응답 시 페이지네이션 업데이트
  useEffect(() => {
    if (data?.data) {
      updatePagination({
        totalPages: data.data.totalPages || 0,
        totalElements: data.data.totalElements || 0
      });
    }
  }, [data, updatePagination]);

  // 에러 처리
  useEffect(() => {
    if (error) {
      handleApiError(error, navigate, '/admin/orders', {
        useToast: true,
        defaultMessage: '주문 데이터를 불러오는 중 오류가 발생했습니다.'
      });
    }
  }, [error, navigate]);

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string | null): string => {
    if (!dateString) return '-';
    try {
      return dateString.replace('T', ' ');
    } catch {
      return dateString;
    }
  };

  // 수정 버튼 클릭 핸들러
  const handleEditClick = (order: AdminOrder) => {
    setSelectedOrder(order);
    setEditModalOpen(true);
  };

  // 주문 정보 저장 핸들러
  const handleOrderSave = async (changedData: Record<string, string | number>) => {
    if (!selectedOrder) return;

    await patchOrderMutation.mutateAsync(changedData);
  };

  // 모달 닫기 핸들러
  const handleModalClose = () => {
    setEditModalOpen(false);
    setSelectedOrder(null);
  };

  // 간단한 컬럼 정의
  const simpleColumns: SimpleColumn[] = [
    {
      key: 'orderId',
      label: '주문 ID'
    },
    {
      key: 'userName',
      label: '주문자명'
    },
    {
      key: 'userEmail',
      label: '이메일'
    },
    {
      key: 'status',
      label: '주문 상태',
      render: (value) => {
        const status = value as string;
        const statusText = getOrderStatusText(status);
        return <span className={styles[`status-${status.toLowerCase()}`]}>{statusText}</span>;
      }
    },
    {
      key: 'peopleCount',
      label: '인원수',
      render: (value) => `${value}명`
    },
    {
      key: 'orderDate',
      label: '주문일',
      render: (value) => formatDate(value as string)
    },
    {
      key: 'cancelDate',
      label: '취소일',
      render: (value) => formatDate(value as string | null)
    },
    {
      key: 'actions',
      label: '작업',
      render: (_, row) => {
        const order = row as unknown as AdminOrder;

        return (
          <div className={styles.actionButtons}>
            <button className={styles.editButton} onClick={() => handleEditClick(order)}>
              상태 변경
            </button>
          </div>
        );
      }
    }
  ];

  return (
    <div className={styles.container}>
      {/* 날짜 필터 안내 메시지 */}
      {(filterValues.startDate || filterValues.endDate) && (
        <div
          className={`${styles.dateFilterInfo} ${dateValidationError ? styles.error : styles.info}`}
        >
          {dateValidationError ? (
            <span className={styles.errorText}>⚠️ {dateValidationError}</span>
          ) : (
            <span className={styles.infoText}>
              📅{' '}
              {filterValues.startDate && !filterValues.endDate
                ? `${filterValues.startDate} ~ ${getTodayString()} (오늘)까지의 주문을 표시합니다.`
                : filterValues.startDate && filterValues.endDate
                  ? `${filterValues.startDate} ~ ${filterValues.endDate} 기간의 주문을 표시합니다.`
                  : filterValues.endDate && !filterValues.startDate
                    ? '⚠️ 시작일을 먼저 선택해주세요.'
                    : '날짜 필터가 설정되었습니다.'}
            </span>
          )}
        </div>
      )}

      <AdminTable<AdminOrder>
        title="주문 관리"
        summary={`총 ${pagination.totalElements}개의 주문`}
        simpleColumns={simpleColumns}
        data={data?.data?.content || []}
        pagination={pagination}
        loading={isLoading}
        onRetry={() => refetch()}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        currentPageSize={apiParams.size as number}
        pageSizeOptions={[5, 10, 20, 50]}
        showPaginationAlways={true}
        emptyMessage="주문이 없습니다."
        fullWidth={true}
        // 필터 기능
        showFilterBar={true}
        filters={[
          {
            key: 'status',
            label: '상태',
            type: 'select',
            options: [
              { value: '', label: '전체' },
              { value: 'PENDING', label: '대기중' },
              { value: 'PAID', label: '결제완료' },
              { value: 'CANCELLED', label: '취소됨' }
            ]
          },
          {
            key: 'startDate',
            label: '시작일',
            type: 'date',
            placeholder: '시작일만 선택하면 해당 날짜만 검색'
          },
          {
            key: 'endDate',
            label: '종료일',
            type: 'date',
            placeholder: '시작일 선택 후 종료일 설정 가능'
          }
        ]}
        onFiltersChange={handleFiltersChange}
      />

      {/* 수정 모달 */}
      {editModalOpen && selectedOrder && (
        <AdminEditModal
          isOpen={editModalOpen}
          title={`주문 정보 수정 - 주문 ID: ${selectedOrder.orderId}`}
          fields={createOrderEditFields(selectedOrder)}
          loading={patchOrderMutation.isPending}
          onClose={handleModalClose}
          onSave={handleOrderSave}
          saveButtonText="수정 완료"
          cancelButtonText="닫기"
        />
      )}
    </div>
  );
};

export default AdminOrdersPage;
