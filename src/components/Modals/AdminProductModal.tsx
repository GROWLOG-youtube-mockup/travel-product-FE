// src/components/Modals/AdminProductModal.tsx

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import Button from '@/components/atoms/Button/Button';
import Input from '@/components/atoms/Input/Input';
import Modal from '@/components/Modal/Modal';
import ModalCloseButton from '@/components/Modal/ModalCloseButton';
import ModalHeader from '@/components/Modal/ModalHeader';
import AdminConfirmModal from '@/components/Modals/AdminConfirmModal';
import type {
  AdminProductCreateRequest,
  AdminProductDetail,
  AdminProductUpdateRequest,
  DescriptionGroup,
  DescriptionItem,
  Region
} from '@/types/api/AdminProduct.type';
import {
  validateDescription,
  validateDuration,
  validatePrice,
  validateProductName,
  validateQuantity
} from '@/utils/adminModalUtils';

import styles from './AdminProductModal.module.scss';

interface AdminProductModalProps {
  isOpen: boolean;
  mode: 'create' | 'edit';
  productDetail?: AdminProductDetail;
  regions: Region[];
  loading?: boolean;
  onClose: () => void;
  onCreate?: (data: AdminProductCreateRequest) => Promise<void>;
  onUpdate?: (data: AdminProductUpdateRequest) => Promise<void>;
}

interface FormData {
  name: string;
  price: number;
  totalQuantity: number;
  stockQuantity: number;
  description: string;
  saleStatus: number;
  type: number;
  duration: number;
  regionId: number;
  imageUrls: string[];
  descriptionGroups: DescriptionGroup[];
  tags: DescriptionItem[];
}

// 미리 정의된 태그 목록
const PREDEFINED_TAGS = ['Best 추천 👍', '예약폭주 🎉', '좋아요 😘', 'MD Pick ✨', '마감임박 ⏰'];

const INITIAL_FORM_DATA: FormData = {
  name: '',
  price: 0,
  totalQuantity: 0,
  stockQuantity: 0,
  description: '',
  saleStatus: 0,
  type: 0,
  duration: 1,
  regionId: 0,
  imageUrls: [],
  descriptionGroups: [
    {
      title: '포함사항',
      type: 0,
      sortOrder: 1,
      items: [{ content: '', sortOrder: 1 }]
    },
    {
      title: '불포함사항',
      type: 1,
      sortOrder: 2,
      items: [{ content: '', sortOrder: 1 }]
    }
  ],
  tags: []
};

const AdminProductModal: React.FC<AdminProductModalProps> = ({
  isOpen,
  mode,
  productDetail,
  regions,
  loading = false,
  onClose,
  onCreate,
  onUpdate
}) => {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [hasChanges, setHasChanges] = useState(false);
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);
  const [showNewSectionModal, setShowNewSectionModal] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [newSectionError, setNewSectionError] = useState('');

  // 초기 데이터 설정
  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && productDetail) {
        // 편집 모드: 기존 데이터로 초기화
        const tagsGroup = productDetail.descriptionGroups.find((group) => group.title === 'tags');
        const otherGroups = productDetail.descriptionGroups.filter(
          (group) => group.title !== 'tags'
        );

        setFormData({
          name: productDetail.name,
          price: productDetail.price,
          totalQuantity: productDetail.totalQuantity,
          stockQuantity: productDetail.stockQuantity,
          description: productDetail.description,
          saleStatus: productDetail.saleStatus,
          type: productDetail.type,
          duration: productDetail.duration,
          regionId: productDetail.region.regionId,
          imageUrls: [...productDetail.imageUrls],
          descriptionGroups:
            otherGroups.length > 0 ? otherGroups : INITIAL_FORM_DATA.descriptionGroups,
          tags: tagsGroup?.items || []
        });
      } else {
        // 생성 모드: 빈 폼으로 초기화
        setFormData(INITIAL_FORM_DATA);
      }
      setErrors({});
      setHasChanges(false);
    }
  }, [isOpen, mode, productDetail]);

  // 변경사항 감지
  useEffect(() => {
    if (mode === 'create') {
      // 생성 모드에서는 필수 필드가 채워져 있으면 변경사항 있음으로 간주
      const hasRequiredFields =
        formData.name.trim() !== '' &&
        formData.price > 0 &&
        formData.totalQuantity > 0 &&
        formData.description.trim() !== '';
      setHasChanges(hasRequiredFields);
    } else if (mode === 'edit' && productDetail) {
      // 편집 모드에서는 원본 데이터와 비교
      const originalTags =
        productDetail.descriptionGroups.find((g) => g.title === 'tags')?.items || [];
      const changed =
        formData.name !== productDetail.name ||
        formData.price !== productDetail.price ||
        formData.totalQuantity !== productDetail.totalQuantity ||
        formData.stockQuantity !== productDetail.stockQuantity ||
        formData.description !== productDetail.description ||
        formData.saleStatus !== productDetail.saleStatus ||
        formData.type !== productDetail.type ||
        formData.duration !== productDetail.duration ||
        formData.regionId !== productDetail.region.regionId ||
        JSON.stringify(formData.imageUrls) !== JSON.stringify(productDetail.imageUrls) ||
        JSON.stringify(formData.tags) !== JSON.stringify(originalTags);

      setHasChanges(changed);
    }
  }, [formData, mode, productDetail]);

  // 기본 필드 변경 핸들러
  const handleFieldChange = (field: keyof FormData, value: string | number | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // 실시간 유효성 검사
    let error = '';
    switch (field) {
      case 'name':
        error = validateProductName(value as string) || '';
        break;
      case 'price':
        error = validatePrice(value as number) || '';
        break;
      case 'totalQuantity':
      case 'stockQuantity':
        error = validateQuantity(value as number) || '';
        break;
      case 'duration':
        error = validateDuration(value as number) || '';
        break;
      case 'description':
        error = validateDescription(value as string) || '';
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  // 설명 그룹 항목 변경
  const handleDescriptionItemChange = (groupIndex: number, itemIndex: number, content: string) => {
    setFormData((prev) => {
      const newGroups = [...prev.descriptionGroups];
      if (newGroups[groupIndex] && newGroups[groupIndex].items[itemIndex]) {
        newGroups[groupIndex].items[itemIndex].content = content;
      }
      return { ...prev, descriptionGroups: newGroups };
    });
  };

  // 설명 그룹 항목 추가 (확실한 메커니즘)
  const addDescriptionItem = (groupIndex: number) => {
    setFormData((prev) => {
      const newGroups = [...prev.descriptionGroups];
      if (newGroups[groupIndex]) {
        const currentItems = newGroups[groupIndex].items;
        const newSortOrder = currentItems.length + 1;
        newGroups[groupIndex].items = [...currentItems, { content: '', sortOrder: newSortOrder }];
      }
      return { ...prev, descriptionGroups: newGroups };
    });
  };

  // 설명 그룹 항목 제거 (확실한 메커니즘)
  const removeDescriptionItem = (groupIndex: number, itemIndex: number) => {
    setFormData((prev) => {
      const newGroups = [...prev.descriptionGroups];
      if (newGroups[groupIndex] && newGroups[groupIndex].items.length > 1) {
        // 배열에서 해당 인덱스 제거
        newGroups[groupIndex].items = newGroups[groupIndex].items.filter(
          (_, index) => index !== itemIndex
        );

        // sortOrder 재정렬
        newGroups[groupIndex].items.forEach((item, idx) => {
          item.sortOrder = idx + 1;
        });
      }
      return { ...prev, descriptionGroups: newGroups };
    });
  };

  // 새 섹션 추가
  const addNewSection = () => {
    if (!newSectionTitle.trim()) {
      setNewSectionError('섹션 이름을 입력해주세요.');
      return;
    }

    // 중복 체크
    const isDuplicate = formData.descriptionGroups.some(
      (group) => group.title.toLowerCase() === newSectionTitle.trim().toLowerCase()
    );

    if (isDuplicate) {
      setNewSectionError('이미 존재하는 섹션명입니다.');
      return;
    }

    setFormData((prev) => {
      const newSortOrder = prev.descriptionGroups.length + 1;
      const newGroup: DescriptionGroup = {
        title: newSectionTitle.trim(),
        type: 2, // 기타 타입
        sortOrder: newSortOrder,
        items: [{ content: '', sortOrder: 1 }]
      };

      return {
        ...prev,
        descriptionGroups: [...prev.descriptionGroups, newGroup]
      };
    });

    setNewSectionTitle('');
    setNewSectionError('');
    setShowNewSectionModal(false);
    toast.success('새 섹션이 추가되었습니다.');
  };

  // 새 섹션 모달 관련 핸들러
  const handleNewSectionModalConfirm = (isConfirm: boolean) => {
    if (isConfirm) {
      addNewSection();
    } else {
      setShowNewSectionModal(false);
      setNewSectionTitle('');
      setNewSectionError('');
    }
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

  // 섹션 삭제
  const removeSection = (groupIndex: number) => {
    const group = formData.descriptionGroups[groupIndex];

    // 기본 섹션(포함사항, 불포함사항)은 삭제 불가
    if (group && (group.type === 0 || group.type === 1)) {
      toast.error('기본 섹션은 삭제할 수 없습니다.');
      return;
    }

    setFormData((prev) => {
      const newGroups = prev.descriptionGroups.filter((_, index) => index !== groupIndex);

      // sortOrder 재정렬
      newGroups.forEach((group, idx) => {
        group.sortOrder = idx + 1;
      });

      return { ...prev, descriptionGroups: newGroups };
    });

    toast.success('섹션이 삭제되었습니다.');
  };

  // 태그 추가
  const addTag = (tagContent: string) => {
    setFormData((prev) => {
      // 이미 추가된 태그인지 확인
      const alreadyExists = prev.tags.some((tag) => tag.content === tagContent);
      if (alreadyExists) {
        return prev;
      }

      const newSortOrder = prev.tags.length + 1;
      return {
        ...prev,
        tags: [...prev.tags, { content: tagContent, sortOrder: newSortOrder }]
      };
    });
  };

  // 태그 제거 (확실한 메커니즘)
  const removeTag = (index: number) => {
    setFormData((prev) => {
      const newTags = prev.tags.filter((_, idx) => idx !== index);

      // sortOrder 재정렬
      newTags.forEach((tag, idx) => {
        tag.sortOrder = idx + 1;
      });

      return { ...prev, tags: newTags };
    });
  };

  // 이미지 URL 변경
  const handleImageUrlChange = (index: number, url: string) => {
    setFormData((prev) => {
      const newUrls = [...prev.imageUrls];
      newUrls[index] = url;
      return { ...prev, imageUrls: newUrls };
    });
  };

  // 이미지 URL 추가
  const addImageUrl = () => {
    setFormData((prev) => ({
      ...prev,
      imageUrls: [...prev.imageUrls, '']
    }));
  };

  // 이미지 URL 제거 (확실한 메커니즘)
  const removeImageUrl = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, idx) => idx !== index)
    }));
  };

  // 유효성 검사
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // 필수 필드 검사
    if (!formData.name.trim()) newErrors.name = '상품명은 필수입니다.';
    if (formData.price <= 0) newErrors.price = '가격은 0보다 커야 합니다.';
    if (formData.totalQuantity <= 0) newErrors.totalQuantity = '총 수량은 0보다 커야 합니다.';
    if (mode === 'edit' && formData.stockQuantity < 0)
      newErrors.stockQuantity = '재고는 0 이상이어야 합니다.';
    if (!formData.description.trim()) newErrors.description = '상품 설명은 필수입니다.';
    if (formData.duration <= 0) newErrors.duration = '여행기간은 1일 이상이어야 합니다.';
    if (formData.regionId <= 0) newErrors.regionId = '지역을 선택해주세요.';

    // 설명 그룹 검사
    formData.descriptionGroups.forEach((group, groupIndex) => {
      const hasValidItem = group.items.some((item) => item.content.trim() !== '');
      if (!hasValidItem) {
        newErrors[`descGroup_${groupIndex}`] = `${group.title}에 최소 1개 항목이 필요합니다.`;
      }
    });

    // 태그 검사 (선택된 태그가 있는지만 확인)
    if (formData.tags.length === 0) {
      newErrors.tags = '최소 1개의 태그를 선택해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 저장 처리
  const handleSave = async () => {
    if (!validateForm()) {
      toast.error('입력 정보를 확인해주세요.');
      return;
    }

    try {
      // 빈 항목 제거 및 데이터 정리
      const cleanedDescriptionGroups = formData.descriptionGroups
        .map((group) => ({
          title: group.title,
          type: group.type,
          sortOrder: group.sortOrder,
          items: group.items.filter((item) => item.content.trim() !== '')
        }))
        .filter((group) => group.items.length > 0);

      const cleanedTags = formData.tags.filter((tag) => tag.content.trim() !== '');

      // tags 그룹 추가
      if (cleanedTags.length > 0) {
        cleanedDescriptionGroups.push({
          title: 'tags',
          type: 2,
          sortOrder: 99,
          items: cleanedTags
        });
      }

      const cleanedImageUrls = formData.imageUrls.filter((url) => url.trim() !== '');

      if (mode === 'create' && onCreate) {
        const createData: AdminProductCreateRequest = {
          name: formData.name,
          price: formData.price,
          totalQuantity: formData.totalQuantity,
          description: formData.description,
          saleStatus: formData.saleStatus,
          type: formData.type,
          duration: formData.duration,
          regionId: formData.regionId,
          imageUrls: cleanedImageUrls,
          descriptionGroups: cleanedDescriptionGroups
        };
        await onCreate(createData);
      } else if (mode === 'edit' && onUpdate) {
        const updateData: AdminProductUpdateRequest = {
          name: formData.name,
          price: formData.price,
          totalQuantity: formData.totalQuantity,
          stockQuantity: formData.stockQuantity,
          description: formData.description,
          saleStatus: formData.saleStatus,
          type: formData.type,
          duration: formData.duration,
          regionId: formData.regionId,
          imageUrls: cleanedImageUrls,
          descriptionGroups: cleanedDescriptionGroups
        };
        await onUpdate(updateData);
      }
    } catch (error) {
      console.error('저장 중 오류:', error);
    }
  };

  // 모달 닫기
  const handleClose = () => {
    if (hasChanges) {
      setShowCloseConfirm(true);
    } else {
      onClose();
    }
  };

  // 닫기 확인 처리
  const handleCloseConfirm = (isConfirm: boolean) => {
    setShowCloseConfirm(false);
    if (isConfirm) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <Modal
        onClose={handleClose}
        boxStyle={{
          width: '90vw',
          maxWidth: 1000,
          height: '90vh'
        }}
      >
        <ModalHeader title={mode === 'create' ? '상품 추가' : '상품 수정'}>
          <ModalCloseButton onClick={handleClose} />
        </ModalHeader>

        <div className={styles.modalContent}>
          {loading && (
            <div className={styles.loadingOverlay}>
              <div className={styles.loadingSpinner}>
                <div className={styles.spinner}></div>
                <span>처리 중...</span>
              </div>
            </div>
          )}

          <div className={styles.content}>
            {/* 기본 정보 섹션 */}
            <section className={styles.section}>
              <h3>기본 정보</h3>
              <div className={styles.fieldGrid}>
                <div className={styles.fieldGroup}>
                  <label>상품명 *</label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleFieldChange('name', e.target.value)}
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
                    onChange={(e) => handleFieldChange('price', Number(e.target.value))}
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
                    onChange={(e) => handleFieldChange('totalQuantity', Number(e.target.value))}
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
                      onChange={(e) => handleFieldChange('stockQuantity', Number(e.target.value))}
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
                    onChange={(e) => handleFieldChange('duration', Number(e.target.value))}
                    placeholder="여행기간을 입력하세요"
                    className={errors.duration ? styles.error : ''}
                  />
                  {errors.duration && (
                    <span className={styles.errorMessage}>{errors.duration}</span>
                  )}
                </div>

                <div className={styles.fieldGroup}>
                  <label>지역 *</label>
                  <select
                    value={formData.regionId}
                    onChange={(e) => handleFieldChange('regionId', Number(e.target.value))}
                    className={`${styles.select} ${errors.regionId ? styles.error : ''}`}
                  >
                    <option value={0}>지역을 선택하세요</option>
                    {regions.map((region) => (
                      <option key={region.regionId} value={region.regionId}>
                        {region.name}
                      </option>
                    ))}
                  </select>
                  {errors.regionId && (
                    <span className={styles.errorMessage}>{errors.regionId}</span>
                  )}
                </div>

                <div className={styles.fieldGroup}>
                  <label>판매 상태 *</label>
                  <select
                    value={formData.saleStatus}
                    onChange={(e) => handleFieldChange('saleStatus', Number(e.target.value))}
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
                    onChange={(e) => handleFieldChange('type', Number(e.target.value))}
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
                  onChange={(e) => handleFieldChange('description', e.target.value)}
                  placeholder="상품 설명을 입력하세요"
                  className={`${styles.textarea} ${errors.description ? styles.error : ''}`}
                  rows={4}
                />
                {errors.description && (
                  <span className={styles.errorMessage}>{errors.description}</span>
                )}
              </div>
            </section>

            {/* 이미지 URL 섹션 */}
            <section className={styles.section}>
              <h3>이미지 URL</h3>
              <div className={styles.listContainer}>
                {formData.imageUrls.map((url, index) => (
                  <div key={index} className={styles.listItem}>
                    <Input
                      type="url"
                      value={url}
                      onChange={(e) => handleImageUrlChange(index, e.target.value)}
                      placeholder="이미지 URL을 입력하세요"
                      className={styles.flexInput}
                    />
                    <button
                      type="button"
                      onClick={() => removeImageUrl(index)}
                      className={styles.removeButton}
                    >
                      삭제
                    </button>
                  </div>
                ))}
                <button type="button" onClick={addImageUrl} className={styles.addButton}>
                  + 이미지 URL 추가
                </button>
              </div>
            </section>

            {/* 설명 그룹 섹션 */}
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h3>상품 상세 정보</h3>
                <button
                  type="button"
                  onClick={() => setShowNewSectionModal(true)}
                  className={styles.addSectionButton}
                >
                  + 섹션 추가
                </button>
              </div>

              <div className={styles.groupsContainer}>
                {formData.descriptionGroups.map((group, groupIndex) => (
                  <div key={groupIndex} className={styles.descriptionGroup}>
                    <div className={styles.groupHeader}>
                      <h4>{group.title}</h4>
                      {group.type === 2 && (
                        <button
                          type="button"
                          onClick={() => removeSection(groupIndex)}
                          className={styles.removeSectionButton}
                        >
                          섹션 삭제
                        </button>
                      )}
                    </div>

                    <div className={styles.itemsContainer}>
                      {group.items.map((item, itemIndex) => (
                        <div key={itemIndex} className={styles.listItem}>
                          <Input
                            type="text"
                            value={item.content}
                            onChange={(e) =>
                              handleDescriptionItemChange(groupIndex, itemIndex, e.target.value)
                            }
                            placeholder={`${group.title} 항목을 입력하세요`}
                            className={styles.flexInput}
                          />
                          <button
                            type="button"
                            onClick={() => removeDescriptionItem(groupIndex, itemIndex)}
                            className={styles.removeButton}
                            disabled={group.items.length === 1}
                          >
                            삭제
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addDescriptionItem(groupIndex)}
                        className={styles.addButton}
                      >
                        + {group.title} 항목 추가
                      </button>
                    </div>

                    {errors[`descGroup_${groupIndex}`] && (
                      <span className={styles.errorMessage}>
                        {errors[`descGroup_${groupIndex}`]}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* 태그 섹션 */}
            <section className={styles.section}>
              <h3>태그 선택</h3>
              <div className={styles.tagContainer}>
                <div className={styles.availableTags}>
                  <h4>사용 가능한 태그</h4>
                  <div className={styles.tagGrid}>
                    {PREDEFINED_TAGS.map((tag) => {
                      const isSelected = formData.tags.some(
                        (selectedTag) => selectedTag.content === tag
                      );
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => addTag(tag)}
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
                  {formData.tags.length > 0 ? (
                    <div className={styles.tagList}>
                      {formData.tags.map((tag, index) => (
                        <div key={index} className={styles.selectedTag}>
                          <span>{tag.content}</span>
                          <button
                            type="button"
                            onClick={() => removeTag(index)}
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
            </section>
          </div>

          {/* 푸터 */}
          <div className={styles.footer}>
            <Button onClick={handleClose} color="white" disabled={loading}>
              취소
            </Button>
            <Button onClick={handleSave} color="blue" disabled={loading || !hasChanges}>
              {loading ? '저장 중...' : mode === 'create' ? '상품 추가' : '수정 완료'}
            </Button>
          </div>
        </div>
      </Modal>

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
                <Input
                  id="sectionTitle"
                  type="text"
                  value={newSectionTitle}
                  onChange={(e) => handleNewSectionTitleChange(e.target.value)}
                  placeholder="섹션 이름을 입력하세요"
                  className={newSectionError ? styles.error : ''}
                />
                {newSectionError && <span className={styles.errorMessage}>{newSectionError}</span>}
              </div>
            </div>
            <div className={styles.modalFooter}>
              <Button onClick={handleNewSectionModalClose} color="white">
                취소
              </Button>
              <Button onClick={() => handleNewSectionModalConfirm(true)} color="blue">
                추가
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* 닫기 확인 모달 */}
      <AdminConfirmModal
        open={showCloseConfirm}
        title="변경사항 확인"
        contents="변경사항이 있습니다. 정말로 닫으시겠습니까?"
        confirmText="닫기"
        cancelText="계속 작업"
        variant="warning"
        handleConfirm={handleCloseConfirm}
        onClose={() => setShowCloseConfirm(false)}
      />
    </>
  );
};

export default AdminProductModal;
