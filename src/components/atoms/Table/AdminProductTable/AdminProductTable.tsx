import React from 'react';

import styles from './AdminProductTable.module.scss';

export interface Product {
  product_id: number;
  name: string;
  price: number;
  stock_quantity: number;
  sale_status: number;
  created_at: string;
}

interface Props {
  products: Product[];
  roleCode: number;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

const AdminProductTable: React.FC<Props> = ({ products, roleCode, onEdit, onDelete }) => {
  const canDelete = roleCode === 2;
  const canEdit = [1, 2].includes(roleCode);
  const canCreate = [1, 2].includes(roleCode);

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.header}>
        <button
          className={styles.createButton}
          disabled={!canCreate}
          title={!canCreate ? '권한이 없습니다' : undefined}
        >
          + 상품 등록
        </button>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>상품명</th>
            <th>가격</th>
            <th>재고</th>
            <th>상태</th>
            <th>등록일</th>
            <th>액션</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan={6} className={styles.emptyRow}>
                상품이 없습니다.
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product.product_id}>
                <td>{product.name}</td>
                <td>{product.price.toLocaleString()}원</td>
                <td>{product.stock_quantity}</td>
                <td>
                  {product.sale_status === 1 ? (
                    <span className={styles.onSale}>판매중</span>
                  ) : (
                    <span className={styles.soldOut}>품절</span>
                  )}
                </td>
                <td>{new Date(product.created_at).toLocaleDateString()}</td>
                <td>
                  <button
                    className={styles.editButton}
                    onClick={() => onEdit(product)}
                    disabled={!canEdit}
                    title={!canEdit ? '권한이 없습니다' : undefined}
                  >
                    수정
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => onDelete(product)}
                    disabled={!canDelete}
                    title={!canDelete ? '삭제 권한이 없습니다' : undefined}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProductTable;
