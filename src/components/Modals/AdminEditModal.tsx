import React, { useEffect, useState } from 'react';

import Button from '@/components/atoms/Button/Button';
import Input from '@/components/atoms/Input/Input';
import AdminConfirmModal from '@/components/Modals/AdminConfirmModal';
import GenericModal from '@/components/Modals/GenericModal';

import styles from './AdminEditModal.module.scss';

export interface EditField {
  key: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'number' | 'select';
  value: string | number;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  options?: { value: string | number; label: string }[]; // select용
  validation?: (value: string | number) => string | null; // 커스텀 유효성 검사
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
  const [formData, setFormData] = useState<Record<string, string | number>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  // 모달이 열릴 때 초기 데이터 설정
  useEffect(() => {
    if (isOpen) {
      const initialData: Record<string, string | number> = {};
      fields.forEach((field) => {
        initialData[field.key] = field.value;
      });
      setFormData(initialData);
      setIsEditing(false);
      setHasChanges(false);
      setErrors({});
    }
  }, [isOpen, fields]);

  // 데이터 변경 감지
  useEffect(() => {
    const hasAnyChanges = fields.some((field) => formData[field.key] !== field.value);
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

  // 닫기 확인
  const handleCloseConfirm = async (isConfirm: boolean) => {
    setShowCloseConfirm(false);
    if (isConfirm) {
      onClose();
    }
  };

  // 입력값 변경
  const handleInputChange = (key: string, value: string | number) => {
    if (!isEditing) return;

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
    if (isEditing && hasChanges) {
      setShowCancelConfirm(true);
    } else {
      setIsEditing(!isEditing);
      if (!isEditing) {
        setErrors({});
      }
    }
  };

  // 편집 취소 확인
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
    }
  };

  // 저장
  const handleSave = async () => {
    // 유효성 검사
    const newErrors: Record<string, string> = {};
    let hasValidationErrors = false;

    fields.forEach((field) => {
      const value = formData[field.key];

      // 필수 필드 검사
      if (field.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
        newErrors[field.key] = `${field.label}은(는) 필수 입력 항목입니다.`;
        hasValidationErrors = true;
      }

      // 커스텀 유효성 검사
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
        if (formData[field.key] !== field.value) {
          changedData[field.key] = formData[field.key];
        }
      });

      await onSave(changedData);
      setIsEditing(false);
    } catch (error) {
      console.error('Save failed:', error);
    }
  };

  // 필드 렌더링
  const renderField = (field: EditField) => {
    const value = formData[field.key] || '';
    const error = errors[field.key];
    const isFieldDisabled = field.disabled || !isEditing;

    if (field.type === 'select') {
      return (
        <div key={field.key} className={styles.fieldGroup}>
          <label className={styles.label}>
            {field.label}
            {field.required && <span className={styles.required}>*</span>}
          </label>
          <select
            value={value}
            onChange={(e) => handleInputChange(field.key, e.target.value)}
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
      <div key={field.key} className={styles.fieldGroup}>
        <label className={styles.label}>
          {field.label}
          {field.required && <span className={styles.required}>*</span>}
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
          className={`${error ? styles.inputError : ''}`}
        />
        {error && <span className={styles.errorMessage}>{error}</span>}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <>
      <GenericModal open={isOpen} onClose={handleClose} title={title}>
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
          <div className={styles.footer}>
            <div className={styles.leftActions}>
              {!isEditing && (
                <Button onClick={handleEditToggle} disabled={loading} color="blue">
                  수정하기
                </Button>
              )}
            </div>

            <div className={styles.rightActions}>
              {isEditing ? (
                <>
                  <Button onClick={handleEditToggle} disabled={loading} color="white">
                    취소
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={loading || !hasChanges || Object.keys(errors).length > 0}
                    color="blue"
                  >
                    {loading ? '저장 중...' : saveButtonText}
                  </Button>
                </>
              ) : (
                <Button onClick={handleClose} disabled={loading} color="white">
                  {cancelButtonText}
                </Button>
              )}
            </div>
          </div>
        </div>
      </GenericModal>

      {/* 닫기 확인 모달 */}
      <AdminConfirmModal
        open={showCloseConfirm}
        title="변경사항 확인"
        contents="변경사항이 있습니다. 정말로 닫으시겠습니까?"
        confirmText="닫기"
        cancelText="계속 편집"
        variant="warning"
        handleConfirm={handleCloseConfirm}
        onClose={() => setShowCloseConfirm(false)}
      />

      {/* 편집 취소 확인 모달 */}
      <AdminConfirmModal
        open={showCancelConfirm}
        title="편집 취소 확인"
        contents="변경사항이 저장되지 않았습니다. 편집을 취소하시겠습니까?"
        confirmText="취소하기"
        cancelText="계속 편집"
        variant="warning"
        handleConfirm={handleCancelConfirm}
        onClose={() => setShowCancelConfirm(false)}
      />
    </>
  );
};

export default AdminEditModal;
