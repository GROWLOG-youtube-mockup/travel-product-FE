import { useEffect } from 'react';

import AdminTable from '@/components/atoms/Table/AdminTable/AdminTable';
import { useAdminPagination } from '@/hooks/useAdminPagination';
import { useGetApi } from '@/hooks/useGetAPI';
import type { SimpleColumn } from '@/types/adminTable.types';
import type { AdminLog } from '@/types/api/AdminLog.type';

import styles from './AdminLogs.module.scss';

const ACTION_TYPE_MAP = {
  0: '생성',
  1: '수정',
  2: '삭제',
  3: '조회'
} as const;

const AdminLogsPage = () => {
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
  if (filterValues.userId) {
    finalApiParams.user_id = parseInt(filterValues.userId, 10);
  }
  if (filterValues.actionType) {
    finalApiParams.actionType = parseInt(filterValues.actionType, 10);
  }

  // useGetApi 사용. API 호출
  const { data, isLoading, error } = useGetApi('/admin/logs', finalApiParams);

  // API 응답 시 페이지네이션 업데이트
  useEffect(() => {
    if (data?.data) {
      updatePagination({
        totalPages: data.data.totalPages || 0,
        totalElements: data.data.totalElements || 0
      });
    }
  }, [data, updatePagination]);

  // timestamp 포맷팅 함수 (비즈니스 로직)
  const formatTimestamp = (timestamp: string): string => {
    try {
      return timestamp.replace('T', ' ');
    } catch {
      return timestamp;
    }
  };

  // actionType 변환 함수 (비즈니스 로직)
  const getActionTypeText = (actionType: number): string => {
    return (
      ACTION_TYPE_MAP[actionType as keyof typeof ACTION_TYPE_MAP] || `알 수 없음(${actionType})`
    );
  };

  // 간단한 컬럼 정의
  const simpleColumns: SimpleColumn[] = [
    {
      key: 'logId',
      label: '로그 ID'
    },
    {
      key: 'userId',
      label: '사용자 ID'
    },
    {
      key: 'actionType',
      label: '액션',
      render: (value) => getActionTypeText(value as number)
    },
    {
      key: 'targetId',
      label: '대상 ID'
    },
    {
      key: 'timestamp',
      label: '시간',
      render: (value) => formatTimestamp(value as string)
    }
  ];

  return (
    <div className={styles.container}>
      <AdminTable<AdminLog>
        title="운영 로그 관리"
        summary={`총 ${pagination.totalElements}개의 로그`}
        simpleColumns={simpleColumns}
        data={data?.data?.content || []}
        pagination={pagination}
        loading={isLoading}
        error={error}
        onRetry={() => window.location.reload()}
        errorMessage="로그 데이터를 불러오는 중 오류가 발생했습니다. 로그아웃 후 재로그인을 권장합니다."
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        currentPageSize={apiParams.size as number}
        pageSizeOptions={[5, 10, 20, 50]}
        showPaginationAlways={true}
        emptyMessage="운영 로그가 없습니다."
        fullWidth={true}
        // 필터 기능
        showFilterBar={true}
        filters={[
          {
            key: 'userId',
            label: '사용자 ID',
            type: 'number',
            placeholder: '사용자 ID 입력'
          },
          {
            key: 'actionType',
            label: '액션 타입',
            type: 'select',
            options: [
              { value: '', label: '전체' },
              { value: '0', label: '생성' },
              { value: '1', label: '수정' },
              { value: '2', label: '삭제' },
              { value: '3', label: '조회' }
            ]
          }
        ]}
        onFiltersChange={handleFiltersChange}
      />
    </div>
  );
};

export default AdminLogsPage;
