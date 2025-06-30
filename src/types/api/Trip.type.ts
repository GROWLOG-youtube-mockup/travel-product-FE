// 서버 응답 타입 (OpenAPI 명세 기반)
export interface TripDto {
  orderItemId: number; // 주문 항목 ID
  productId: number; // 상품 ID
  title: string; // 여행 상품 제목
  startDate: string; // 여행 시작일 (yyyy-MM-dd)
  endDate: string; // 여행 종료일 (yyyy-MM-dd)
  duration: number; // 여행 기간(일수)
  peopleCount: number; // 예약 인원 수
  price: number; // 상품 가격
  thumbnailUrl: string; // 대표 이미지 URL
}

// FE에서 사용하는 Trip 타입 (실제 사용 구조, 스네이크케이스)
export interface Trip {
  productId: number;
  title: string;
  start_date: string;
  end_date: string;
  price: number;
}
