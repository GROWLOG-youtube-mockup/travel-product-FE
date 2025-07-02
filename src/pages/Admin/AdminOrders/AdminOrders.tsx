import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import AdminTable from '@/components/atoms/Table/AdminTable/AdminTable';
import AdminEditModal from '@/components/Modals/AdminEditModal';
import { useAdminPagination } from '@/hooks/useAdminPagination';
import { useGetApi } from '@/hooks/useGetAPI';
import { usePatchApi } from '@/hooks/usePatchAPI';
import { handleApiError } from '@/lib/handleApiError';
import { useAuthStore } from '@/store/AuthStore';
import type { SimpleColumn } from '@/types/adminTable.types';
import type { AdminOrder } from '@/types/api/AdminOrder.type';
import { createOrderEditFields, getOrderStatusText } from '@/utils/adminModalUtils';

import styles from './AdminOrders.module.scss';

const STATUS_COLOR_MAP = {
  PENDING: styles.statusPending,
  PAID: styles.statusPaid,
  CANCELLED: styles.statusCancelled
} as const;

const AdminOrdersPage = () => {
  const navigate = useNavigate();
  const { roleCode: currentUserRole } = useAuthStore();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewDetailModal, setViewDetailModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);

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

  // API 호출 파라미터에 필터 추가
  const finalApiParams: Record<string, unknown> = { ...apiParams };

  // 필터 적용
  if (filterValues.status) {
    finalApiParams.status = filterValues.status;
  }
  if (filterValues.startDate) {
    finalApiParams.startDate = filterValues.startDate;
  }
  if (filterValues.endDate) {
    finalApiParams.endDate = filterValues.endDate;
  }

  // useGetApi 사용. API 호출
  const { data, isLoading, error, refetch } = useGetApi('/admin/orders', finalApiParams);

  // PATCH API 훅
  const patchOrderMutation = usePatchApi(
    selectedOrder ? `/admin/orders/${selectedOrder.orderId}` : '/admin/orders/0',
    {
      onSuccess: () => {
        toast.success('주문 상태가 성공적으로 수정되었습니다.');
        setEditModalOpen(false);
        setSelectedOrder(null);
        refetch();
      },
      onError: (error) => {
        handleApiError(error, navigate, '/admin/orders', {
          useToast: true,
          defaultMessage: '주문 상태 수정 중 오류가 발생했습니다.'
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

  // 상태 변환 함수
  const getStatusText = getOrderStatusText;

  // 상태 렌더링 함수
  const renderStatus = (status: string): React.ReactNode => {
    const statusText = getStatusText(status);
    const colorClass = STATUS_COLOR_MAP[status as keyof typeof STATUS_COLOR_MAP] || '';

    return <span className={`${styles.statusBadge} ${colorClass}`}>{statusText}</span>;
  };

  // 상세보기 버튼 클릭 핸들러 (AdminEditModal을 읽기 전용으로 사용)
  const handleDetailClick = (order: AdminOrder) => {
    setSelectedOrder(order);
    setViewDetailModal(true);
  };

  // 수정 버튼 클릭 핸들러
  const handleEditClick = (order: AdminOrder) => {
    setSelectedOrder(order);
    setEditModalOpen(true);
  };

  // 주문 상태 저장 핸들러
  const handleOrderSave = async (changedData: Record<string, string | number>) => {
    if (!selectedOrder) return;

    await patchOrderMutation.mutateAsync(changedData);
  };

  // 모달 닫기 핸들러
  const handleModalClose = () => {
    setEditModalOpen(false);
    setViewDetailModal(false);
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
      label: '상태',
      render: (value) => renderStatus(value as string)
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
            <button className={styles.detailButton} onClick={() => handleDetailClick(order)}>
              상세보기
            </button>
            {currentUserRole === 2 && (
              <button className={styles.editButton} onClick={() => handleEditClick(order)}>
                상태수정
              </button>
            )}
          </div>
        );
      }
    }
  ];

  return (
    <div className={styles.container}>
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
            type: 'text',
            placeholder: 'YYYY-MM-DD'
          },
          {
            key: 'endDate',
            label: '종료일',
            type: 'text',
            placeholder: 'YYYY-MM-DD'
          }
        ]}
        onFiltersChange={handleFiltersChange}
      />

      {/* 상세보기 모달 (읽기 전용 AdminEditModal) */}
      {viewDetailModal && selectedOrder && (
        <AdminEditModal
          isOpen={viewDetailModal}
          title={`주문 상세 정보 - 주문 ID: ${selectedOrder.orderId}`}
          fields={createOrderEditFields(selectedOrder).map((field) => ({
            ...field,
            disabled: true
          }))}
          loading={false}
          onClose={handleModalClose}
          onSave={async () => {}} // 빈 함수 (실제로 호출되지 않음)
          saveButtonText="닫기"
          cancelButtonText=""
        />
      )}

      {/* 수정 모달 (최고 관리자만) */}
      {editModalOpen && selectedOrder && currentUserRole === 2 && (
        <AdminEditModal
          isOpen={editModalOpen}
          title={`주문 상태 수정 - 주문 ID: ${selectedOrder.orderId}`}
          fields={createOrderEditFields(selectedOrder)}
          loading={patchOrderMutation.isPending}
          onClose={handleModalClose}
          onSave={handleOrderSave}
          saveButtonText="상태 수정"
          cancelButtonText="닫기"
        />
      )}
    </div>
  );
};

export default AdminOrdersPage;
