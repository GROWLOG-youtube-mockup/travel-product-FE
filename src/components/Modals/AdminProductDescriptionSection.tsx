import React, { useState } from 'react';
import toast from 'react-hot-toast';

import Button from '@/components/atoms/Button/Button';
import Modal from '@/components/Modal/Modal';
import ModalCloseButton from '@/components/Modal/ModalCloseButton';
import ModalHeader from '@/components/Modal/ModalHeader';
import type { DescriptionGroup } from '@/types/api/AdminProduct.type';

import styles from './AdminProductDescriptionSection.module.scss';

interface AdminProductDescriptionSectionProps {
  descriptionGroups: DescriptionGroup[];
  errors: Record<string, string>;
  isChanged?: boolean;
  changedGroups?: Set<number>;
  onDescriptionItemChange: (groupIndex: number, itemIndex: number, content: string) => void;
  onAddDescriptionItem: (groupIndex: number) => void;
  onRemoveDescriptionItem: (groupIndex: number, itemIndex: number) => void;
  onAddNewSection: (title: string) => void;
  onRemoveSection: (groupIndex: number) => void;
}

const AdminProductDescriptionSection: React.FC<AdminProductDescriptionSectionProps> = ({
  descriptionGroups,
  errors,
  isChanged = false,
  changedGroups = new Set(),
  onDescriptionItemChange,
  onAddDescriptionItem,
  onRemoveDescriptionItem,
  onAddNewSection,
  onRemoveSection
}) => {
  const [showNewSectionModal, setShowNewSectionModal] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [newSectionError, setNewSectionError] = useState('');

  const handleAddNewSection = () => {
    if (!newSectionTitle.trim()) {
      setNewSectionError('섹션 이름을 입력해주세요.');
      return;
    }

    // 중복 체크
    const isDuplicate = descriptionGroups.some(
      (group) => group.title.toLowerCase() === newSectionTitle.trim().toLowerCase()
    );

    if (isDuplicate) {
      setNewSectionError('이미 존재하는 섹션명입니다.');
      return;
    }

    onAddNewSection(newSectionTitle.trim());
    setNewSectionTitle('');
    setNewSectionError('');
    setShowNewSectionModal(false);
    toast.success('새 섹션이 추가되었습니다.');
  };

  const handleNewSectionModalClose = () => {
    setShowNewSectionModal(false);
    setNewSectionTitle('');
    setNewSectionError('');
  };

  const handleNewSectionTitleChange = (value: string) => {
    setNewSectionTitle(value);
    if (newSectionError) {
      setNewSectionError('');
    }
  };

  const handleRemoveSection = (groupIndex: number) => {
    const group = descriptionGroups[groupIndex];

    // 기본 섹션(포함사항, 불포함사항)은 삭제 불가
    if (group && (group.type === 0 || group.type === 1)) {
      toast.error('기본 섹션은 삭제할 수 없습니다.');
      return;
    }

    onRemoveSection(groupIndex);
    toast.success('섹션이 삭제되었습니다.');
  };

  // 항목 추가 핸들러 - 중복 실행 방지
  const handleAddDescriptionItem = (groupIndex: number) => {
    onAddDescriptionItem(groupIndex);
  };

  // 항목 제거 핸들러 - 중복 실행 방지
  const handleRemoveDescriptionItem = (groupIndex: number, itemIndex: number) => {
    onRemoveDescriptionItem(groupIndex, itemIndex);
  };

  return (
    <>
      <section className={`${styles.section} ${isChanged ? styles.sectionModified : ''}`}>
        <div className={styles.sectionHeader}>
          <h3>
            상품 상세 정보
            {isChanged && <span className={styles.changedIndicator}> ✅ 변경됨</span>}
          </h3>
          <button
            type="button"
            onClick={() => setShowNewSectionModal(true)}
            className={styles.addSectionButton}
          >
            + 섹션 추가
          </button>
        </div>

        <div className={styles.groupsContainer}>
          {descriptionGroups.map((group, groupIndex) => (
            <div
              key={`group-${groupIndex}-${group.title}`}
              className={`${styles.descriptionGroup} ${changedGroups.has(groupIndex) ? styles.groupModified : ''}`}
            >
              <div className={styles.groupHeader}>
                <h4>
                  {group.title}
                  {(group.type === 0 || group.type === 1) && (
                    <span className={styles.requiredIndicator}> (필수)</span>
                  )}
                  {changedGroups.has(groupIndex) && (
                    <span className={styles.groupChangedIndicator}> ✅ 변경됨</span>
                  )}
                </h4>
                {group.type === 2 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveSection(groupIndex)}
                    className={styles.removeSectionButton}
                  >
                    섹션 삭제
                  </button>
                )}
              </div>

              <div className={styles.itemsContainer}>
                {group.items.map((item, itemIndex) => (
                  <div key={`item-${groupIndex}-${itemIndex}`} className={styles.listItem}>
                    <input
                      type="text"
                      value={item.content}
                      onChange={(e) =>
                        onDescriptionItemChange(groupIndex, itemIndex, e.target.value)
                      }
                      placeholder={`${group.title} 항목을 입력하세요`}
                      className={styles.flexInput}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveDescriptionItem(groupIndex, itemIndex)}
                      className={styles.removeButton}
                      disabled={group.items.length === 1}
                    >
                      삭제
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddDescriptionItem(groupIndex)}
                  className={styles.addButton}
                >
                  + {group.title} 항목 추가
                </button>
              </div>

              {errors[`descGroup_${groupIndex}`] && (
                <span className={styles.errorMessage}>{errors[`descGroup_${groupIndex}`]}</span>
              )}
            </div>
          ))}
        </div>

        {/* 필수 섹션 안내 */}
        <div className={styles.helpText}>
          <p>* 포함사항과 불포함사항은 필수 섹션이며, 각각 최소 1개의 항목이 필요합니다.</p>
          <p>* 포함사항 (type: 0), 불포함사항 (type: 1), 기타 섹션 (type: 2)로 구분됩니다.</p>
        </div>
      </section>

      {/* 섹션 추가 모달 */}
      {showNewSectionModal && (
        <Modal
          onClose={handleNewSectionModalClose}
          boxStyle={{
            width: 400,
            maxWidth: '90vw'
          }}
        >
          <ModalHeader title="새 섹션 추가">
            <ModalCloseButton onClick={handleNewSectionModalClose} />
          </ModalHeader>
          <div className={styles.newSectionModal}>
            <div className={styles.modalBody}>
              <div className={styles.fieldGroup}>
                <label htmlFor="sectionTitle">섹션 이름</label>
                <input
                  id="sectionTitle"
                  type="text"
                  value={newSectionTitle}
                  onChange={(e) => handleNewSectionTitleChange(e.target.value)}
                  placeholder="섹션 이름을 입력하세요"
                  className={`${styles.input} ${newSectionError ? styles.error : ''}`}
                />
                {newSectionError && <span className={styles.errorMessage}>{newSectionError}</span>}
              </div>
            </div>
            <div className={styles.modalFooter}>
              <Button onClick={handleNewSectionModalClose} color="white">
                취소
              </Button>
              <Button onClick={handleAddNewSection} color="blue">
                추가
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default AdminProductDescriptionSection;
