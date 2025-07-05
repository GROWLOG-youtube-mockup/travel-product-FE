import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import AdminTable from '@/components/atoms/Table/AdminTable/AdminTable';
import AdminConfirmModal from '@/components/Modals/Admin/AdminConfirmModal';
import AdminProductModal from '@/components/Modals/Admin/AdminProductModal';
import Regions from '@/constants/regions';
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
import { formatPrice, getProductTypeText, getSaleStatusText } from '@/utils/adminModalUtils';

import styles from './AdminProducts.module.scss';

/**
 * API 응답 데이터 타입 정의
 */
interface ApiResponseData {
  content?: AdminProduct[];
  totalPages?: number;
  totalElements?: number;
  data?: {
    content?: AdminProduct[];
    totalPages?: number;
    totalElements?: number;
  };
}

/**
 * constants/regions.ts 데이터를 AdminProduct.type.ts의 Region 타입으로 변환
 */
const REGIONS: Region[] = Regions.map((region) => ({
  regionId: region.region_id,
  name: region.name,
  parentId: region.parent_id || 0
}));

/**
 * 관리자 상품 관리 페이지 컴포넌트
 */
const AdminProductsPage = () => {
  const navigate = useNavigate();
  const { roleCode: currentUserRole } = useAuthStore();

  // 모달 상태 관리
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [productModalMode, setProductModalMode] = useState<'create' | 'edit'>('create');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<AdminProduct | null>(null);
  const [productDetailData, setProductDetailData] = useState<AdminProductDetail | null>(null);

  // 페이지네이션 및 필터 관리
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

  const filterValues = getFilterValues();

  /**
   * API 호출 파라미터에 필터 조건 추가
   */
  const finalApiParams = useMemo(() => {
    const params: Record<string, unknown> = { ...apiParams };
    if (filterValues.regionId) {
      params.regionId = parseInt(filterValues.regionId, 10);
    }
    return params;
  }, [apiParams, filterValues.regionId]);

  // API 훅들
  const { data, isLoading, error, refetch } = useGetApi('/admin/products', finalApiParams);

  /**
   * API 응답에서 페이지네이션 정보 추출 및 업데이트
   */
  useEffect(() => {
    if (data) {
      const paginationData = extractPaginationFromResponse(data as ApiResponseData);
      if (paginationData) {
        updatePagination({
          totalPages: paginationData.totalPages,
          totalElements: paginationData.totalElements
        });
      }
    }
  }, [data, updatePagination]);

  /**
   * API 응답에서 페이지네이션 정보 추출
   */
  const extractPaginationFromResponse = (data: ApiResponseData) => {
    if (data && typeof data === 'object' && data !== null) {
      if ('totalPages' in data && 'totalElements' in data) {
        return {
          totalPages: Number(data.totalPages || 0),
          totalElements: Number(data.totalElements || 0)
        };
      }
      if ('data' in data && data.data && typeof data.data === 'object' && data.data !== null) {
        const nestedData = data.data;
        if ('totalPages' in nestedData && 'totalElements' in nestedData) {
          return {
            totalPages: Number(nestedData.totalPages || 0),
            totalElements: Number(nestedData.totalElements || 0)
          };
        }
      }
    }
    return null;
  };

  /**
   * 상품 생성 API 훅
   */
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

  /**
   * 상품 수정 API 훅
   */
  const updateProductMutation = usePutApi(
    selectedProduct ? `/admin/products/${selectedProduct.productId}` : `/admin/products/0`,
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

  /**
   * 상품 삭제 API 훅
   */
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

  /**
   * API 에러 처리
   */
  useEffect(() => {
    if (error) {
      handleApiError(error, navigate, '/admin/products', {
        useToast: true,
        defaultMessage: '상품 데이터를 불러오는 중 오류가 발생했습니다.'
      });
    }
  }, [error, navigate]);

  /**
   * API 응답에서 테이블 데이터 추출
   */
  const getTableData = (): AdminProduct[] => {
    if (!data) return [];

    const responseData = data as ApiResponseData;

    if (
      typeof responseData === 'object' &&
      responseData !== null &&
      'content' in responseData &&
      Array.isArray(responseData.content)
    ) {
      return responseData.content;
    }

    if (
      responseData.data &&
      typeof responseData.data === 'object' &&
      responseData.data !== null &&
      'content' in responseData.data &&
      Array.isArray(responseData.data.content)
    ) {
      return responseData.data.content;
    }

    return [];
  };

  /**
   * 상품 추가 버튼 클릭 핸들러
   */
  const handleAddClick = () => {
    setProductModalMode('create');
    setSelectedProduct(null);
    setProductDetailData(null);
    setProductModalOpen(true);
  };

  /**
   * 상품 수정 버튼 클릭 핸들러
   * 상품 상세 정보를 조회한 후 수정 모달을 표시
   */
  const handleEditClick = async (product: AdminProduct) => {
    setSelectedProduct(product);

    try {
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
      handleApiError(error, navigate, '/admin/products', {
        useToast: true,
        defaultMessage: '상품 상세 정보를 불러오는 중 오류가 발생했습니다.'
      });
      setSelectedProduct(null);
    }
  };

  /**
   * 상품 삭제 버튼 클릭 핸들러
   */
  const handleDeleteClick = (product: AdminProduct) => {
    setSelectedProduct(product);
    setDeleteModalOpen(true);
  };

  /**
   * 삭제 확인 모달 핸들러
   */
  const handleDeleteConfirm = async (isConfirm: boolean) => {
    if (isConfirm && selectedProduct) {
      await deleteProductMutation.mutateAsync();
    } else {
      setDeleteModalOpen(false);
      setSelectedProduct(null);
    }
  };

  /**
   * 상품 생성 처리
   */
  const handleProductCreate = async (data: AdminProductCreateRequest) => {
    await createProductMutation.mutateAsync(data);
  };

  /**
   * 상품 수정 처리
   */
  const handleProductUpdate = async (data: AdminProductUpdateRequest) => {
    await updateProductMutation.mutateAsync(data);
  };

  /**
   * 모달 닫기 핸들러
   */
  const handleModalClose = () => {
    setProductModalOpen(false);
    setDeleteModalOpen(false);
    setSelectedProduct(null);
    setProductDetailData(null);
  };

  /**
   * 지역 필터 옵션 생성
   * constants/regions.ts 데이터를 기반으로 계층 구조 반영
   */
  const getRegionFilterOptions = () => {
    const options = [{ value: '', label: '🌍 전체 지역' }];

    // 광역시/도 구분을 위한 ID 배열
    const metropolitanCities = [2, 3, 4, 5, 6, 7, 8, 9]; // 서울~세종
    const provinces = [10, 11, 12, 13, 14, 15, 16, 17, 18]; // 경기~제주

    // 광역시/특별시 섹션
    const metros = Regions.filter((region) => metropolitanCities.includes(region.region_id));
    if (metros.length > 0) {
      // 구분선 추가 (선택 불가)
      options.push({ value: 'separator1', label: '━━━ 🏢 광역시/특별시 ━━━' });

      metros.forEach((region) => {
        let emoji = '🏙️';
        // 특별시/광역시별 구분
        switch (region.name) {
          case '서울':
            emoji = '🏛️';
            break;
          case '부산':
            emoji = '🌊';
            break;
          case '대구':
            emoji = '🍎';
            break;
          case '인천':
            emoji = '✈️';
            break;
          case '광주':
            emoji = '🌸';
            break;
          case '대전':
            emoji = '🚄';
            break;
          case '울산':
            emoji = '🏭';
            break;
          case '세종':
            emoji = '🏛️';
            break;
          default:
            emoji = '🏙️';
        }

        options.push({
          value: region.region_id.toString(),
          label: `${emoji} ${region.name}`
        });
      });
    }

    // 도 단위 섹션
    const provincesData = Regions.filter((region) => provinces.includes(region.region_id));
    if (provincesData.length > 0) {
      // 구분선 추가
      options.push({ value: 'separator2', label: '━━━ 🏞️ 도 단위 ━━━' });

      provincesData.forEach((province) => {
        // 도별 이모지 설정
        let emoji = '🌄';
        switch (province.name) {
          case '경기':
            emoji = '🏘️';
            break;
          case '강원':
            emoji = '⛰️';
            break;
          case '충북':
            emoji = '🏔️';
            break;
          case '충남':
            emoji = '🌾';
            break;
          case '전북':
            emoji = '🌿';
            break;
          case '전남':
            emoji = '🌊';
            break;
          case '경북':
            emoji = '🍃';
            break;
          case '경남':
            emoji = '🌺';
            break;
          case '제주':
            emoji = '🏝️';
            break;
          default:
            emoji = '🌄';
        }

        options.push({
          value: province.region_id.toString(),
          label: `${emoji} ${province.name}`
        });

        // 해당 도의 시/군 추가
        const cities = Regions.filter((region) => region.parent_id === province.region_id);
        cities.forEach((city, index) => {
          const isLast = index === cities.length - 1;
          const treeSymbol = isLast ? '└' : '├';

          options.push({
            value: city.region_id.toString(),
            label: `${treeSymbol}─ 📍 ${city.name}`
          });
        });
      });
    }

    return options.map((option) => {
      // 구분선 옵션들은 선택 불가하게 처리
      if (option.value.startsWith('separator')) {
        return {
          ...option,
          value: '', // 빈 값으로 설정하여 선택 불가
          disabled: true
        };
      }
      return option;
    });
  };

  /**
   * 썸네일 이미지 렌더링 (떨림 방지)
   */
  const renderThumbnail = (_: unknown, row: Record<string, unknown>) => {
    const product = row as unknown as AdminProduct;

    // 기본 이미지 URL (public 폴더에 배치)
    const DEFAULT_IMAGE = '/Happy_Camel.jpg';

    // 썸네일이 있으면 사용, 없으면 기본 이미지
    const imageUrl =
      product.thumbnail && product.thumbnail.trim() !== '' ? product.thumbnail : DEFAULT_IMAGE;

    return (
      <div className={styles.thumbnailContainer}>
        <img
          src={imageUrl}
          alt={product.name}
          className={styles.thumbnail}
          onError={(e) => {
            // 에러 발생 시 기본 이미지로 변경
            const target = e.target as HTMLImageElement;
            if (target.src !== DEFAULT_IMAGE) {
              target.src = DEFAULT_IMAGE;
            }
          }}
          loading="lazy"
        />
      </div>
    );
  };

  /**
   * 테이블 컬럼 정의
   */
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

  return (
    <div className={styles.container}>
      <AdminTable<AdminProduct>
        title="상품 관리"
        summary={`총 ${pagination.totalElements}개의 상품`}
        simpleColumns={simpleColumns}
        data={tableData}
        pagination={pagination}
        loading={isLoading}
        onRetry={() => refetch()}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        currentPageSize={apiParams.size as number}
        pageSizeOptions={[5, 10, 20, 50]}
        showPaginationAlways={true}
        emptyMessage="상품이 없습니다."
        fullWidth={true}
        showAddButton={true}
        addButtonText="상품 추가"
        onAddClick={handleAddClick}
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
