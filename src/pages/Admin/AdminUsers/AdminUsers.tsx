import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import AdminTable from '@/components/atoms/Table/AdminTable/AdminTable';
import AdminConfirmModal from '@/components/Modals/AdminConfirmModal';
import AdminEditModal from '@/components/Modals/AdminEditModal';
import { useAdminPagination } from '@/hooks/useAdminPagination';
import { useDeleteApi } from '@/hooks/useDeleteAPI';
import { useGetApi } from '@/hooks/useGetAPI';
import { usePatchApi } from '@/hooks/usePatchAPI';
import { handleApiError } from '@/lib/handleApiError';
import { useAuthStore } from '@/store/AuthStore';
import type { SimpleColumn } from '@/types/adminTable.types';
import type { AdminUser } from '@/types/api/AdminUser.type';
import { createUserEditFields, normalizePhoneForSave } from '@/utils/userModalUtils';

import styles from './AdminUsers.module.scss';

const ROLE_CODE_MAP = {
  0: '일반 사용자',
  1: '일반 관리자',
  2: '최고 관리자'
} as const;

const AdminUsersPage = () => {
  const navigate = useNavigate();
  const { roleCode: currentUserRole } = useAuthStore();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

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

  // 관리자 권한에 따른 자동 필터링
  if (currentUserRole === 1) {
    // 일반 관리자는 일반 사용자만 조회 가능
    finalApiParams.roleCode = 0;
  } else if (filterValues.roleCode) {
    // 최고 관리자는 선택한 roleCode 필터 적용
    finalApiParams.roleCode = parseInt(filterValues.roleCode, 10);
  }

  // useGetApi 사용. API 호출
  const { data, isLoading, error, refetch } = useGetApi('/admin/users', finalApiParams);

  // PATCH API 훅
  const patchUserMutation = usePatchApi(
    selectedUser ? `/admin/users/${selectedUser.userId}` : '/admin/users/0',
    {
      onSuccess: () => {
        toast.success('사용자 정보가 성공적으로 수정되었습니다.');
        setEditModalOpen(false);
        setSelectedUser(null);
        refetch();
      },
      onError: (error) => {
        handleApiError(error, navigate, '/admin/users', {
          useToast: true,
          defaultMessage: '사용자 정보 수정 중 오류가 발생했습니다.'
        });
      }
    }
  );

  // DELETE API 훅
  const deleteUserMutation = useDeleteApi(
    selectedUser ? `/admin/users/${selectedUser.userId}` : '/admin/users/0',
    {
      onSuccess: () => {
        toast.success('사용자가 성공적으로 삭제되었습니다.');
        setDeleteModalOpen(false);
        setSelectedUser(null);
        refetch();
      },
      onError: (error) => {
        handleApiError(error, navigate, '/admin/users', {
          useToast: true,
          defaultMessage: '사용자 삭제 중 오류가 발생했습니다.'
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
      handleApiError(error, navigate, '/admin/users', {
        useToast: true,
        defaultMessage: '사용자 데이터를 불러오는 중 오류가 발생했습니다.'
      });
    }
  }, [error, navigate]);

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string): string => {
    try {
      return dateString.replace('T', ' ');
    } catch {
      return dateString;
    }
  };

  // roleCode 변환 함수
  const getRoleText = (roleCode: number): string => {
    return ROLE_CODE_MAP[roleCode as keyof typeof ROLE_CODE_MAP] || `알 수 없음(${roleCode})`;
  };

  // 수정 버튼 클릭 핸들러
  const handleEditClick = (user: AdminUser) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  // 삭제 버튼 클릭 핸들러
  const handleDeleteClick = (user: AdminUser) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };

  // 삭제 확인 핸들러
  const handleDeleteConfirm = async (isConfirm: boolean) => {
    if (isConfirm && selectedUser) {
      await deleteUserMutation.mutateAsync();
      // 성공 시 모달 닫기는 mutation의 onSuccess에서 처리됨
      // 에러 시 처리는 mutation의 onError에서 처리됨
    } else {
      // 취소 시에만 여기서 모달 닫기
      setDeleteModalOpen(false);
      setSelectedUser(null);
    }
  };

  // 사용자 정보 저장 핸들러
  const handleUserSave = async (changedData: Record<string, string | number>) => {
    if (!selectedUser) return;

    // 전화번호 정규화
    const saveData = { ...changedData };
    if (saveData.phoneNumber) {
      saveData.phoneNumber = normalizePhoneForSave(String(saveData.phoneNumber));
    }

    // roleCode는 숫자로 변환
    if (saveData.roleCode !== undefined) {
      saveData.roleCode = Number(saveData.roleCode);
    }

    await patchUserMutation.mutateAsync(saveData);
  };

  // 모달 닫기 핸들러
  const handleModalClose = () => {
    setEditModalOpen(false);
    setDeleteModalOpen(false);
    setSelectedUser(null);
  };

  // 관리자 권한에 따른 roleCode 필터 옵션 생성
  const getRoleFilterOptions = () => {
    if (currentUserRole === 2) {
      // 최고 관리자는 모든 권한 조회 가능
      return [
        { value: '', label: '전체' },
        { value: '0', label: '일반 사용자' },
        { value: '1', label: '일반 관리자' },
        { value: '2', label: '최고 관리자' }
      ];
    }
    // 일반 관리자는 필터 옵션 없음
    return [];
  };

  // 간단한 컬럼 정의
  const simpleColumns: SimpleColumn[] = [
    {
      key: 'userId',
      label: '사용자 ID'
    },
    {
      key: 'name',
      label: '이름'
    },
    {
      key: 'email',
      label: '이메일'
    },
    {
      key: 'phoneNumber',
      label: '전화번호'
    },
    {
      key: 'roleCode',
      label: '권한',
      render: (value) => getRoleText(value as number)
    },
    {
      key: 'createAt',
      label: '생성일',
      render: (value) => formatDate(value as string)
    },
    {
      key: 'actions',
      label: '작업',
      render: (_, row) => {
        const user = row as unknown as AdminUser;

        // 최고 관리자는 수정/삭제 불가
        if (user.roleCode === 2) {
          return (
            <div className={styles.actionButtons}>
              <span className={styles.noActionText}>작업 불가</span>
            </div>
          );
        }

        return (
          <div className={styles.actionButtons}>
            <button className={styles.editButton} onClick={() => handleEditClick(user)}>
              수정하기
            </button>
            {currentUserRole === 2 && (
              <button className={styles.deleteButton} onClick={() => handleDeleteClick(user)}>
                삭제하기
              </button>
            )}
          </div>
        );
      }
    }
  ];

  return (
    <div className={styles.container}>
      <AdminTable<AdminUser>
        title="사용자 관리"
        summary={`총 ${pagination.totalElements}명의 사용자`}
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
        emptyMessage="사용자가 없습니다."
        fullWidth={true}
        // 필터 기능 (최고 관리자만 필터 표시)
        showFilterBar={currentUserRole === 2}
        filters={
          currentUserRole === 2
            ? [
                {
                  key: 'roleCode',
                  label: '권한',
                  type: 'select',
                  options: getRoleFilterOptions()
                }
              ]
            : []
        }
        onFiltersChange={handleFiltersChange}
      />

      {/* 수정 모달 */}
      {editModalOpen && selectedUser && (
        <AdminEditModal
          isOpen={editModalOpen}
          title={`사용자 정보 수정 - ${selectedUser.name}`}
          fields={createUserEditFields(selectedUser, currentUserRole)}
          loading={patchUserMutation.isPending}
          onClose={handleModalClose}
          onSave={handleUserSave}
          saveButtonText="수정 완료"
          cancelButtonText="닫기"
        />
      )}

      {/* 삭제 확인 모달 */}
      <AdminConfirmModal
        open={deleteModalOpen}
        title="사용자 삭제"
        contents={`정말로 "${selectedUser?.name}" 사용자를 삭제하시겠습니까?`}
        confirmText="삭제하기"
        cancelText="취소"
        variant="danger"
        loading={deleteUserMutation.isPending}
        handleConfirm={handleDeleteConfirm}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default AdminUsersPage;
