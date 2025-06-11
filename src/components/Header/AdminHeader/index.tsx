import styles from './AdminHeader.module.scss';

const AdminHeader = () => {
  // TODO: 로그인 상태 및 정보에 따라 보여지는 요소가 변경될 수 있도록 수정 필요(store 연동 필요)
  const userName = '테스트';
  // const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
  const isLoggedIn = true;

  return (
    <header className={styles['admin-header']}>
      <h1 className={styles['admin-header__title']}>관리자 대시보드</h1>
      {isLoggedIn && (
        <div className={styles['admin-header__user-info']}>
          <div>
            <span>안녕하세요 관리자 {userName}님!</span>
          </div>
          <button className={styles['admin-header__logout-button']}>
            <span>로그아웃</span>
          </button>
        </div>
      )}
    </header>
  );
};

export default AdminHeader;
