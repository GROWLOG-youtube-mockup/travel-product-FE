import LoginForm from '../../components/LoginForm/LoginForm';

import styles from './AdminLogin.module.scss';

interface UserInformation {
  username: string;
  password: string;
}

const AdminLoginPage = () => {
  const onSubmit = ({ username, password }: UserInformation) => {
    console.log('관리자 로그인 시도:', { username, password });
  };

  return (
    <div className={styles['admin-login']}>
      <div className={styles['admin-login__title']}>
        <h1>관리자 로그인</h1>
      </div>
      <div className={styles['admin-login__subtitle']}>
        <span>정보를 입력해주세요</span>
      </div>
      <LoginForm onSubmit={onSubmit} />
    </div>
  );
};

export default AdminLoginPage;
