import React, { useCallback, useState } from 'react';
import toast from 'react-hot-toast';

import Button from '@/components/atoms/Button/Button';
import Modal from '@/components/Modal/Modal';
import ModalCloseButton from '@/components/Modal/ModalCloseButton';
import ModalHeader from '@/components/Modal/ModalHeader';
import { usePostApi } from '@/hooks/usePostAPI';
import type { ImageUploadRes } from '@/types/api/EndpointResponseMap.type';

import styles from './ImageUploadModal.module.scss';

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImageUploaded: (imageUrl: string) => void;
}

const ImageUploadModal: React.FC<ImageUploadModalProps> = ({
  isOpen,
  onClose,
  onImageUploaded
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  // 이미지 업로드 API 훅
  const uploadImageMutation = usePostApi('/images', {
    onSuccess: (data: ImageUploadRes) => {
      toast.success('이미지가 성공적으로 업로드되었습니다.');

      // ImageUploadRes는 string[] 타입
      if (Array.isArray(data)) {
        data.forEach((url) => onImageUploaded(url));
      }

      handleClose();
    },
    onError: (error) => {
      console.error('이미지 업로드 에러:', error);
      toast.error('이미지 업로드 중 오류가 발생했습니다.');
    }
  });

  const handleClose = () => {
    setSelectedFiles([]);
    setPreviews([]);
    setIsDragOver(false);
    onClose();
  };

  const handleFileSelect = useCallback((files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const imageFiles = fileArray.filter((file) => file.type.startsWith('image/'));

    if (imageFiles.length !== fileArray.length) {
      toast.error('이미지 파일만 업로드할 수 있습니다.');
    }

    if (imageFiles.length === 0) return;

    // 파일 크기 검사 (5MB 제한)
    const oversizedFiles = imageFiles.filter((file) => file.size > 5 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      toast.error('파일 크기는 5MB 이하로 제한됩니다.');
      return;
    }

    setSelectedFiles(imageFiles);

    // 미리보기 생성
    const newPreviews: string[] = [];
    imageFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          newPreviews.push(e.target.result as string);
          if (newPreviews.length === imageFiles.length) {
            setPreviews(newPreviews);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFileSelect(e.target.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    if (e.dataTransfer.files) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      toast.error('업로드할 이미지를 선택해주세요.');
      return;
    }

    try {
      // FormData 생성
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append('files', file);
      });

      // API 호출 (FormData를 직접 전달)
      await uploadImageMutation.mutateAsync(formData as FormData);
    } catch (error) {
      console.error('업로드 실패:', error);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    setPreviews(newPreviews);
  };

  if (!isOpen) return null;

  return (
    <Modal
      onClose={handleClose}
      boxStyle={{
        width: 600,
        maxWidth: '90vw',
        minHeight: 400
      }}
    >
      <ModalHeader title="이미지 업로드">
        <ModalCloseButton onClick={handleClose} />
      </ModalHeader>

      <div className={styles.modalContent}>
        {/* 파일 선택 영역 */}
        <div
          className={`${styles.dropZone} ${isDragOver ? styles.dragOver : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className={styles.dropZoneContent}>
            <div className={styles.icon}>📁</div>
            <p className={styles.mainText}>이미지를 여기에 드래그하거나 클릭하여 선택하세요</p>
            <p className={styles.subText}>JPG, PNG, GIF 파일 지원 (최대 5MB)</p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleInputChange}
              className={styles.fileInput}
            />
            <Button color="blue" className={styles.selectButton}>
              파일 선택
            </Button>
          </div>
        </div>

        {/* 선택된 파일 미리보기 */}
        {selectedFiles.length > 0 && (
          <div className={styles.previewSection}>
            <h4>선택된 이미지 ({selectedFiles.length}개)</h4>
            <div className={styles.previewGrid}>
              {previews.map((preview, index) => (
                <div key={index} className={styles.previewItem}>
                  <img
                    src={preview}
                    alt={`미리보기 ${index + 1}`}
                    className={styles.previewImage}
                  />
                  <div className={styles.fileInfo}>
                    <span className={styles.fileName}>{selectedFiles[index]?.name}</span>
                    <span className={styles.fileSize}>
                      {(selectedFiles[index]?.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className={styles.removeButton}
                    disabled={uploadImageMutation.isPending}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 푸터 */}
        <div className={styles.footer}>
          <Button onClick={handleClose} color="white" disabled={uploadImageMutation.isPending}>
            취소
          </Button>
          <Button
            onClick={handleUpload}
            color="blue"
            disabled={selectedFiles.length === 0 || uploadImageMutation.isPending}
          >
            {uploadImageMutation.isPending ? '업로드 중...' : `업로드 (${selectedFiles.length}개)`}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ImageUploadModal;
