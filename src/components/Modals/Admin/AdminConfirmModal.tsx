import Button from '@/components/atoms/Button/Button';
import AdminModalHeader from '@/components/Modal/AdminModalHeader';
import Modal from '@/components/Modal/Modal';
import modalStyles from '@/components/Modal/Modal.module.scss';
import ModalCloseButton from '@/components/Modal/ModalCloseButton';

import styles from './AdminConfirmModal.module.scss';

interface AdminConfirmModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  contents?: string;
  boxWidth?: number;
  handleConfirm: (isConfirm: boolean) => Promise<void> | void;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  variant?: 'danger' | 'warning' | 'info';
}

const AdminConfirmModal = ({
  open,
  onClose,
  title,
  subtitle,
  contents,
  boxWidth,
  handleConfirm,
  confirmText = '예',
  cancelText = '아니오',
  loading = false,
  variant = 'danger'
}: AdminConfirmModalProps) => {
  if (!open) return null;

  const handleCancel = () => {
    if (!loading) {
      handleConfirm(false);
    }
  };

  const handleConfirmClick = () => {
    if (!loading) {
      handleConfirm(true);
    }
  };

  return (
    <Modal
      onClose={loading ? () => {} : onClose}
      boxStyle={boxWidth ? { width: boxWidth, maxWidth: boxWidth } : undefined}
    >
      <div className={modalStyles.headerWrapper}>
        <AdminModalHeader title={title} subtitle={subtitle}>
          <span className={modalStyles.contents}>{contents}</span>
        </AdminModalHeader>

        <div className={modalStyles.buttonLayout}>
          <Button
            className={modalStyles.confirmButton}
            color="white"
            onClick={handleCancel}
            disabled={loading}
          >
            {cancelText}
          </Button>
          <Button
            className={`${modalStyles.confirmButton} ${styles[`confirm-${variant}`]}`}
            color="blue"
            onClick={handleConfirmClick}
            disabled={loading}
          >
            {loading ? '처리 중...' : confirmText}
          </Button>
        </div>
      </div>
      {!loading && <ModalCloseButton onClick={onClose} />}
    </Modal>
  );
};

export default AdminConfirmModal;
