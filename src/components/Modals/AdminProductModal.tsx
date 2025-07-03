import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import Button from '@/components/atoms/Button/Button';
import Modal from '@/components/Modal/Modal';
import ModalCloseButton from '@/components/Modal/ModalCloseButton';
import ModalHeader from '@/components/Modal/ModalHeader';
import AdminConfirmModal from '@/components/Modals/AdminConfirmModal';
import AdminProductDescriptionSection from '@/components/Modals/AdminProductDescriptionSection';
import AdminProductFormSection from '@/components/Modals/AdminProductFormSection';
import AdminProductImageSection from '@/components/Modals/AdminProductImageSection';
import AdminProductTagSection from '@/components/Modals/AdminProductTagSection';
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

// 기본 필수 섹션 (포함사항, 불포함사항) - type 0, 1로 정확히 설정
const getDefaultSections = (): DescriptionGroup[] => [
  {
    title: '포함사항',
    type: 0, // 포함사항
    sortOrder: 1,
    items: [{ content: '', sortOrder: 1 }]
  },
  {
    title: '불포함사항',
    type: 1, // 불포함사항
    sortOrder: 2,
    items: [{ content: '', sortOrder: 1 }]
  }
];

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
  descriptionGroups: getDefaultSections(),
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

  // 초기 데이터 설정
  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && productDetail) {
        // 편집 모드: 기존 데이터로 초기화
        const tagsGroup = productDetail.descriptionGroups.find((group) => group.title === 'tags');
        const otherGroups = productDetail.descriptionGroups.filter(
          (group) => group.title !== 'tags'
        );

        // 기본 섹션이 없으면 추가
        const finalGroups = [...otherGroups];

        // 포함사항 섹션 확인 및 추가 (type: 0)
        const hasIncludeSection = finalGroups.some((group) => group.type === 0);
        if (!hasIncludeSection) {
          finalGroups.unshift({
            title: '포함사항',
            type: 0,
            sortOrder: 1,
            items: [{ content: '', sortOrder: 1 }]
          });
        }

        // 불포함사항 섹션 확인 및 추가 (type: 1)
        const hasExcludeSection = finalGroups.some((group) => group.type === 1);
        if (!hasExcludeSection) {
          const insertIndex = hasIncludeSection ? 1 : 1;
          finalGroups.splice(insertIndex, 0, {
            title: '불포함사항',
            type: 1,
            sortOrder: 2,
            items: [{ content: '', sortOrder: 1 }]
          });
        }

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
          descriptionGroups: finalGroups,
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
        formData.name.trim() !== '' ||
        formData.price > 0 ||
        formData.totalQuantity > 0 ||
        formData.description.trim() !== '';
      setHasChanges(hasRequiredFields);
    } else if (mode === 'edit' && productDetail) {
      // 편집 모드에서는 원본 데이터와 비교
      const originalTags =
        productDetail.descriptionGroups.find((g) => g.title === 'tags')?.items || [];

      // 설명 그룹 비교 (tags 제외) - 더 정확한 비교
      const originalDescGroups = productDetail.descriptionGroups.filter((g) => g.title !== 'tags');
      const currentDescGroups = formData.descriptionGroups;

      // 각 그룹의 내용을 정규화해서 비교
      const normalizeGroup = (group: DescriptionGroup) => ({
        title: group.title.trim(),
        type: group.type,
        items: group.items
          .filter((item) => item.content.trim() !== '') // 빈 항목 제거
          .map((item) => item.content.trim())
          .sort() // 순서에 관계없이 비교하기 위해 정렬
      });

      const originalNormalized = originalDescGroups
        .map(normalizeGroup)
        .sort((a, b) => a.title.localeCompare(b.title));

      const currentNormalized = currentDescGroups
        .map(normalizeGroup)
        .sort((a, b) => a.title.localeCompare(b.title));

      const descGroupsChanged =
        JSON.stringify(originalNormalized) !== JSON.stringify(currentNormalized);

      // 태그 변경 감지
      const tagsChanged =
        JSON.stringify(
          formData.tags
            .map((t) => t.content.trim())
            .filter((t) => t !== '')
            .sort()
        ) !==
        JSON.stringify(
          originalTags
            .map((t) => t.content.trim())
            .filter((t) => t !== '')
            .sort()
        );

      // 이미지 변경 감지 (순서에 관계없이)
      const imageUrlsChanged =
        JSON.stringify([...formData.imageUrls].sort()) !==
        JSON.stringify([...productDetail.imageUrls].sort());

      const changed =
        formData.name.trim() !== productDetail.name.trim() ||
        formData.price !== productDetail.price ||
        formData.totalQuantity !== productDetail.totalQuantity ||
        formData.stockQuantity !== productDetail.stockQuantity ||
        formData.description.trim() !== productDetail.description.trim() ||
        formData.saleStatus !== productDetail.saleStatus ||
        formData.type !== productDetail.type ||
        formData.duration !== productDetail.duration ||
        formData.regionId !== productDetail.region.regionId ||
        imageUrlsChanged ||
        tagsChanged ||
        descGroupsChanged;

      console.log('Change detection:', {
        nameChanged: formData.name.trim() !== productDetail.name.trim(),
        priceChanged: formData.price !== productDetail.price,
        descriptionChanged: formData.description.trim() !== productDetail.description.trim(),
        descGroupsChanged,
        tagsChanged,
        imageUrlsChanged,
        finalChanged: changed
      });

      setHasChanges(changed);
    }
  }, [formData, mode, productDetail]);

  // 기본 필드 변경 핸들러
  const handleFieldChange = (field: string, value: string | number | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // 실시간 유효성 검사
    let error = '';
    switch (field) {
      case 'name':
        if (String(value).trim() === '') {
          error = '상품명은 필수입니다.';
        } else {
          error = validateProductName(value as string) || '';
        }
        break;
      case 'price':
        if (Number(value) <= 0) {
          error = '가격은 0보다 커야 합니다.';
        } else {
          error = validatePrice(value as number) || '';
        }
        break;
      case 'totalQuantity':
      case 'stockQuantity':
        if (Number(value) < 0) {
          error =
            field === 'totalQuantity'
              ? '총 수량은 0 이상이어야 합니다.'
              : '재고는 0 이상이어야 합니다.';
        } else {
          error = validateQuantity(value as number) || '';
        }
        break;
      case 'duration':
        if (Number(value) <= 0) {
          error = '여행기간은 1일 이상이어야 합니다.';
        } else {
          error = validateDuration(value as number) || '';
        }
        break;
      case 'description':
        if (String(value).trim() === '') {
          error = '상품 설명은 필수입니다.';
        } else {
          error = validateDescription(value as string) || '';
        }
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  // 설명 그룹 항목 변경
  const handleDescriptionItemChange = (groupIndex: number, itemIndex: number, content: string) => {
    setFormData((prev) => {
      const newGroups = [...prev.descriptionGroups];
      if (newGroups[groupIndex] && newGroups[groupIndex].items[itemIndex]) {
        newGroups[groupIndex] = {
          ...newGroups[groupIndex],
          items: newGroups[groupIndex].items.map((item, idx) =>
            idx === itemIndex ? { ...item, content } : item
          )
        };
      }
      return { ...prev, descriptionGroups: newGroups };
    });
  };

  // 설명 그룹 항목 추가 - 중복 실행 방지를 위한 개선
  const handleAddDescriptionItem = (groupIndex: number) => {
    setFormData((prev) => {
      const newGroups = [...prev.descriptionGroups];
      if (newGroups[groupIndex]) {
        const currentItems = newGroups[groupIndex].items;
        const newSortOrder = currentItems.length + 1;
        newGroups[groupIndex] = {
          ...newGroups[groupIndex],
          items: [...currentItems, { content: '', sortOrder: newSortOrder }]
        };
      }
      return { ...prev, descriptionGroups: newGroups };
    });
  };

  // 설명 그룹 항목 제거 - 중복 실행 방지를 위한 개선
  const handleRemoveDescriptionItem = (groupIndex: number, itemIndex: number) => {
    setFormData((prev) => {
      const newGroups = [...prev.descriptionGroups];
      if (newGroups[groupIndex] && newGroups[groupIndex].items.length > 1) {
        const newItems = newGroups[groupIndex].items.filter((_, index) => index !== itemIndex);

        // sortOrder 재정렬
        const reorderedItems = newItems.map((item, idx) => ({
          ...item,
          sortOrder: idx + 1
        }));

        newGroups[groupIndex] = {
          ...newGroups[groupIndex],
          items: reorderedItems
        };
      }
      return { ...prev, descriptionGroups: newGroups };
    });
  };

  // 새 섹션 추가 핸들러 - 기타 타입(2)으로 설정
  const handleAddNewSection = (title: string) => {
    setFormData((prev) => {
      const newSortOrder = prev.descriptionGroups.length + 1;
      const newGroup: DescriptionGroup = {
        title: title.trim(),
        type: 2, // 기타 타입
        sortOrder: newSortOrder,
        items: [{ content: '', sortOrder: 1 }]
      };

      return {
        ...prev,
        descriptionGroups: [...prev.descriptionGroups, newGroup]
      };
    });
  };

  // 섹션 삭제
  const handleRemoveSection = (groupIndex: number) => {
    setFormData((prev) => {
      const newGroups = prev.descriptionGroups.filter((_, index) => index !== groupIndex);

      // sortOrder 재정렬
      newGroups.forEach((group, idx) => {
        group.sortOrder = idx + 1;
      });

      return { ...prev, descriptionGroups: newGroups };
    });
  };

  // 태그 추가
  const handleAddTag = (tagContent: string) => {
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

  // 태그 제거
  const handleRemoveTag = (index: number) => {
    setFormData((prev) => {
      const newTags = prev.tags.filter((_, idx) => idx !== index);

      // sortOrder 재정렬
      newTags.forEach((tag, idx) => {
        tag.sortOrder = idx + 1;
      });

      return { ...prev, tags: newTags };
    });
  };

  // 이미지 URL 전체 변경
  const handleImageUrlsChange = (urls: string[]) => {
    setFormData((prev) => ({
      ...prev,
      imageUrls: urls
    }));
  };

  // 유효성 검사 (개선된 버전)
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

    // 이미지 필수 검사
    const validImageUrls = formData.imageUrls.filter((url) => url.trim() !== '');
    if (validImageUrls.length === 0) {
      newErrors.imageUrls = '상품 이미지는 최소 1개 이상 필요합니다.';
    }

    // 필수 섹션 검사 (포함사항: type 0, 불포함사항: type 1)
    const includeSection = formData.descriptionGroups.find((group) => group.type === 0);
    const excludeSection = formData.descriptionGroups.find((group) => group.type === 1);

    if (!includeSection || !includeSection.items.some((item) => item.content.trim() !== '')) {
      newErrors.includeSection = '포함사항에 최소 1개 항목이 필요합니다.';
    }

    if (!excludeSection || !excludeSection.items.some((item) => item.content.trim() !== '')) {
      newErrors.excludeSection = '불포함사항에 최소 1개 항목이 필요합니다.';
    }

    // 기타 섹션들도 내용이 있는지 검사 (있다면 최소 1개 항목 필요)
    formData.descriptionGroups.forEach((group, groupIndex) => {
      if (group.type === 2) {
        // 기타 섹션
        const hasValidItem = group.items.some((item) => item.content.trim() !== '');
        if (!hasValidItem) {
          newErrors[`descGroup_${groupIndex}`] = `${group.title}에 최소 1개 항목이 필요합니다.`;
        }
      }
    });

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

      // tags 그룹 추가 (태그가 있는 경우에만)
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
          name: formData.name.trim(),
          price: formData.price,
          totalQuantity: formData.totalQuantity,
          description: formData.description.trim(),
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
          name: formData.name.trim(),
          price: formData.price,
          totalQuantity: formData.totalQuantity,
          stockQuantity: formData.stockQuantity,
          description: formData.description.trim(),
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
            <AdminProductFormSection
              formData={formData}
              errors={errors}
              regions={regions}
              mode={mode}
              onFieldChange={handleFieldChange}
            />

            {/* 이미지 관리 섹션 */}
            <AdminProductImageSection
              imageUrls={formData.imageUrls}
              errors={errors}
              onImageUrlsChange={handleImageUrlsChange}
            />

            {/* 설명 그룹 섹션 */}
            <AdminProductDescriptionSection
              descriptionGroups={formData.descriptionGroups}
              errors={errors}
              onDescriptionItemChange={handleDescriptionItemChange}
              onAddDescriptionItem={handleAddDescriptionItem}
              onRemoveDescriptionItem={handleRemoveDescriptionItem}
              onAddNewSection={handleAddNewSection}
              onRemoveSection={handleRemoveSection}
            />

            {/* 태그 섹션 */}
            <AdminProductTagSection
              tags={formData.tags}
              errors={errors}
              onAddTag={handleAddTag}
              onRemoveTag={handleRemoveTag}
            />
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
