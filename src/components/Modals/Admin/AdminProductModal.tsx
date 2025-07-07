import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/atoms/Button/Button';
import AdminModalHeader from '@/components/Modal/AdminModalHeader';
import Modal from '@/components/Modal/Modal';
import ModalCloseButton from '@/components/Modal/ModalCloseButton';
import AdminConfirmModal from '@/components/Modals/Admin/AdminConfirmModal';
import AdminProductDescriptionSection from '@/components/Modals/Admin/AdminProductDescriptionSection';
import AdminProductFormSection from '@/components/Modals/Admin/AdminProductFormSection';
import AdminProductImageSection from '@/components/Modals/Admin/AdminProductImageSection';
import AdminProductTagSection from '@/components/Modals/Admin/AdminProductTagSection';
import { handleApiError } from '@/lib/handleApiError';
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
  price: number | string;
  totalQuantity: number | string;
  stockQuantity: number | string;
  description: string;
  saleStatus: number;
  type: number;
  duration: number | string;
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
  price: '',
  totalQuantity: '',
  stockQuantity: '',
  description: '',
  saleStatus: 0,
  type: 0,
  duration: '',
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
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [originalData, setOriginalData] = useState<FormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [hasChanges, setHasChanges] = useState(false);
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);
  const [changedFields, setChangedFields] = useState<Set<string>>(new Set());
  const [changedGroups, setChangedGroups] = useState<Set<number>>(new Set());

  // 초기 데이터 설정
  useEffect(() => {
    if (isOpen) {
      let initialData: FormData;

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

        initialData = {
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
        };
      } else {
        // 생성 모드: 빈 폼으로 초기화
        initialData = INITIAL_FORM_DATA;
      }

      setFormData(initialData);
      setOriginalData(initialData);
      setErrors({});
      setHasChanges(false);
      setChangedFields(new Set());
      setChangedGroups(new Set());
    }
  }, [isOpen, mode, productDetail]);

  // 변경사항 감지 및 변경된 필드 추적
  useEffect(() => {
    const newChangedFields = new Set<string>();
    const newChangedGroups = new Set<number>();
    let hasAnyChanges = false;

    if (mode === 'create') {
      // 생성 모드에서는 필수 필드가 채워져 있으면 변경사항 있음으로 간주
      const hasRequiredFields =
        formData.name.trim() !== '' ||
        (formData.price !== '' && Number(formData.price) > 0) ||
        (formData.totalQuantity !== '' && Number(formData.totalQuantity) > 0) ||
        formData.description.trim() !== '';
      hasAnyChanges = hasRequiredFields;
    } else if (mode === 'edit') {
      // 편집 모드에서는 원본 데이터와 비교
      const fieldsToCheck = [
        'name',
        'price',
        'totalQuantity',
        'stockQuantity',
        'description',
        'saleStatus',
        'type',
        'duration',
        'regionId'
      ];

      fieldsToCheck.forEach((field) => {
        const currentValue = formData[field as keyof FormData];
        const originalValue = originalData[field as keyof FormData];

        if (field === 'name' || field === 'description') {
          if (String(currentValue).trim() !== String(originalValue).trim()) {
            newChangedFields.add(field);
            hasAnyChanges = true;
          }
        } else if (
          field === 'price' ||
          field === 'totalQuantity' ||
          field === 'stockQuantity' ||
          field === 'duration'
        ) {
          // 숫자 필드는 숫자로 변환해서 비교
          const currentNum = Number(currentValue) || 0;
          const originalNum = Number(originalValue) || 0;
          if (currentNum !== originalNum) {
            newChangedFields.add(field);
            hasAnyChanges = true;
          }
        } else if (currentValue !== originalValue) {
          newChangedFields.add(field);
          hasAnyChanges = true;
        }
      });

      // 이미지 변경 감지
      const imageUrlsChanged =
        JSON.stringify([...formData.imageUrls].sort()) !==
        JSON.stringify([...originalData.imageUrls].sort());

      if (imageUrlsChanged) {
        newChangedFields.add('imageUrls');
        hasAnyChanges = true;
      }

      // 태그 변경 감지
      const tagsChanged =
        JSON.stringify(
          formData.tags
            .map((t) => t.content.trim())
            .filter((t) => t !== '')
            .sort()
        ) !==
        JSON.stringify(
          originalData.tags
            .map((t) => t.content.trim())
            .filter((t) => t !== '')
            .sort()
        );

      if (tagsChanged) {
        newChangedFields.add('tags');
        hasAnyChanges = true;
      }

      // 설명 그룹 변경 감지 - 각 그룹별로 개별 체크
      formData.descriptionGroups.forEach((currentGroup, groupIndex) => {
        const originalGroup = originalData.descriptionGroups[groupIndex];

        if (!originalGroup) {
          // 새로 추가된 그룹
          newChangedGroups.add(groupIndex);
          newChangedFields.add('descriptionGroups');
          hasAnyChanges = true;
          return;
        }

        // 그룹 제목 변경 체크
        if (currentGroup.title.trim() !== originalGroup.title.trim()) {
          newChangedGroups.add(groupIndex);
          newChangedFields.add('descriptionGroups');
          hasAnyChanges = true;
          return;
        }

        // 아이템 변경 체크
        const currentItems = currentGroup.items
          .filter((item) => item.content.trim() !== '')
          .map((item) => item.content.trim())
          .sort();

        const originalItems = originalGroup.items
          .filter((item) => item.content.trim() !== '')
          .map((item) => item.content.trim())
          .sort();

        if (JSON.stringify(currentItems) !== JSON.stringify(originalItems)) {
          newChangedGroups.add(groupIndex);
          newChangedFields.add('descriptionGroups');
          hasAnyChanges = true;
        }
      });

      // 삭제된 그룹 체크
      if (originalData.descriptionGroups.length > formData.descriptionGroups.length) {
        newChangedFields.add('descriptionGroups');
        hasAnyChanges = true;
      }
    }

    setChangedFields(newChangedFields);
    setChangedGroups(newChangedGroups);
    setHasChanges(hasAnyChanges);
  }, [formData, originalData, mode]);

  // 기본 필드 변경 핸들러
  const handleFieldChange = (field: string, value: string | number | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // 실시간 유효성 검사
    let error = '';
    switch (field) {
      case 'name': {
        if (String(value).trim() === '') {
          error = '상품명은 필수입니다.';
        } else {
          error = validateProductName(value as string) || '';
        }
        break;
      }
      case 'price': {
        const priceValue = Number(value);
        if (value === '' || isNaN(priceValue) || priceValue <= 0) {
          error = '가격은 0보다 커야 합니다.';
        } else {
          error = validatePrice(priceValue) || '';
        }
        break;
      }
      case 'totalQuantity':
      case 'stockQuantity': {
        const quantityValue = Number(value);
        if (value === '' || isNaN(quantityValue) || quantityValue < 0) {
          error =
            field === 'totalQuantity'
              ? '총 수량은 0 이상이어야 합니다.'
              : '재고는 0 이상이어야 합니다.';
        } else {
          error = validateQuantity(quantityValue) || '';
        }
        break;
      }
      case 'duration': {
        const durationValue = Number(value);
        if (value === '' || isNaN(durationValue) || durationValue <= 0) {
          error = '여행기간은 1일 이상이어야 합니다.';
        } else {
          error = validateDuration(durationValue) || '';
        }
        break;
      }
      case 'description': {
        if (String(value).trim() === '') {
          error = '상품 설명은 필수입니다.';
        } else {
          error = validateDescription(value as string) || '';
        }
        break;
      }
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

  // 설명 그룹 항목 추가
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

  // 설명 그룹 항목 제거
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

  // 새 섹션 추가 핸들러
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

  // 유효성 검사
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // 필수 필드 검사
    if (!formData.name.trim()) newErrors.name = '상품명은 필수입니다.';

    const priceValue = Number(formData.price);
    if (formData.price === '' || isNaN(priceValue) || priceValue <= 0) {
      newErrors.price = '가격은 0보다 커야 합니다.';
    }

    const totalQuantityValue = Number(formData.totalQuantity);
    if (formData.totalQuantity === '' || isNaN(totalQuantityValue) || totalQuantityValue <= 0) {
      newErrors.totalQuantity = '총 수량은 0보다 커야 합니다.';
    }

    if (mode === 'edit') {
      const stockQuantityValue = Number(formData.stockQuantity);
      if (formData.stockQuantity === '' || isNaN(stockQuantityValue) || stockQuantityValue < 0) {
        newErrors.stockQuantity = '재고는 0 이상이어야 합니다.';
      }
    }

    if (!formData.description.trim()) newErrors.description = '상품 설명은 필수입니다.';

    const durationValue = Number(formData.duration);
    if (formData.duration === '' || isNaN(durationValue) || durationValue <= 0) {
      newErrors.duration = '여행기간은 1일 이상이어야 합니다.';
    }

    if (formData.regionId <= 0) newErrors.regionId = '지역을 선택해주세요.';

    // 이미지 필수 검사
    const validImageUrls = formData.imageUrls.filter((url) => url.trim() !== '');
    if (validImageUrls.length === 0) {
      newErrors.imageUrls = '상품 이미지는 최소 1개 이상 필요합니다.';
    }

    // 필수 섹션 검사
    const includeSection = formData.descriptionGroups.find((group) => group.type === 0);
    const excludeSection = formData.descriptionGroups.find((group) => group.type === 1);

    if (!includeSection || !includeSection.items.some((item) => item.content.trim() !== '')) {
      newErrors.includeSection = '포함사항에 최소 1개 항목이 필요합니다.';
    }

    if (!excludeSection || !excludeSection.items.some((item) => item.content.trim() !== '')) {
      newErrors.excludeSection = '불포함사항에 최소 1개 항목이 필요합니다.';
    }

    // 기타 섹션들도 내용이 있는지 검사
    formData.descriptionGroups.forEach((group, groupIndex) => {
      if (group.type === 2) {
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
      // handleApiError로 통일 - 유효성 검사 실패 시
      handleApiError(new Error('입력 정보를 확인해주세요.'), navigate, '/admin/products', {
        useToast: true,
        defaultMessage: '입력 정보를 확인해주세요.'
      });
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
          price: Number(formData.price),
          totalQuantity: Number(formData.totalQuantity),
          description: formData.description.trim(),
          saleStatus: formData.saleStatus,
          type: formData.type,
          duration: Number(formData.duration),
          regionId: formData.regionId,
          imageUrls: cleanedImageUrls,
          descriptionGroups: cleanedDescriptionGroups
        };
        await onCreate(createData);
      } else if (mode === 'edit' && onUpdate) {
        const updateData: AdminProductUpdateRequest = {
          name: formData.name.trim(),
          price: Number(formData.price),
          totalQuantity: Number(formData.totalQuantity),
          stockQuantity: Number(formData.stockQuantity),
          description: formData.description.trim(),
          saleStatus: formData.saleStatus,
          type: formData.type,
          duration: Number(formData.duration),
          regionId: formData.regionId,
          imageUrls: cleanedImageUrls,
          descriptionGroups: cleanedDescriptionGroups
        };
        await onUpdate(updateData);
      }
    } catch (error) {
      handleApiError(error, navigate, '/admin/products', {
        useToast: true,
        defaultMessage: '상품 저장 중 오류가 발생했습니다.'
      });
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
        <AdminModalHeader title={mode === 'create' ? '상품 추가' : '상품 수정'}>
          <ModalCloseButton onClick={handleClose} />
        </AdminModalHeader>

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
              changedFields={changedFields}
              onFieldChange={handleFieldChange}
            />

            {/* 이미지 관리 섹션 */}
            <AdminProductImageSection
              imageUrls={formData.imageUrls}
              errors={errors}
              isChanged={changedFields.has('imageUrls')}
              onImageUrlsChange={handleImageUrlsChange}
            />

            {/* 설명 그룹 섹션 */}
            <AdminProductDescriptionSection
              descriptionGroups={formData.descriptionGroups}
              errors={errors}
              isChanged={changedFields.has('descriptionGroups')}
              changedGroups={changedGroups}
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
              isChanged={changedFields.has('tags')}
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
