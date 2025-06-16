import styles from './UserEdit.module.scss';

const UserEditPage = () => {
  return (
    <>
      <div className={styles.container}>
        <h1>User edit Page</h1>
        <p>This is the user edit page content.</p>
        <div className={styles.first__section}>
          <div className={styles.first__section__left}>
            <h1>계정 정보 변경</h1>
          </div>
          <div className={styles.first__section__right}>
            <h1>입력 구간</h1>
          </div>
        </div>
        <div className={styles.second__section}>
          <div className={styles.second__section__left}>
            <h1>비밀번호 재설정</h1>
          </div>
          <div className={styles.second__section__right}>
            <h1>입력 구간</h1>
          </div>
        </div>
        <div className={styles.third__section}>
          <div className={styles.third__section__left}>
            <h1>계정 탈퇴</h1>
          </div>
          <div className={styles.third__section__right}>
            <h1>입력 구간</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserEditPage;
