import React from 'react';

import Label from '../atoms/Label/Label';

import styles from './Modal.module.scss';

// 예시용 더미 컴포넌트들 추후에 연결필요
const LoginForm = () => <div>로그인 폼</div>;
const UserEditForm = () => <div>회원정보 수정 폼</div>;
const DeleteAccount = () => <div>계정 탈퇴 폼</div>;
const SignupForm = () => <div>회원가입 폼</div>;
const SignupAccountView = () => <div>계정 조회 결과</div>;

export type ModalType = 'login' | 'edit' | 'delete' | 'signup' | 'signupView' | null;

interface ModalProps {
  show: boolean;
  type: ModalType;
  onClose: () => void;
  footer?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ show, type, onClose }) => {
  if (!show || !type) return null;

  let title = '';
  let subtitle = '';
  let content = null;
  switch (type) {
    case 'login':
      title = '로그인';
      subtitle = '서비스 이용을 위해 로그인 해주세요.';
      content = <LoginForm />;
      break;
    case 'edit':
      title = '회원정보 수정';
      subtitle = '회원정보를 변경할 수 있습니다.';
      content = <UserEditForm />;
      break;
    case 'delete':
      title = '계정 탈퇴';
      subtitle = '계정 탈퇴 시 모든 정보가 삭제됩니다.';
      content = <DeleteAccount />;
      break;
    case 'signup':
      title = '회원가입';
      subtitle = '회원가입 후 다양한 서비스를 이용하세요.';
      content = <SignupForm />;
      break;
    case 'signupView':
      title = '조회결과';
      subtitle = '';
      content = <SignupAccountView />;
      break;
    default:
      title = '';
      subtitle = '';
      content = null;
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.container}>
          <button className={styles.close} onClick={onClose} aria-label="닫기">
            ×
          </button>
          <div className={styles.contentInner}>
            {title && (
              <div className={styles.title}>
                <Label variant="pageTitle">{title}</Label>
              </div>
            )}
            {subtitle && (
              <Label variant="subtitle" color="gray">
                {subtitle}
              </Label>
            )}
            <div className={styles.content}>
              <Label variant="bodyText">{content}</Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
