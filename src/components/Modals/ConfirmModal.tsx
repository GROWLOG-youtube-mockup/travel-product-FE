import Button from '../../components/atoms/Button/Button';
import Modal from '../Modal/Modal';
import ModalCloseButton from '../Modal/ModalCloseButton';
import ModalHeader from '../Modal/ModalHeader';

import styles from '../Modal/Modal.module.scss';

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  contents?: string;
  boxWidth?: number;
  handleConfirm?: () => void;
}

const ConfirmModal = ({
  open,
  onClose,
  title,
  subtitle,
  contents,
  boxWidth,
  handleConfirm
}: ConfirmModalProps) => {
  if (!open) return null;

  return (
    <Modal
      onClose={onClose}
      boxStyle={boxWidth ? { width: boxWidth, maxWidth: boxWidth } : undefined}
    >
      <div className={styles.headerWrapper}>
        <ModalHeader title={title} subtitle={subtitle}>
          <span className={styles.contents}>{contents}</span>
        </ModalHeader>

        <div className={styles.buttonLayout}>
          <Button color="white" onClick={onClose}>
            아니오
          </Button>
          <Button color="white" onClick={handleConfirm}>
            예
          </Button>
        </div>
      </div>
      <ModalCloseButton onClick={onClose} />
    </Modal>
  );
};

export default ConfirmModal;
