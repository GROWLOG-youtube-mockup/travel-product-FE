import type { Trip, TripDto } from '@/types/api/trip.type';

/**
 * 서버 TripDto[] → FE Trip[] 변환 (필요 필드만, 스네이크케이스)
 */
export function toFETripArray(trips: TripDto[] = []): Trip[] {
  return Array.isArray(trips)
    ? trips.map((trip) => ({
        productId: trip.productId,
        title: trip.title,
        start_date: trip.startDate,
        end_date: trip.endDate,
        price: trip.price
      }))
    : [];
}
