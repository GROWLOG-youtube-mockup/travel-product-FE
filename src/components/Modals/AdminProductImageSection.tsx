import React, { useState } from 'react';
import toast from 'react-hot-toast';

import Button from '@/components/atoms/Button/Button';
import AdminConfirmModal from '@/components/Modals/AdminConfirmModal';
import ImageUploadModal from '@/components/Modals/ImageUploadModal';
import { useDeleteImagesApi } from '@/hooks/useDeleteImagesAPI';

import styles from './AdminProductImageSection.module.scss';

interface AdminProductImageSectionProps {
  imageUrls: string[];
  errors: Record<string, string>;
  isChanged?: boolean;
  onImageUrlsChange: (urls: string[]) => void;
}

const AdminProductImageSection: React.FC<AdminProductImageSectionProps> = ({
  imageUrls,
  errors,
  isChanged = false,
  onImageUrlsChange
}) => {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string>('');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(-1);

  // 이미지 삭제 API 훅
  const deleteImageMutation = useDeleteImagesApi({
    onSuccess: () => {
      toast.success('이미지가 성공적으로 삭제되었습니다.');
      // 로컬 상태에서도 제거
      const newUrls = imageUrls.filter((_, index) => index !== selectedImageIndex);
      onImageUrlsChange(newUrls);
      setDeleteModalOpen(false);
      setSelectedImageUrl('');
      setSelectedImageIndex(-1);
    },
    onError: (error) => {
      console.error('이미지 삭제 에러:', error);
      toast.error('이미지 삭제 중 오류가 발생했습니다.');
    }
  });

  const handleImageUploaded = (newImageUrl: string) => {
    const updatedUrls = [...imageUrls, newImageUrl];
    onImageUrlsChange(updatedUrls);
  };

  const handleDeleteClick = (imageUrl: string, index: number) => {
    setSelectedImageUrl(imageUrl);
    setSelectedImageIndex(index);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async (isConfirm: boolean) => {
    if (isConfirm && selectedImageUrl) {
      try {
        // API 요청 본문에 URL 배열 전달
        await deleteImageMutation.mutateAsync([selectedImageUrl]);
      } catch (error) {
        console.error('삭제 API 호출 실패:', error);
      }
    } else {
      setDeleteModalOpen(false);
      setSelectedImageUrl('');
      setSelectedImageIndex(-1);
    }
  };

  const extractImageName = (url: string): string => {
    try {
      const urlObj = new URL(url);
      const pathname = urlObj.pathname;
      const segments = pathname.split('/');
      return segments[segments.length - 1];
    } catch {
      return 'Unknown';
    }
  };

  return (
    <>
      <section className={`${styles.section} ${isChanged ? styles.sectionModified : ''}`}>
        <h3>
          이미지 관리 <span className={styles.required}>*</span>
          <span className={styles.requiredIndicator}> (최소 1개 필수)</span>
          {isChanged && <span className={styles.changedIndicator}> ✅ 변경됨</span>}
        </h3>

        <div className={styles.imageManagementContainer}>
          {/* 업로드 버튼 */}
          <div className={styles.uploadButtonContainer}>
            <Button
              onClick={() => setUploadModalOpen(true)}
              color="blue"
              className={styles.uploadButton}
            >
              + 이미지 업로드
            </Button>
            <p className={styles.uploadHelp}>
              JPG, PNG, GIF 파일을 업로드할 수 있습니다. (최대 5MB)
            </p>
          </div>

          {/* 업로드된 이미지 목록 */}
          {imageUrls.length > 0 ? (
            <div className={styles.imageGrid}>
              {imageUrls.map((url, index) => (
                <div key={index} className={styles.imageItem}>
                  <div className={styles.imageContainer}>
                    <img
                      src={url}
                      alt={`상품 이미지 ${index + 1}`}
                      className={styles.productImage}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/default-product-image.jpg';
                      }}
                    />
                    <div className={styles.imageOverlay}>
                      <button
                        type="button"
                        onClick={() => handleDeleteClick(url, index)}
                        className={styles.deleteImageButton}
                        disabled={deleteImageMutation.isPending}
                        title="이미지 삭제"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                  <div className={styles.imageInfo}>
                    <span className={styles.imageName} title={extractImageName(url)}>
                      {extractImageName(url)}
                    </span>
                    <span className={styles.imageIndex}>이미지 {index + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyImageState}>
              <div className={styles.emptyIcon}>🖼️</div>
              <p className={styles.emptyText}>업로드된 이미지가 없습니다</p>
              <p className={styles.emptySubText}>상품 이미지를 최소 1개 이상 업로드해주세요</p>
            </div>
          )}
        </div>

        {/* 에러 메시지 */}
        {errors.imageUrls && <span className={styles.errorMessage}>{errors.imageUrls}</span>}

        {/* 도움말 */}
        <div className={styles.helpText}>
          <p>* 상품 이미지는 필수입니다. 첫 번째 이미지가 썸네일로 사용됩니다.</p>
        </div>
      </section>

      {/* 이미지 업로드 모달 */}
      <ImageUploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onImageUploaded={handleImageUploaded}
      />

      {/* 이미지 삭제 확인 모달 */}
      <AdminConfirmModal
        open={deleteModalOpen}
        title="이미지 삭제"
        contents={`선택한 이미지를 삭제하시겠습니까? 삭제된 이미지는 복구할 수 없습니다.`}
        confirmText="삭제하기"
        cancelText="취소"
        variant="danger"
        loading={deleteImageMutation.isPending}
        handleConfirm={handleDeleteConfirm}
        onClose={() => setDeleteModalOpen(false)}
      />
    </>
  );
};

export default AdminProductImageSection;
