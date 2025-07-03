import React from 'react';

import type { DescriptionItem } from '@/types/api/AdminProduct.type';

import styles from './AdminProductTagSection.module.scss';

interface AdminProductTagSectionProps {
  tags: DescriptionItem[];
  errors: Record<string, string>;
  onAddTag: (tagContent: string) => void;
  onRemoveTag: (index: number) => void;
}

// 미리 정의된 태그 목록
const PREDEFINED_TAGS = ['Best 추천 👍', '예약폭주 🎉', '좋아요 😘', 'MD Pick ✨', '마감임박 ⏰'];

const AdminProductTagSection: React.FC<AdminProductTagSectionProps> = ({
  tags,
  errors,
  onAddTag,
  onRemoveTag
}) => {
  return (
    <section className={styles.section}>
      <h3>태그 선택</h3>
      <div className={styles.tagContainer}>
        <div className={styles.availableTags}>
          <h4>사용 가능한 태그</h4>
          <div className={styles.tagGrid}>
            {PREDEFINED_TAGS.map((tag) => {
              const isSelected = tags.some((selectedTag) => selectedTag.content === tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => onAddTag(tag)}
                  disabled={isSelected}
                  className={`${styles.tagOption} ${isSelected ? styles.disabled : ''}`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        <div className={styles.selectedTags}>
          <h4>선택된 태그</h4>
          {tags.length > 0 ? (
            <div className={styles.tagList}>
              {tags.map((tag, index) => (
                <div key={index} className={styles.selectedTag}>
                  <span>{tag.content}</span>
                  <button
                    type="button"
                    onClick={() => onRemoveTag(index)}
                    className={styles.removeTagButton}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.noTags}>선택된 태그가 없습니다.</p>
          )}
        </div>
      </div>
      {errors.tags && <span className={styles.errorMessage}>{errors.tags}</span>}

      <div className={styles.helpText}>
        <p>* 태그는 선택사항입니다. 상품을 더 잘 설명할 수 있는 태그를 선택해주세요.</p>
      </div>
    </section>
  );
};

export default AdminProductTagSection;
