// src/pages/Admin/AdminProducts/AdminProducts.tsx

import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import AdminTable from '@/components/atoms/Table/AdminTable/AdminTable';
import AdminConfirmModal from '@/components/Modals/AdminConfirmModal';
import AdminProductModal from '@/components/Modals/AdminProductModal';
import { useAdminPagination } from '@/hooks/useAdminPagination';
import { useDeleteApi } from '@/hooks/useDeleteAPI';
import { useGetApi } from '@/hooks/useGetAPI';
import { usePostApi } from '@/hooks/usePostAPI';
import { usePutApi } from '@/hooks/usePutAPI';
import { handleApiError } from '@/lib/handleApiError';
import { useAuthStore } from '@/store/AuthStore';
import type { SimpleColumn } from '@/types/adminTable.types';
import type {
  AdminProduct,
  AdminProductCreateRequest,
  AdminProductDetail,
  AdminProductUpdateRequest,
  Region
} from '@/types/api/AdminProduct.type';
import {
  formatPrice,
  getProductTypeText,
  getSaleStatusText,
  getThumbnailUrl
} from '@/utils/adminModalUtils';

import styles from './AdminProducts.module.scss';

// 실제 데이터베이스 기반 지역 데이터
const REGIONS: Region[] = [
  { regionId: 1, name: '대한민국', parentId: 0 },
  { regionId: 2, name: '서울', parentId: 1 },
  { regionId: 3, name: '부산', parentId: 1 },
  { regionId: 4, name: '대구', parentId: 1 },
  { regionId: 5, name: '인천', parentId: 1 },
  { regionId: 6, name: '광주', parentId: 1 },
  { regionId: 7, name: '대전', parentId: 1 },
  { regionId: 8, name: '울산', parentId: 1 },
  { regionId: 9, name: '세종', parentId: 1 },
  { regionId: 10, name: '경기', parentId: 1 },
  { regionId: 11, name: '강원', parentId: 1 },
  { regionId: 12, name: '충북', parentId: 1 },
  { regionId: 13, name: '충남', parentId: 1 },
  { regionId: 14, name: '전북', parentId: 1 },
  { regionId: 15, name: '전남', parentId: 1 },
  { regionId: 16, name: '경북', parentId: 1 },
  { regionId: 17, name: '경남', parentId: 1 },
  { regionId: 18, name: '제주', parentId: 1 },
  { regionId: 19, name: '수원', parentId: 10 },
  { regionId: 20, name: '성남', parentId: 10 },
  { regionId: 21, name: '용인', parentId: 10 },
  { regionId: 22, name: '부천', parentId: 11 },
  { regionId: 23, name: '원주', parentId: 11 },
  { regionId: 24, name: '강릉', parentId: 11 },
  { regionId: 25, name: '동해', parentId: 11 },
  { regionId: 26, name: '태백', parentId: 11 },
  { regionId: 27, name: '속초', parentId: 11 },
  { regionId: 28, name: '삼척', parentId: 11 },
  { regionId: 29, name: '청주', parentId: 12 },
  { regionId: 30, name: '충주', parentId: 12 },
  { regionId: 31, name: '제천', parentId: 12 },
  { regionId: 32, name: '천안', parentId: 13 },
  { regionId: 33, name: '공주', parentId: 13 },
  { regionId: 34, name: '보령', parentId: 13 },
  { regionId: 35, name: '아산', parentId: 13 }
];

const AdminProductsPage = () => {
  const navigate = useNavigate();
  const { roleCode: currentUserRole } = useAuthStore();
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [productModalMode, setProductModalMode] = useState<'create' | 'edit'>('create');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<AdminProduct | null>(null);
  const [productDetailData, setProductDetailData] = useState<AdminProductDetail | null>(null);

  const {
    apiParams,
    handlePageChange,
    handlePageSizeChange,
    handleFiltersChange,
    getFilterValues
  } = useAdminPagination({
    defaultPageSize: 10,
    pageSizeOptions: [5, 10, 20, 50]
  });

  // 현재 필터 값들
  const filterValues = getFilterValues();

  // API 호출 파라미터에 필터 추가 (useMemo로 최적화)
  const finalApiParams = useMemo(() => {
    const params: Record<string, unknown> = { ...apiParams };
    if (filterValues.regionId) {
      params.regionId = parseInt(filterValues.regionId, 10);
    }
    return params;
  }, [apiParams, filterValues.regionId]);

  // 상품 목록 조회 API
  const { data, isLoading, error, refetch } = useGetApi('/admin/products', finalApiParams);

  // POST API 훅 (상품 생성)
  const createProductMutation = usePostApi('/admin/products', {
    onSuccess: () => {
      toast.success('상품이 성공적으로 추가되었습니다.');
      setProductModalOpen(false);
      setSelectedProduct(null);
      setProductDetailData(null);
      refetch();
    },
    onError: (error) => {
      handleApiError(error, navigate, '/admin/products', {
        useToast: true,
        defaultMessage: '상품 추가 중 오류가 발생했습니다.'
      });
    }
  });

  // PUT API 훅 (상품 수정)
  const updateProductMutation = usePutApi(
    selectedProduct ? `/admin/products/${selectedProduct.productId}` : '/admin/products/0',
    {
      onSuccess: () => {
        toast.success('상품 정보가 성공적으로 수정되었습니다.');
        setProductModalOpen(false);
        setSelectedProduct(null);
        setProductDetailData(null);
        refetch();
      },
      onError: (error) => {
        handleApiError(error, navigate, '/admin/products', {
          useToast: true,
          defaultMessage: '상품 정보 수정 중 오류가 발생했습니다.'
        });
      }
    }
  );

  // DELETE API 훅 (상품 삭제)
  const deleteProductMutation = useDeleteApi(
    selectedProduct ? `/admin/products/${selectedProduct.productId}` : '/admin/products/0',
    {
      onSuccess: () => {
        toast.success('상품이 성공적으로 삭제되었습니다.');
        setDeleteModalOpen(false);
        setSelectedProduct(null);
        setProductDetailData(null);
        refetch();
      },
      onError: (error) => {
        handleApiError(error, navigate, '/admin/products', {
          useToast: true,
          defaultMessage: '상품 삭제 중 오류가 발생했습니다.'
        });
      }
    }
  );

  // 에러 처리
  useEffect(() => {
    if (error) {
      handleApiError(error, navigate, '/admin/products', {
        useToast: true,
        defaultMessage: '상품 데이터를 불러오는 중 오류가 발생했습니다.'
      });
    }
  }, [error, navigate]);

  // 데이터 추출 함수
  const getTableData = (): AdminProduct[] => {
    if (!data) return [];

    // API 응답이 직접 {content: [], totalElements: ...} 형태인 경우
    if (
      typeof data === 'object' &&
      data !== null &&
      'content' in data &&
      Array.isArray(data.content)
    ) {
      return data.content as AdminProduct[];
    }

    // 기존 방식: data.data.content
    if (
      data.data &&
      typeof data.data === 'object' &&
      data.data !== null &&
      'content' in data.data &&
      Array.isArray(data.data.content)
    ) {
      return data.data.content as AdminProduct[];
    }

    return [];
  };

  // 페이지네이션 정보 추출
  const getPaginationInfo = () => {
    if (data && typeof data === 'object' && data !== null) {
      // 직접 응답 형태 처리
      if ('totalPages' in data && 'totalElements' in data) {
        return {
          currentPage: Math.max(0, (apiParams.page as number) - 1),
          totalPages: Number(data.totalPages || 0),
          totalElements: Number(data.totalElements || 0)
        };
      }
      // 중첩된 data 형태 처리
      if ('data' in data && data.data && typeof data.data === 'object' && data.data !== null) {
        const nestedData = data.data as any;
        if ('totalPages' in nestedData && 'totalElements' in nestedData) {
          return {
            currentPage: Math.max(0, (apiParams.page as number) - 1),
            totalPages: Number(nestedData.totalPages || 0),
            totalElements: Number(nestedData.totalElements || 0)
          };
        }
      }
    }
    return {
      currentPage: Math.max(0, (apiParams.page as number) - 1),
      totalPages: 0,
      totalElements: 0
    };
  };

  // 상품 추가 버튼 클릭 핸들러
  const handleAddClick = () => {
    setProductModalMode('create');
    setSelectedProduct(null);
    setProductDetailData(null);
    setProductModalOpen(true);
  };

  // 수정 버튼 클릭 핸들러 (상세 정보 조회 후 모달 표시)
  const handleEditClick = async (product: AdminProduct) => {
    setSelectedProduct(product);

    try {
      // 직접 API 호출로 변경
      const { api } = await import('@/lib/api');
      const response = await api.get(`/admin/products/${product.productId}`);

      if (response.data?.success && response.data?.data) {
        setProductDetailData(response.data.data as AdminProductDetail);
        setProductModalMode('edit');
        setProductModalOpen(true);
      } else {
        throw new Error('상세 정보를 불러올 수 없습니다.');
      }
    } catch (error) {
      console.error('상품 상세 조회 에러:', error);
      handleApiError(error, navigate, '/admin/products', {
        useToast: true,
        defaultMessage: '상품 상세 정보를 불러오는 중 오류가 발생했습니다.'
      });
      setSelectedProduct(null);
    }
  };

  // 삭제 버튼 클릭 핸들러
  const handleDeleteClick = (product: AdminProduct) => {
    setSelectedProduct(product);
    setDeleteModalOpen(true);
  };

  // 삭제 확인 핸들러
  const handleDeleteConfirm = async (isConfirm: boolean) => {
    if (isConfirm && selectedProduct) {
      await deleteProductMutation.mutateAsync();
    } else {
      setDeleteModalOpen(false);
      setSelectedProduct(null);
    }
  };

  // 상품 생성 핸들러
  const handleProductCreate = async (data: AdminProductCreateRequest) => {
    await createProductMutation.mutateAsync(data);
  };

  // 상품 수정 핸들러
  const handleProductUpdate = async (data: AdminProductUpdateRequest) => {
    await updateProductMutation.mutateAsync(data);
  };

  // 모달 닫기 핸들러
  const handleModalClose = () => {
    setProductModalOpen(false);
    setDeleteModalOpen(false);
    setSelectedProduct(null);
    setProductDetailData(null);
  };

  // 지역 필터 옵션 생성 (계층 구조 고려)
  const getRegionFilterOptions = () => {
    const options = [{ value: '', label: '전체' }];

    // level 1 지역들 (시/도)
    const level1Regions = REGIONS.filter((region) => region.parentId === 1);
    level1Regions.forEach((region) => {
      options.push({
        value: region.regionId.toString(),
        label: region.name
      });
    });

    // level 2 지역들 (시/군/구)은 들여쓰기로 표시
    const level2Regions = REGIONS.filter((region) => region.parentId && region.parentId > 1);
    level2Regions.forEach((region) => {
      const parentRegion = REGIONS.find((r) => r.regionId === region.parentId);
      options.push({
        value: region.regionId.toString(),
        label: `  ㄴ ${region.name} (${parentRegion?.name || ''})`
      });
    });

    return options;
  };

  // 썸네일 렌더링
  const renderThumbnail = (_: unknown, row: Record<string, unknown>) => {
    const product = row as unknown as AdminProduct;
    const thumbnailUrl = getThumbnailUrl(product);

    return (
      <div className={styles.thumbnailContainer}>
        <img
          src={thumbnailUrl}
          alt={product.name}
          className={styles.thumbnail}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/default-product-image.jpg';
          }}
        />
      </div>
    );
  };

  // 간단한 컬럼 정의
  const simpleColumns: SimpleColumn[] = [
    {
      key: 'productId',
      label: '상품 ID'
    },
    {
      key: 'thumbnail',
      label: '썸네일',
      render: renderThumbnail
    },
    {
      key: 'name',
      label: '상품명'
    },
    {
      key: 'region',
      label: '지역',
      render: (value) => {
        const region = value as AdminProduct['region'];
        return region?.name || '-';
      }
    },
    {
      key: 'type',
      label: '타입',
      render: (value) => getProductTypeText(value as number)
    },
    {
      key: 'saleStatus',
      label: '판매상태',
      render: (value) => {
        const status = value as number;
        const statusText = getSaleStatusText(status);
        return <span className={styles[`status-${status}`]}>{statusText}</span>;
      }
    },
    {
      key: 'price',
      label: '가격',
      render: (value) => formatPrice(value as number)
    },
    {
      key: 'stockQuantity',
      label: '재고',
      render: (value) => `${value}개`
    },
    {
      key: 'duration',
      label: '기간',
      render: (value) => `${value}일`
    },
    {
      key: 'actions',
      label: '작업',
      render: (_, row) => {
        const product = row as unknown as AdminProduct;

        return (
          <div className={styles.actionButtons}>
            <button className={styles.editButton} onClick={() => handleEditClick(product)}>
              수정하기
            </button>
            {currentUserRole === 2 && (
              <button className={styles.deleteButton} onClick={() => handleDeleteClick(product)}>
                삭제하기
              </button>
            )}
          </div>
        );
      }
    }
  ];

  const tableData = getTableData();
  const paginationInfo = getPaginationInfo();

  return (
    <div className={styles.container}>
      <AdminTable<AdminProduct>
        title="상품 관리"
        summary={`총 ${paginationInfo.totalElements}개의 상품`}
        simpleColumns={simpleColumns}
        data={tableData}
        pagination={paginationInfo}
        loading={isLoading}
        onRetry={() => refetch()}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        currentPageSize={apiParams.size as number}
        pageSizeOptions={[5, 10, 20, 50]}
        showPaginationAlways={true}
        emptyMessage="상품이 없습니다."
        fullWidth={true}
        // 상품 추가 버튼
        showAddButton={true}
        addButtonText="상품 추가"
        onAddClick={handleAddClick}
        // 필터 기능
        showFilterBar={true}
        filters={[
          {
            key: 'regionId',
            label: '지역',
            type: 'select',
            options: getRegionFilterOptions()
          }
        ]}
        onFiltersChange={handleFiltersChange}
      />

      {/* 상품 추가/수정 모달 */}
      <AdminProductModal
        isOpen={productModalOpen}
        mode={productModalMode}
        productDetail={productDetailData || undefined}
        regions={REGIONS}
        loading={
          productModalMode === 'create'
            ? createProductMutation.isPending
            : updateProductMutation.isPending
        }
        onClose={handleModalClose}
        onCreate={handleProductCreate}
        onUpdate={handleProductUpdate}
      />

      {/* 삭제 확인 모달 */}
      <AdminConfirmModal
        open={deleteModalOpen}
        title="상품 삭제"
        contents={`정말로 "${selectedProduct?.name}" 상품을 삭제하시겠습니까?`}
        confirmText="삭제하기"
        cancelText="취소"
        variant="danger"
        loading={deleteProductMutation.isPending}
        handleConfirm={handleDeleteConfirm}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default AdminProductsPage;
