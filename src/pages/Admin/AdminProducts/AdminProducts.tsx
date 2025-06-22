import { useState } from 'react';

import { AdminTable } from '@/components/atoms/Table/AdminProductTable/AdminProductTable';
import { AdminProductsData } from '@/mocks/data/admin/AdminProductsData';
import type { AdminProductListItem } from '@/type/admin'; // 타입 위치는 프로젝트 구조에 따라 조정

export default function AdminProductsPage() {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // 실제로는 API로 받아오겠지만 현재는 mock 데이터 사용
  const { content: data, totalElements, totalPages, currentPage } = AdminProductsData[0];

  const handleDelete = (product: AdminProductListItem) => {
    console.log('[삭제 요청]', product);
    // 실제 삭제 로직 연결 예정
  };

  const handleViewEdit = (product: AdminProductListItem) => {
    console.log('[상세/수정 요청]', product);
    // 상세 페이지 이동 또는 모달 열기 등 처리 예정
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
    <section>
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
    </section>
  );
}
