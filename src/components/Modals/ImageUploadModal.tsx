import React, { useCallback, useRef, useState } from 'react';
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 이미지 업로드 API 훅
  const uploadImageMutation = usePostApi('/images', {
    onSuccess: (data: ImageUploadRes) => {
      toast.success('이미지가 성공적으로 업로드되었습니다.');

      // ImageUploadRes는 string[] 타입이므로 첫 번째 URL 사용
      if (Array.isArray(data) && data.length > 0) {
        onImageUploaded(data[0]);
      }

      handleClose();
    },
    onError: (error) => {
      console.error('이미지 업로드 에러:', error);
      toast.error('이미지 업로드 중 오류가 발생했습니다.');
    }
  });

  const handleClose = () => {
    setSelectedFile(null);
    setPreview('');
    setIsDragOver(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    onClose();
  };

  const handleFileSelect = useCallback((files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const imageFile = fileArray.find((file) => file.type.startsWith('image/'));

    if (!imageFile) {
      toast.error('이미지 파일만 업로드할 수 있습니다.');
      return;
    }

    // 파일 크기 검사 (5MB 제한)
    if (imageFile.size > 5 * 1024 * 1024) {
      toast.error('파일 크기는 5MB 이하로 제한됩니다.');
      return;
    }

    setSelectedFile(imageFile);

    // 미리보기 생성
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setPreview(e.target.result as string);
      }
    };
    reader.readAsDataURL(imageFile);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect([e.target.files[0]]); // 첫 번째 파일만 사용
    }
    e.target.value = '';
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

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect([e.dataTransfer.files[0]]); // 첫 번째 파일만 사용
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('업로드할 이미지를 선택해주세요.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('files', selectedFile);

      await uploadImageMutation.mutateAsync(formData as FormData);
    } catch (error) {
      console.error('업로드 실패:', error);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreview('');

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (!isOpen) return null;

  return (
    <Modal
      onClose={handleClose}
      boxStyle={{
        width: 500,
        maxWidth: '90vw'
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
              ref={fileInputRef}
              type="file"
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
        {selectedFile && preview && (
          <div className={styles.previewSection}>
            <h4>선택된 이미지</h4>
            <div className={styles.singlePreview}>
              <div className={styles.previewItem}>
                <img src={preview} alt="미리보기" className={styles.previewImage} />
                <div className={styles.fileInfo}>
                  <span className={styles.fileName}>{selectedFile.name}</span>
                  <span className={styles.fileSize}>
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>
                <button
                  type="button"
                  onClick={removeFile}
                  className={styles.removeButton}
                  disabled={uploadImageMutation.isPending}
                >
                  ✕
                </button>
              </div>
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
            disabled={!selectedFile || uploadImageMutation.isPending}
          >
            {uploadImageMutation.isPending ? '업로드 중...' : '업로드'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ImageUploadModal;
