export interface Region {
  regionId: number;
  name: string;
  parentId: number;
}

export interface DescriptionItem {
  itemId?: number;
  content: string;
  sortOrder: number;
}

export interface DescriptionGroup {
  groupId?: number;
  title: string;
  type: number; // 0: 포함사항, 1: 불포함사항, 2: 기타
  sortOrder: number;
  items: DescriptionItem[];
}

export interface AdminProduct extends Record<string, unknown> {
  productId: number;
  thumbnail?: string | null; // null 허용
  name: string;
  region: Region;
  type: number; // 0: FREE, 1: PACKAGE, 2: SUMMER_VAC, 3: HISTORY, 4: ACTIVITY
  saleStatus: number; // 0: UPCOMING, 1: ON_SALE, 2: SOLD_OUT
  price: number;
  stockQuantity: number;
  duration: number;
  // 추가 필드들 (유연성을 위해)
  totalQuantity?: number;
  description?: string;
  imageUrls?: string[];
}

export interface AdminProductDetail {
  productId: number;
  name: string;
  price: number;
  totalQuantity: number;
  stockQuantity: number;
  description: string;
  saleStatus: number; // 0: UPCOMING, 1: ON_SALE, 2: SOLD_OUT
  type: number; // 0: FREE, 1: PACKAGE, 2: SUMMER_VAC, 3: HISTORY, 4: ACTIVITY
  duration: number;
  region: Region;
  imageUrls: string[];
  descriptionGroups: DescriptionGroup[];
}

// 상품 생성/수정 요청 타입
export interface AdminProductCreateRequest {
  name: string;
  price: number;
  totalQuantity: number;
  description: string;
  saleStatus: number;
  type: number;
  duration: number;
  regionId: number;
  imageUrls: string[];
  descriptionGroups: {
    title: string;
    type: number;
    sortOrder: number;
    items: {
      content: string;
      sortOrder: number;
    }[];
  }[];
}

export interface AdminProductUpdateRequest {
  name: string;
  price: number;
  totalQuantity: number;
  stockQuantity: number;
  description: string;
  saleStatus: number;
  type: number;
  duration: number;
  regionId: number;
  imageUrls: string[];
  descriptionGroups: {
    title: string;
    type: number;
    sortOrder: number;
    items: {
      content: string;
      sortOrder: number;
    }[];
  }[];
}

// 상품 생성/수정 응답 타입
export interface AdminProductCreateResponse {
  productId: number;
  name: string;
  price: number;
  totalQuantity: number;
  stockQuantity: number;
  description: string;
  saleStatus: number;
  type: number;
  duration: number;
  region: Region;
  imageUrls: string[];
  descriptionGroups: DescriptionGroup[];
}

export type AdminProductUpdateResponse = AdminProductCreateResponse;

// 상품 삭제 응답 타입 (빈 객체 또는 성공 메시지)
export interface AdminProductDeleteResponse {
  message?: string;
}

// 이미지 업로드 응답 타입
export type ImageUploadResponse = string[];
