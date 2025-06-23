import { useState } from 'react';

import { AdminTable } from '@/components/atoms/Table/AdminProductTable/AdminProductTable';
import { AdminProductsData } from '@/mocks/data/admin/AdminProductsData';
import type { AdminProductListItem } from '@/type/admin';

import styles from './AdminProducts.module.scss';

export default function AdminProductsPage() {
  const [page, setPage] = useState(1);
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const pageSize = 10;

  // TODO: API로 실제 데이터 가져오기 (현재는 mock 데이터 사용)
  const { content: data, totalElements, totalPages, currentPage } = AdminProductsData[0];

  // TODO: API에서 지역 목록 가져오기
  const regions = ['시드니', '멜버른', '브리즈번', '퍼스', '애들레이드'];

  const handleDelete = (product: AdminProductListItem) => {
    console.log('[삭제 요청]', product);
    // TODO: 실제 삭제 API 연결
  };

  const handleViewEdit = (product: AdminProductListItem) => {
    console.log('[상세/수정 요청]', product);
    // TODO: 상세 페이지 이동 또는 모달 열기
  };

  const handleAddProduct = () => {
    console.log('[상품 추가 요청]');
    // TODO: 상품 추가 모달 열기 또는 페이지 이동
  };

  const handleRegionFilter = (region: string) => {
    setSelectedRegion(region);
    setPage(1); // 필터 변경 시 첫 페이지로
    console.log('[지역 필터]', region);
    // TODO: 실제 필터링 로직 연결
  };

  const handleStatusFilter = (status: string) => {
    setSelectedStatus(status);
    setPage(1);
    console.log('[상태 필터]', status);
    // TODO: 실제 필터링 로직 연결
  };

  const handleTypeFilter = (type: string) => {
    setSelectedType(type);
    setPage(1);
    console.log('[상품 유형 필터]', type);
    // TODO: 실제 필터링 로직 연결
  };

  const columns = [
    { header: '상품ID', accessor: 'productId', width: '80px' },
    {
      header: '썸네일',
      accessor: 'thumbnail',
      width: '100px',
      render: (row: AdminProductListItem) => (
        <img
          src={row.thumbnail}
          alt={row.name}
          style={{ width: '60px', borderRadius: '4px', objectFit: 'cover' }}
        />
      )
    },
    { header: '상품명', accessor: 'name', width: '200px' },
    {
      header: '지역',
      accessor: 'region',
      render: (row: AdminProductListItem) => row.region.name
    },
    { header: '유형', accessor: 'type', width: '100px' },
    { header: '상태', accessor: 'saleStatus', width: '100px' },
    {
      header: '가격',
      accessor: 'price',
      render: (row: AdminProductListItem) => `${row.price.toLocaleString()}원`,
      width: '120px'
    },
    {
      header: '재고',
      accessor: 'stockQuantity',
      render: (row: AdminProductListItem) => `${row.stockQuantity.toLocaleString()}개`,
      width: '80px'
    },
    { header: '기간', accessor: 'duration', width: '100px' }
  ];

  return (
    <div className={styles.pageContainer}>
      {/* 페이지 헤더 */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerInfo}>
            <h1 className={styles.pageTitle}>상품 관리</h1>
            <p className={styles.pageDescription}>
              등록된 상품을 관리하고 새로운 상품을 추가할 수 있습니다.
            </p>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.addButton} onClick={handleAddProduct}>
              <svg
                className={styles.buttonIcon}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              상품 추가
            </button>
          </div>
        </div>
      </div>

      {/* 필터 섹션 */}
      <div className={styles.filterSection}>
        <div className={styles.filterCard}>
          <div className={styles.filterHeader}>
            <h3 className={styles.filterTitle}>필터</h3>
          </div>
          <div className={styles.filterContent}>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>지역</label>
              <select
                className={styles.filterSelect}
                value={selectedRegion}
                onChange={(e) => handleRegionFilter(e.target.value)}
              >
                <option value="">전체</option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>상태</label>
              <select
                className={styles.filterSelect}
                value={selectedStatus}
                onChange={(e) => handleStatusFilter(e.target.value)}
              >
                <option value="">전체</option>
                <option value="UP_COMING">판매예정</option>
                <option value="ON_SALE">판매중</option>
                <option value="SOLD_OUT">품절</option>
                <option value="DISCONTINUED">판매중단</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>상품 유형</label>
              <select
                className={styles.filterSelect}
                value={selectedType}
                onChange={(e) => handleTypeFilter(e.target.value)}
              >
                <option value="">전체</option>
                <option value="자유여행">자유여행</option>
                <option value="패키지여행">패키지여행</option>
                <option value="항공+숙박">항공+숙박</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 테이블 섹션 */}
      <div className={styles.tableSection}>
        <AdminTable
          columns={columns}
          data={data}
          page={page}
          pageSize={pageSize}
          totalCount={totalElements}
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={(newPage) => setPage(newPage)}
          onDelete={handleDelete}
          onViewEdit={handleViewEdit}
        />
      </div>
    </div>
  );
}
