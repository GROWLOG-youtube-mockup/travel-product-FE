import type { EditField } from '@/components/Modals/Admin/AdminEditModal';
import type { AdminOrder } from '@/types/api/AdminOrder.type';
import type {
  AdminProduct,
  AdminProductDetail,
  AdminProductUpdateRequest,
  Region
} from '@/types/api/AdminProduct.type';
import type { AdminUser } from '@/types/api/AdminUser.type';
import { normalizePhoneNumber } from '@/utils/phone';

// ==================== 공통 유틸리티 함수 ====================

// 이메일 유효성 검사 (기존 email.ts와 분리하여 유지)
export const validateEmail = (value: string | number): string | null => {
  const email = String(value);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return '올바른 이메일 형식이 아닙니다.';
  }
  return null;
};

// 전화번호 유효성 검사 (기존 phone.ts 활용)
export const validatePhoneNumber = (value: string | number): string | null => {
  try {
    const phone = String(value);
    // 하이픈 제거 후 검증
    const cleaned = phone.replace(/-/g, '');
    if (!/^\d{10,11}$/.test(cleaned)) {
      return '전화번호는 10-11자리 숫자여야 합니다.';
    }
    // 정규화 시도 (유효성 확인)
    normalizePhoneNumber(cleaned);
    return null;
  } catch {
    return '올바른 전화번호 형식이 아닙니다. (예: 010-1234-5678)';
  }
};

// 이름 유효성 검사
export const validateName = (value: string | number): string | null => {
  const name = String(value);
  if (name.trim().length < 2) {
    return '이름은 2글자 이상이어야 합니다.';
  }
  if (name.trim().length > 20) {
    return '이름은 20글자 이하여야 합니다.';
  }
  return null;
};

// 날짜 포맷팅 (기존 date.ts와 일관성 유지)
export const formatDateTime = (dateString: string | null): string => {
  if (!dateString) return '-';
  try {
    return dateString.replace('T', ' ');
  } catch {
    return dateString;
  }
};

// 전화번호 정규화 (저장 전 처리용)
export const normalizePhoneForSave = (phone: string): string => {
  try {
    const cleaned = phone.replace(/-/g, '');
    return normalizePhoneNumber(cleaned);
  } catch {
    return phone; // 실패 시 원본 반환
  }
};

// ==================== 사용자 관련 함수 ====================

// roleCode를 텍스트로 변환
const getRoleText = (roleCode: number): string => {
  const roleMap = {
    0: '일반 사용자',
    1: '일반 관리자',
    2: '최고 관리자'
  };
  return roleMap[roleCode as keyof typeof roleMap] || `알 수 없음(${roleCode})`;
};

// 관리자 권한에 따른 사용자 편집 필드 생성
export const createUserEditFields = (
  user: AdminUser,
  currentUserRole: number | null
): EditField[] => {
  const fields: EditField[] = [
    {
      key: 'userId',
      label: '사용자 ID',
      type: 'number',
      value: user.userId,
      disabled: true, // 항상 수정 불가
      required: false // disabled 필드는 필수 아님
    },
    {
      key: 'name',
      label: '이름',
      type: 'text',
      value: user.name,
      required: true,
      placeholder: '이름을 입력하세요',
      validation: validateName,
      disabled: false // 모든 관리자가 수정 가능
    },
    {
      key: 'email',
      label: '이메일',
      type: 'email',
      value: user.email,
      required: true, // 이메일은 필수로 변경
      placeholder: 'example@email.com',
      validation: validateEmail,
      disabled: false
    },
    {
      key: 'phoneNumber',
      label: '전화번호',
      type: 'tel',
      value: user.phoneNumber,
      required: true,
      placeholder: '010-1234-5678',
      validation: validatePhoneNumber,
      disabled: false // 모든 관리자가 수정 가능
    },
    {
      key: 'createAt',
      label: '생성일',
      type: 'text',
      value: formatDateTime(user.createAt),
      disabled: true, // 항상 수정 불가
      required: false // disabled 필드는 필수 아님
    }
  ];

  // roleCode 필드는 권한에 따라 다르게 처리
  if (currentUserRole === 2) {
    // 최고 관리자만 roleCode 수정 가능
    fields.splice(-1, 0, {
      key: 'roleCode',
      label: '권한',
      type: 'select',
      value: user.roleCode,
      required: true, // 수정 가능하므로 필수
      disabled: false,
      options: [
        { value: 0, label: '일반 사용자' },
        { value: 1, label: '일반 관리자' },
        { value: 2, label: '최고 관리자' }
      ]
    });
  } else {
    // 일반 관리자는 roleCode 조회만 가능 - disabled이므로 required false
    fields.splice(-1, 0, {
      key: 'roleCode',
      label: '권한',
      type: 'text',
      value: getRoleText(user.roleCode),
      disabled: true, // 조회만 가능
      required: false // disabled 필드는 절대 필수 아님
    });
  }

  return fields;
};

// ==================== 주문 관련 함수 ====================

// 상태 텍스트 변환
export const getOrderStatusText = (status: string): string => {
  const statusMap = {
    PENDING: '대기중',
    PAID: '결제완료',
    CANCELLED: '취소됨'
  };
  return statusMap[status as keyof typeof statusMap] || `알 수 없음(${status})`;
};

// 주문 편집 필드 생성 (상태만 수정 가능)
export const createOrderEditFields = (order: AdminOrder): EditField[] => {
  const fields: EditField[] = [
    {
      key: 'orderId',
      label: '주문 ID',
      type: 'number',
      value: order.orderId,
      disabled: true,
      required: false
    },
    {
      key: 'userName',
      label: '주문자명',
      type: 'text',
      value: order.userName,
      disabled: true,
      required: false
    },
    {
      key: 'userEmail',
      label: '이메일',
      type: 'email',
      value: order.userEmail,
      disabled: true,
      required: false
    },
    {
      key: 'status',
      label: '주문 상태',
      type: 'select',
      value: order.status,
      required: true,
      disabled: false,
      options: [
        { value: 'PENDING', label: '대기중' },
        { value: 'PAID', label: '결제완료' },
        { value: 'CANCELLED', label: '취소됨' }
      ]
    },
    {
      key: 'peopleCount',
      label: '인원수',
      type: 'number',
      value: order.peopleCount,
      disabled: true,
      required: false
    },
    {
      key: 'orderDate',
      label: '주문일',
      type: 'text',
      value: formatDateTime(order.orderDate),
      disabled: true,
      required: false
    },
    {
      key: 'cancelDate',
      label: '취소일',
      type: 'text',
      value: formatDateTime(order.cancelDate),
      disabled: true,
      required: false
    },
    {
      key: 'updatedAt',
      label: '변경일',
      type: 'text',
      value: formatDateTime(order.updatedAt),
      disabled: true,
      required: false
    }
  ];

  return fields;
};
// ==================== 상품 관련 상수 정의 ====================

export const SALE_STATUS_MAP = {
  0: 'UPCOMING',
  1: 'ON_SALE',
  2: 'SOLD_OUT'
} as const;

export const SALE_STATUS_TEXT_MAP = {
  0: '판매예정',
  1: '판매중',
  2: '품절'
} as const;

export const PRODUCT_TYPE_MAP = {
  0: 'FREE',
  1: 'PACKAGE',
  2: 'SUMMER_VAC',
  3: 'HISTORY',
  4: 'ACTIVITY'
} as const;

export const PRODUCT_TYPE_TEXT_MAP = {
  0: '자유여행',
  1: '패키지',
  2: '여름휴가',
  3: '역사탐방',
  4: '액티비티'
} as const;

export const DESCRIPTION_GROUP_TYPE_MAP = {
  0: '포함사항',
  1: '불포함사항',
  2: '기타'
} as const;

// ==================== 상품 관련 변환 함수 ====================

export const getSaleStatusText = (status: number): string => {
  return (
    SALE_STATUS_TEXT_MAP[status as keyof typeof SALE_STATUS_TEXT_MAP] || `알 수 없음(${status})`
  );
};

export const getProductTypeText = (type: number): string => {
  return PRODUCT_TYPE_TEXT_MAP[type as keyof typeof PRODUCT_TYPE_TEXT_MAP] || `알 수 없음(${type})`;
};

export const getDescriptionGroupTypeText = (type: number): string => {
  return (
    DESCRIPTION_GROUP_TYPE_MAP[type as keyof typeof DESCRIPTION_GROUP_TYPE_MAP] ||
    `알 수 없음(${type})`
  );
};

// 가격 포맷팅
export const formatPrice = (price: number): string => {
  return `${new Intl.NumberFormat('ko-KR').format(price)}원`;
};

// 이미지 URL에서 이미지 ID 추출
export const extractImageId = (imageUrl: string): string => {
  try {
    const url = new URL(imageUrl);
    const pathname = url.pathname;
    const segments = pathname.split('/');
    return segments[segments.length - 1]; // 마지막 세그먼트가 파일명
  } catch {
    return imageUrl; // URL 파싱 실패 시 원본 반환
  }
};

// 썸네일 이미지 처리
export const getThumbnailUrl = (product: AdminProduct): string => {
  return product.thumbnail || '/default-product-image.jpg';
};

// ==================== 상품 관련 유효성 검사 함수 ====================

export const validateProductName = (value: string | number): string | null => {
  const name = String(value).trim();
  if (name.length < 2) {
    return '상품명은 2글자 이상이어야 합니다.';
  }
  if (name.length > 100) {
    return '상품명은 100글자 이하여야 합니다.';
  }
  return null;
};

export const validatePrice = (value: string | number): string | null => {
  const price = Number(value);
  if (isNaN(price)) {
    return '올바른 숫자를 입력해주세요.';
  }
  if (price < 0) {
    return '가격은 0원 이상이어야 합니다.';
  }
  if (price > 10000000) {
    return '가격은 1,000만원 이하여야 합니다.';
  }
  return null;
};

export const validateQuantity = (value: string | number): string | null => {
  const quantity = Number(value);
  if (isNaN(quantity)) {
    return '올바른 숫자를 입력해주세요.';
  }
  if (quantity < 0) {
    return '수량은 0개 이상이어야 합니다.';
  }
  if (quantity > 9999) {
    return '수량은 9,999개 이하여야 합니다.';
  }
  return null;
};

export const validateDuration = (value: string | number): string | null => {
  const duration = Number(value);
  if (isNaN(duration)) {
    return '올바른 숫자를 입력해주세요.';
  }
  if (duration < 1) {
    return '여행기간은 1일 이상이어야 합니다.';
  }
  if (duration > 365) {
    return '여행기간은 365일 이하여야 합니다.';
  }
  return null;
};

export const validateDescription = (value: string | number): string | null => {
  const description = String(value).trim();
  if (description.length < 10) {
    return '상품 설명은 10글자 이상이어야 합니다.';
  }
  if (description.length > 1000) {
    return '상품 설명은 1000글자 이하여야 합니다.';
  }
  return null;
};

// ==================== 상품 편집 필드 생성 함수 ====================

export const createProductEditFields = (
  product: AdminProductDetail,
  regions: Region[]
): EditField[] => {
  const fields: EditField[] = [
    {
      key: 'productId',
      label: '상품 ID',
      type: 'number',
      value: product.productId,
      disabled: true,
      required: false
    },
    {
      key: 'name',
      label: '상품명',
      type: 'text',
      value: product.name,
      required: true,
      placeholder: '상품명을 입력하세요',
      validation: validateProductName,
      disabled: false
    },
    {
      key: 'price',
      label: '가격',
      type: 'number',
      value: product.price,
      required: true,
      placeholder: '가격을 입력하세요',
      validation: validatePrice,
      disabled: false
    },
    {
      key: 'totalQuantity',
      label: '총 수량',
      type: 'number',
      value: product.totalQuantity,
      required: true,
      placeholder: '총 수량을 입력하세요',
      validation: validateQuantity,
      disabled: false
    },
    {
      key: 'stockQuantity',
      label: '재고 수량',
      type: 'number',
      value: product.stockQuantity,
      required: true,
      placeholder: '재고 수량을 입력하세요',
      validation: validateQuantity,
      disabled: false
    },
    {
      key: 'duration',
      label: '여행기간(일)',
      type: 'number',
      value: product.duration,
      required: true,
      placeholder: '여행기간을 입력하세요',
      validation: validateDuration,
      disabled: false
    },
    {
      key: 'description',
      label: '상품 설명',
      type: 'text',
      value: product.description,
      required: true,
      placeholder: '상품 설명을 입력하세요',
      validation: validateDescription,
      disabled: false
    },
    {
      key: 'saleStatus',
      label: '판매 상태',
      type: 'select',
      value: product.saleStatus,
      required: true,
      disabled: false,
      options: [
        { value: 0, label: '판매예정' },
        { value: 1, label: '판매중' },
        { value: 2, label: '품절' }
      ]
    },
    {
      key: 'type',
      label: '상품 타입',
      type: 'select',
      value: product.type,
      required: true,
      disabled: false,
      options: [
        { value: 0, label: '자유여행' },
        { value: 1, label: '패키지' },
        { value: 2, label: '여름휴가' },
        { value: 3, label: '역사탐방' },
        { value: 4, label: '액티비티' }
      ]
    },
    {
      key: 'regionId',
      label: '지역',
      type: 'select',
      value: product.region.regionId,
      required: true,
      disabled: false,
      options: regions.map((region) => ({
        value: region.regionId,
        label: region.name
      }))
    }
  ];

  return fields;
};

// ==================== 상품 데이터 변환 함수 ====================

export const convertToProductUpdateRequest = (
  productDetail: AdminProductDetail,
  changedData: Record<string, string | number>
): AdminProductUpdateRequest => {
  const updateData: AdminProductUpdateRequest = {
    name: changedData.name ? String(changedData.name) : productDetail.name,
    price: changedData.price ? Number(changedData.price) : productDetail.price,
    totalQuantity: changedData.totalQuantity
      ? Number(changedData.totalQuantity)
      : productDetail.totalQuantity,
    stockQuantity: changedData.stockQuantity
      ? Number(changedData.stockQuantity)
      : productDetail.stockQuantity,
    description: changedData.description
      ? String(changedData.description)
      : productDetail.description,
    saleStatus:
      changedData.saleStatus !== undefined
        ? Number(changedData.saleStatus)
        : productDetail.saleStatus,
    type: changedData.type !== undefined ? Number(changedData.type) : productDetail.type,
    duration: changedData.duration ? Number(changedData.duration) : productDetail.duration,
    regionId: changedData.regionId ? Number(changedData.regionId) : productDetail.region.regionId,
    imageUrls: productDetail.imageUrls,
    descriptionGroups: productDetail.descriptionGroups.map((group) => ({
      title: group.title,
      type: group.type,
      sortOrder: group.sortOrder,
      items: group.items.map((item) => ({
        content: item.content,
        sortOrder: item.sortOrder
      }))
    }))
  };

  return updateData;
};
