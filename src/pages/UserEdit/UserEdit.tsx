import Button from '../../components/atoms/Button/Button';
import Input from '../../components/atoms/Input/Input';

import styles from './UserEdit.module.scss';

const UserEditPage = () => {
  return (
    <div className={styles.container}>
      {/* 계정 정보 변경 */}
      <section className={styles.section}>
        <div className={styles.sectionLeft}>
          <h2>계정 정보 변경</h2>
          <p>계정 정보를 변경합니다.</p>
        </div>
        <form className={styles.sectionRight}>
          <div>
            <label>이메일</label>
            <Input type="email" value="qwer@gmail.com" variant="long" disabled />
          </div>
          <div>
            <div>
              <label>이름</label>
              <Input type="text" value="홍길동" variant="short" />
            </div>
            <Button>이름 변경하기</Button>
          </div>
          <div>
            <div>
              <label>전화번호</label>
              <Input type="text" value="010-1234-5678" variant="short" />
            </div>
            <Button>전화번호 변경하기</Button>
          </div>
          <div>
            <div>
              <label>비밀번호</label>
              <Input type="password" value="asd****45" variant="short" disabled />
            </div>
            <Button>비밀번호 변경하기</Button>
          </div>
        </form>
      </section>

      {/* 계정 탈퇴 */}
      <section className={styles.section}>
        <div className={styles.sectionLeft}>
          <h2>계정 탈퇴</h2>
          <p>계정 및 개인정보를 삭제합니다.</p>
        </div>
        <div className={styles.sectionRight}>
          <Button className={styles.danger}>계정 탈퇴하기</Button>
        </div>
      </section>
    </div>
  );
};

export default UserEditPage;
