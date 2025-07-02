import type { EditField } from '@/components/Modals/AdminEditModal';
import type { AdminOrder, AdminOrderDetail } from '@/types/api/AdminOrder.type';
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
      required: false, // disabled 필드는 필수 아님으로 변경
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
      required: false, // 필수 아님으로 변경
      disabled: false,
      options: [
        { value: 0, label: '일반 사용자' },
        { value: 1, label: '일반 관리자' },
        { value: 2, label: '최고 관리자' }
      ]
    });
  } else {
    // 일반 관리자는 roleCode 조회만 가능
    fields.splice(-1, 0, {
      key: 'roleCode',
      label: '권한',
      type: 'text',
      value: getRoleText(user.roleCode),
      disabled: true
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
    }
  ];

  return fields;
};

// 주문 상세 정보 편집 필드 생성 (상세 API 응답 데이터 기반)
export const createOrderDetailEditFields = (orderDetail: AdminOrderDetail): EditField[] => {
  const fields: EditField[] = [
    // 주문 기본 정보
    {
      key: 'order_id',
      label: '주문 ID',
      type: 'number',
      value: orderDetail.order_id,
      disabled: true,
      required: false
    },
    {
      key: 'status',
      label: '주문 상태',
      type: 'select',
      value: orderDetail.status,
      required: true,
      disabled: false,
      options: [
        { value: 'PENDING', label: '대기중' },
        { value: 'PAID', label: '결제완료' },
        { value: 'CANCELLED', label: '취소됨' }
      ]
    },
    {
      key: 'order_date',
      label: '주문일',
      type: 'text',
      value: formatDateTime(orderDetail.order_date),
      disabled: true,
      required: false
    },
    {
      key: 'cancel_date',
      label: '취소일',
      type: 'text',
      value: formatDateTime(orderDetail.cancel_date),
      disabled: true,
      required: false
    },
    {
      key: 'updated_at',
      label: '수정일',
      type: 'text',
      value: formatDateTime(orderDetail.updated_at),
      disabled: true,
      required: false
    },

    // 주문자 정보
    {
      key: 'user.name',
      label: '주문자명',
      type: 'text',
      value: orderDetail.user.name,
      disabled: true,
      required: false
    },
    {
      key: 'user.email',
      label: '주문자 이메일',
      type: 'email',
      value: orderDetail.user.email,
      disabled: true,
      required: false
    },
    {
      key: 'user.phone_number',
      label: '주문자 전화번호',
      type: 'tel',
      value: orderDetail.user.phone_number,
      disabled: true,
      required: false
    },
    {
      key: 'user.user_id',
      label: '주문자 ID',
      type: 'number',
      value: orderDetail.user.user_id,
      disabled: true,
      required: false
    }
  ];

  // 결제 정보 (있는 경우에만 추가)
  if (orderDetail.payment) {
    fields.push(
      {
        key: 'payment.payment_id',
        label: '결제 ID',
        type: 'number',
        value: orderDetail.payment.payment_id,
        disabled: true,
        required: false
      },
      {
        key: 'payment.status',
        label: '결제 상태',
        type: 'text',
        value: orderDetail.payment.status,
        disabled: true,
        required: false
      },
      {
        key: 'payment.card_number',
        label: '카드 번호',
        type: 'text',
        value: orderDetail.payment.card_number,
        disabled: true,
        required: false
      },
      {
        key: 'payment.payment_datetime',
        label: '결제일시',
        type: 'text',
        value: formatDateTime(orderDetail.payment.payment_datetime),
        disabled: true,
        required: false
      }
    );
  }

  // 주문 상품 정보
  const item = orderDetail.order_items?.[0];
  if (item) {
    fields.push(
      {
        key: 'product.name',
        label: '상품명',
        type: 'text',
        value: item.product.name,
        disabled: true,
        required: false
      },
      {
        key: 'product.product_id',
        label: '상품 ID',
        type: 'number',
        value: item.product.product_id,
        disabled: true,
        required: false
      },
      {
        key: 'start_date',
        label: '여행 시작일',
        type: 'text',
        value: item.start_date,
        disabled: true,
        required: false
      },
      {
        key: 'people_count',
        label: '인원수',
        type: 'number',
        value: item.people_count,
        disabled: true,
        required: false
      },
      {
        key: 'price',
        label: '단가',
        type: 'text',
        value: `${new Intl.NumberFormat('ko-KR').format(item.price)}원`,
        disabled: true,
        required: false
      },
      {
        key: 'total_price_item',
        label: '총액',
        type: 'text',
        value: `${new Intl.NumberFormat('ko-KR').format(item.total_price)}원`,
        disabled: true,
        required: false
      }
    );
  }

  return fields;
};
