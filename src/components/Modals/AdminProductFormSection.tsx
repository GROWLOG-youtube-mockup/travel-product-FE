import React from 'react';

import Input from '@/components/atoms/Input/Input';
import type { Region } from '@/types/api/AdminProduct.type';

import styles from './AdminProductFormSection.module.scss';

interface AdminProductFormSectionProps {
  formData: {
    name: string;
    price: number;
    totalQuantity: number;
    stockQuantity: number;
    description: string;
    saleStatus: number;
    type: number;
    duration: number;
    regionId: number;
  };
  errors: Record<string, string>;
  regions: Region[];
  mode: 'create' | 'edit';
  onFieldChange: (field: string, value: string | number) => void;
}

const AdminProductFormSection: React.FC<AdminProductFormSectionProps> = ({
  formData,
  errors,
  regions,
  mode,
  onFieldChange
}) => {
  return (
    <section className={styles.section}>
      <h3>기본 정보</h3>
      <div className={styles.fieldGrid}>
        <div className={styles.fieldGroup}>
          <label>상품명 *</label>
          <Input
            type="text"
            value={formData.name}
            onChange={(e) => onFieldChange('name', e.target.value)}
            placeholder="상품명을 입력하세요"
            className={errors.name ? styles.error : ''}
          />
          {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
        </div>

        <div className={styles.fieldGroup}>
          <label>가격 *</label>
          <Input
            type="number"
            value={formData.price}
            onChange={(e) => onFieldChange('price', Number(e.target.value))}
            placeholder="가격을 입력하세요"
            className={errors.price ? styles.error : ''}
          />
          {errors.price && <span className={styles.errorMessage}>{errors.price}</span>}
        </div>

        <div className={styles.fieldGroup}>
          <label>총 수량 *</label>
          <Input
            type="number"
            value={formData.totalQuantity}
            onChange={(e) => onFieldChange('totalQuantity', Number(e.target.value))}
            placeholder="총 수량을 입력하세요"
            className={errors.totalQuantity ? styles.error : ''}
          />
          {errors.totalQuantity && (
            <span className={styles.errorMessage}>{errors.totalQuantity}</span>
          )}
        </div>

        {mode === 'edit' && (
          <div className={styles.fieldGroup}>
            <label>재고 수량 *</label>
            <Input
              type="number"
              value={formData.stockQuantity}
              onChange={(e) => onFieldChange('stockQuantity', Number(e.target.value))}
              placeholder="재고 수량을 입력하세요"
              className={errors.stockQuantity ? styles.error : ''}
            />
            {errors.stockQuantity && (
              <span className={styles.errorMessage}>{errors.stockQuantity}</span>
            )}
          </div>
        )}

        <div className={styles.fieldGroup}>
          <label>여행기간(일) *</label>
          <Input
            type="number"
            value={formData.duration}
            onChange={(e) => onFieldChange('duration', Number(e.target.value))}
            placeholder="여행기간을 입력하세요"
            className={errors.duration ? styles.error : ''}
          />
          {errors.duration && <span className={styles.errorMessage}>{errors.duration}</span>}
        </div>

        <div className={styles.fieldGroup}>
          <label>지역 *</label>
          <select
            value={formData.regionId}
            onChange={(e) => onFieldChange('regionId', Number(e.target.value))}
            className={`${styles.select} ${errors.regionId ? styles.error : ''}`}
          >
            <option value={0}>지역을 선택하세요</option>
            {regions.map((region) => (
              <option key={region.regionId} value={region.regionId}>
                {region.name}
              </option>
            ))}
          </select>
          {errors.regionId && <span className={styles.errorMessage}>{errors.regionId}</span>}
        </div>

        <div className={styles.fieldGroup}>
          <label>판매 상태 *</label>
          <select
            value={formData.saleStatus}
            onChange={(e) => onFieldChange('saleStatus', Number(e.target.value))}
            className={styles.select}
          >
            <option value={0}>판매예정</option>
            <option value={1}>판매중</option>
            <option value={2}>품절</option>
          </select>
        </div>

        <div className={styles.fieldGroup}>
          <label>상품 타입 *</label>
          <select
            value={formData.type}
            onChange={(e) => onFieldChange('type', Number(e.target.value))}
            className={styles.select}
          >
            <option value={0}>자유여행</option>
            <option value={1}>패키지</option>
            <option value={2}>여름휴가</option>
            <option value={3}>역사탐방</option>
            <option value={4}>액티비티</option>
          </select>
        </div>
      </div>

      <div className={styles.fieldGroup}>
        <label>상품 설명 *</label>
        <textarea
          value={formData.description}
          onChange={(e) => onFieldChange('description', e.target.value)}
          placeholder="상품 설명을 입력하세요"
          className={`${styles.textarea} ${errors.description ? styles.error : ''}`}
          rows={4}
        />
        {errors.description && <span className={styles.errorMessage}>{errors.description}</span>}
      </div>
    </section>
  );
};

export default AdminProductFormSection;
