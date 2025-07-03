// src/components/Modals/AdminProductImageSection.tsx

import React from 'react';

import Input from '@/components/atoms/Input/Input';

import styles from './AdminProductModal.module.scss';

interface AdminProductImageSectionProps {
  imageUrls: string[];
  onImageUrlChange: (index: number, url: string) => void;
  onAddImageUrl: () => void;
  onRemoveImageUrl: (index: number) => void;
}

const AdminProductImageSection: React.FC<AdminProductImageSectionProps> = ({
  imageUrls,
  onImageUrlChange,
  onAddImageUrl,
  onRemoveImageUrl
}) => {
  return (
    <section className={styles.section}>
      <h3>이미지 URL</h3>
      <div className={styles.listContainer}>
        {imageUrls.map((url, index) => (
          <div key={index} className={styles.listItem}>
            <Input
              type="url"
              value={url}
              onChange={(e) => onImageUrlChange(index, e.target.value)}
              placeholder="이미지 URL을 입력하세요"
              className={styles.flexInput}
            />
            <button
              type="button"
              onClick={() => onRemoveImageUrl(index)}
              className={styles.removeButton}
            >
              삭제
            </button>
          </div>
        ))}
        <button type="button" onClick={onAddImageUrl} className={styles.addButton}>
          + 이미지 URL 추가
        </button>
      </div>
    </section>
  );
};

export default AdminProductImageSection;
