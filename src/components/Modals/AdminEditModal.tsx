import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/atoms/Button/Button';
import Input from '@/components/atoms/Input/Input';
import Modal from '@/components/Modal/Modal';
import ModalCloseButton from '@/components/Modal/ModalCloseButton';
import ModalHeader from '@/components/Modal/ModalHeader';
import AdminConfirmModal from '@/components/Modals/AdminConfirmModal';
import { handleApiError } from '@/lib/handleApiError';

import styles from './AdminEditModal.module.scss';

export interface EditField {
  key: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'number' | 'select';
  value: string | number;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  options?: { value: string | number; label: string }[];
  validation?: (value: string | number) => string | null;
}

export interface AdminEditModalProps {
  isOpen: boolean;
  title: string;
  fields: EditField[];
  loading?: boolean;
  onClose: () => void;
  onSave: (data: Record<string, string | number>) => Promise<void> | void;
  saveButtonText?: string;
  cancelButtonText?: string;
}

const AdminEditModal: React.FC<AdminEditModalProps> = ({
  isOpen,
  title,
  fields,
  loading = false,
  onClose,
  onSave,
  saveButtonText = '수정 완료',
  cancelButtonText = '닫기'
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Record<string, string | number>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  // 모달이 열릴 때 초기 데이터 설정
  useEffect(() => {
    if (isOpen && fields.length > 0) {
      const initialData: Record<string, string | number> = {};
      fields.forEach((field) => {
        initialData[field.key] = field.value;
      });

      setFormData(initialData);
      setIsEditing(false);
      setHasChanges(false); // 명시적으로 false 설정
      setErrors({});
    }
  }, [isOpen, fields]);

  // 데이터 변경 감지
  useEffect(() => {
    if (fields.length === 0 || Object.keys(formData).length === 0) {
      setHasChanges(false);
      return;
    }

    const hasAnyChanges = fields.some((field) => {
      const currentValue = formData[field.key];
      const originalValue = field.value;

      // 타입 통일하여 비교 (문자열로 변환)
      const currentStr = String(currentValue ?? '');
      const originalStr = String(originalValue ?? '');

      return currentStr !== originalStr;
    });

    setHasChanges(hasAnyChanges);
  }, [formData, fields]);

  // 모달 닫기
  const handleClose = () => {
    if (hasChanges && isEditing) {
      setShowCloseConfirm(true);
    } else {
      onClose();
    }
  };

  // 입력값 변경
  const handleInputChange = (key: string, value: string | number) => {
    if (!isEditing) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [key]: value
    }));

    // 실시간 유효성 검사
    const field = fields.find((f) => f.key === key);
    if (field?.validation) {
      const error = field.validation(value);
      setErrors((prev) => ({
        ...prev,
        [key]: error || ''
      }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[key];
        return newErrors;
      });
    }
  };

  // 수정 모드 토글
  const handleEditToggle = () => {
    const newEditingState = !isEditing;
    setIsEditing(newEditingState);
    if (!newEditingState) {
      setErrors({});
      setHasChanges(false); // 편집 모드 종료 시 변경사항도 초기화
    }
  };

  // 편집 취소 (보기 모드로 돌아가기)
  const handleCancelEdit = () => {
    if (hasChanges) {
      setShowCancelConfirm(true);
    } else {
      setIsEditing(false);
      setErrors({});
    }
  };

  // 저장
  const handleSave = async () => {
    // 유효성 검사
    const newErrors: Record<string, string> = {};
    let hasValidationErrors = false;

    fields.forEach((field) => {
      const value = formData[field.key];

      // disabled 필드는 유효성 검사에서 제외
      if (field.disabled) {
        return;
      }

      if (field.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
        newErrors[field.key] = `${field.label}은(는) 필수 입력 항목입니다.`;
        hasValidationErrors = true;
      }

      if (field.validation && value) {
        const error = field.validation(value);
        if (error) {
          newErrors[field.key] = error;
          hasValidationErrors = true;
        }
      }
    });

    setErrors(newErrors);

    if (hasValidationErrors) {
      return;
    }

    try {
      // 변경된 데이터만 추출
      const changedData: Record<string, string | number> = {};
      fields.forEach((field) => {
        if (formData[field.key] !== field.value && !field.disabled) {
          changedData[field.key] = formData[field.key];
        }
      });

      if (Object.keys(changedData).length > 0) {
        await onSave(changedData);
      }

      setIsEditing(false);
    } catch (error) {
      handleApiError(error, navigate, undefined, {
        useToast: true,
        defaultMessage: '저장 중 오류가 발생했습니다.'
      });
    }
  };

  // 닫기 확인 처리
  const handleCloseConfirm = async (isConfirm: boolean) => {
    setShowCloseConfirm(false);
    if (isConfirm) {
      onClose();
    }
  };

  // 편집 취소 확인 처리
  const handleCancelConfirm = async (isConfirm: boolean) => {
    setShowCancelConfirm(false);
    if (isConfirm) {
      // 원래 데이터로 복원
      const originalData: Record<string, string | number> = {};
      fields.forEach((field) => {
        originalData[field.key] = field.value;
      });
      setFormData(originalData);
      setIsEditing(false);
      setErrors({});
      setHasChanges(false);
    }
  };

  // 필드 렌더링
  const renderField = (field: EditField) => {
    const value = formData[field.key] || '';
    const originalValue = field.value ?? '';
    const error = errors[field.key];
    const isFieldDisabled = field.disabled || !isEditing;
    const isEditable = !field.disabled && isEditing;

    const isModified = isEditing && String(value) !== String(originalValue) && !isFieldDisabled;
    // 필드 그룹의 클래스명 결정
    const fieldGroupClass = [
      styles.fieldGroup,
      isEditable ? styles.editable : '',
      isModified ? styles.modified : ''
    ]
      .filter(Boolean)
      .join(' ');

    if (field.type === 'select') {
      return (
        <div key={field.key} className={fieldGroupClass}>
          <label className={styles.label}>
            {field.label}
            {field.required && <span className={styles.required}>*</span>}
            {isEditable && <span className={styles.editableIndicator}> (수정 가능)</span>}
          </label>
          <select
            value={value}
            onChange={(e) => {
              handleInputChange(field.key, e.target.value);
            }}
            disabled={isFieldDisabled}
            className={`${styles.select} ${error ? styles.error : ''} ${isFieldDisabled ? styles.disabled : ''}`}
          >
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
      );
    }

    return (
      <div key={field.key} className={fieldGroupClass}>
        <label className={styles.label}>
          {field.label}
          {field.required && <span className={styles.required}>*</span>}
          {isEditable && <span className={styles.editableIndicator}> (수정 가능)</span>}
        </label>
        <Input
          type={field.type}
          value={String(value)}
          onChange={(e) =>
            handleInputChange(
              field.key,
              field.type === 'number' ? Number(e.target.value) : e.target.value
            )
          }
          disabled={isFieldDisabled}
          placeholder={field.placeholder}
          className={`${error ? styles.inputError : ''} ${isFieldDisabled ? styles.inputDisabled : ''}`}
        />
        {error && <span className={styles.errorMessage}>{error}</span>}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <>
      <Modal
        onClose={handleClose}
        boxStyle={{
          width: 750,
          maxWidth: '85vw'
        }}
      >
        <ModalHeader title={title}>
          <ModalCloseButton onClick={handleClose} />
        </ModalHeader>
        <div className={styles.modalContent}>
          {/* 로딩 오버레이 */}
          {loading && (
            <div className={styles.loadingOverlay}>
              <div className={styles.loadingSpinner}>
                <div className={styles.spinner}></div>
                <span>처리 중...</span>
              </div>
            </div>
          )}

          {/* 본문 */}
          <div className={styles.content}>
            <div className={styles.form}>{fields.map(renderField)}</div>
          </div>

          {/* 푸터 */}
          <div className={`${styles.footer} ${isEditing ? styles.editMode : ''}`}>
            <div className={styles.leftActions}>
              {!isEditing ? (
                <Button onClick={handleEditToggle} disabled={loading} color="blue">
                  수정하기
                </Button>
              ) : (
                <Button onClick={handleCancelEdit} disabled={loading} color="white">
                  ← 보기 모드로 돌아가기
                </Button>
              )}
            </div>

            <div className={styles.rightActions}>
              {isEditing ? (
                <Button
                  onClick={handleSave}
                  disabled={loading || !hasChanges} // 로딩 중이거나 변경사항이 없을 때 비활성화
                  color="blue"
                >
                  {loading ? '저장 중...' : saveButtonText}
                </Button>
              ) : (
                <Button onClick={handleClose} disabled={loading} color="white">
                  {cancelButtonText}
                </Button>
              )}
            </div>
          </div>
        </div>
      </Modal>

      {/* 닫기 확인 모달 */}
      <AdminConfirmModal
        open={showCloseConfirm}
        title="변경사항 확인"
        contents="변경사항이 있습니다. 정말로 닫으시겠습니까?"
        confirmText="닫기"
        cancelText="계속 편집"
        variant="danger" // X 버튼 클릭 시 danger variant 적용
        handleConfirm={handleCloseConfirm}
        onClose={() => setShowCloseConfirm(false)}
      />

      {/* 편집 취소 확인 모달 */}
      <AdminConfirmModal
        open={showCancelConfirm}
        title="편집 취소 확인"
        contents="변경사항이 저장되지 않았습니다. 보기 모드로 돌아가시겠습니까?"
        confirmText="돌아가기"
        cancelText="계속 편집"
        variant="warning"
        handleConfirm={handleCancelConfirm}
        onClose={() => setShowCancelConfirm(false)}
      />
    </>
  );
};

export default AdminEditModal;
