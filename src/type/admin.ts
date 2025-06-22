export interface AdminProductListItem {
  productId: number;
  thumbnail: string;
  name: string;
  region: {
    regionId: number;
    name: string;
  };
  type: string; // 예: '자유여행', '패키지여행'
  saleStatus: string; // 예: 'UP_COMING', 'ON_SALE'
  price: number;
  stockQuantity: number;
  duration: string; // 예: '4박 5일'
}

export interface AdminProductListResponse {
  content: AdminProductListItem[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
}
