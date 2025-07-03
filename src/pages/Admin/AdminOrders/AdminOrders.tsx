import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import AdminTable from '@/components/atoms/Table/AdminTable/AdminTable';
import AdminEditModal from '@/components/Modals/AdminEditModal';
import { useAdminPagination } from '@/hooks/useAdminPagination';
import { useGetApi } from '@/hooks/useGetAPI';
import { usePatchApi } from '@/hooks/usePatchAPI';
import { handleApiError } from '@/lib/handleApiError';
import type { SimpleColumn } from '@/types/adminTable.types';
import type { AdminOrder, AdminOrderDetail } from '@/types/api/AdminOrder.type';
import {
  createOrderDetailEditFields,
  formatDateTime,
  getOrderStatusText
} from '@/utils/adminModalUtils';

import styles from './AdminOrders.module.scss';

const STATUS_COLOR_MAP = {
  PENDING: styles.statusPending,
  PAID: styles.statusPaid,
  CANCELLED: styles.statusCancelled
} as const;

const AdminOrdersPage = () => {
  const navigate = useNavigate();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
  const [orderDetailData, setOrderDetailData] = useState<AdminOrderDetail | null>(null);

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
        setOrderDetailData(null);
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

  // 상태 변환 함수
  const getStatusText = getOrderStatusText;

  // 상태 렌더링 함수
  const renderStatus = (status: string): React.ReactNode => {
    const statusText = getStatusText(status);
    const colorClass = STATUS_COLOR_MAP[status as keyof typeof STATUS_COLOR_MAP] || '';

    return <span className={`${styles.statusBadge} ${colorClass}`}>{statusText}</span>;
  };

  // 수정 버튼 클릭 핸들러 (상세 정보 조회 후 모달 표시)
  const handleEditClick = async (order: AdminOrder) => {
    // 먼저 selectedOrder를 설정하고 약간의 지연을 줍니다
    setSelectedOrder(order);

    try {
      // 직접 API 호출로 변경 (Hook의 dependency 문제 해결)
      const { api } = await import('@/lib/api');
      const response = await api.get(`/admin/orders/${order.orderId}`);

      if (response.data?.success && response.data?.data) {
        setOrderDetailData(response.data.data as AdminOrderDetail);
        setEditModalOpen(true);
      } else {
        throw new Error('상세 정보를 불러올 수 없습니다.');
      }
    } catch (error) {
      console.error('주문 상세 조회 에러:', error);
      handleApiError(error, navigate, '/admin/orders', {
        useToast: true,
        defaultMessage: '주문 상세 정보를 불러오는 중 오류가 발생했습니다.'
      });
      // 에러 발생 시 selectedOrder 초기화
      setSelectedOrder(null);
    }
  };

  // 주문 상태 저장 핸들러
  const handleOrderSave = async (changedData: Record<string, string | number>) => {
    if (!selectedOrder) return;

    // status만 추출하고 타입 검증
    const status = changedData.status as 'PENDING' | 'PAID' | 'CANCELLED';
    const updateData = { status };
    await patchOrderMutation.mutateAsync(updateData);
  };

  // 모달 닫기 핸들러
  const handleModalClose = () => {
    setEditModalOpen(false);
    setSelectedOrder(null);
    setOrderDetailData(null);
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
      render: (value) => formatDateTime(value as string)
    },
    {
      key: 'updatedAt',
      label: '변경일',
      render: (value) => formatDateTime(value as string | null)
    },
    {
      key: 'actions',
      label: '작업',
      render: (_, row) => {
        const order = row as unknown as AdminOrder;

        return (
          <div className={styles.actionButtons}>
            <button className={styles.editButton} onClick={() => handleEditClick(order)}>
              수정하기
            </button>
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

      {/* 주문 수정 모달 (상세 정보 포함) */}
      {editModalOpen && selectedOrder && orderDetailData && (
        <AdminEditModal
          isOpen={editModalOpen}
          title={`주문 상세 정보 및 수정 - 주문 ID: ${selectedOrder.orderId}`}
          fields={createOrderDetailEditFields(orderDetailData)}
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
