import { useState } from 'react';

import Button from '../../components/atoms/Button/Button';
import Input from '../../components/atoms/Input/Input';

import styles from './FindAccount.module.scss';

const FindAccountPage = () => {
  // 가입 계정 찾기 폼 상태
  const [findName, setFindName] = useState('');
  const [findPhone, setFindPhone] = useState('');
  // 임시 비밀번호 발급 폼 상태
  const [resetName, setResetName] = useState('');
  const [resetPhone, setResetPhone] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  // 에러 메시지 등 상태는 필요에 따라 추가

  return (
    <div className={styles.container}>
      {/* 가입 계정 찾기 */}
      <section className={styles.section}>
        <div className={styles.sectionLeft}>
          <h2 className={styles.sectionLeftH2}>가입 계정 찾기</h2>
          <p>가입한 계정의 이메일을 찾습니다.</p>
        </div>
        <form className={styles.sectionRight}>
          <div className={styles.inputGroup}>
            <label htmlFor="find-name">이름</label>
            <Input
              id="find-name"
              type="text"
              value={findName}
              onChange={(e) => setFindName(e.target.value)}
              placeholder="이름을 입력하세요"
              variant="long"
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="find-phone">연락처</label>
            <Input
              id="find-phone"
              type="text"
              value={findPhone}
              onChange={(e) => setFindPhone(e.target.value)}
              placeholder="휴대폰 번호를 입력하세요"
              variant="long"
            />
          </div>
          <Button type="submit" variant="account" style={{ marginTop: 8 }}>
            계정 이메일 찾기
          </Button>
        </form>
      </section>

      {/* 임시 비밀번호 발급받기 */}
      <section className={styles.section}>
        <div className={styles.sectionLeft}>
          <h2 className={styles.sectionLeftH2}>임시 비밀번호 발급받기</h2>
          <p>가입하신 이메일로 임시 비밀번호를 보내드립니다.</p>
        </div>
        <form className={styles.sectionRight}>
          <div className={styles.inputGroup}>
            <label htmlFor="reset-name">이름</label>
            <Input
              id="reset-name"
              type="text"
              value={resetName}
              onChange={(e) => setResetName(e.target.value)}
              placeholder="이름을 입력하세요"
              variant="long"
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="reset-phone">연락처</label>
            <Input
              id="reset-phone"
              type="text"
              value={resetPhone}
              onChange={(e) => setResetPhone(e.target.value)}
              placeholder="휴대폰 번호를 입력하세요"
              variant="long"
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="reset-email">이메일</label>
            <Input
              id="reset-email"
              type="email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              placeholder="이메일을 입력하세요"
              variant="long"
            />
          </div>
          {/* 에러 메시지 등은 필요시 아래에 추가 */}
          <Button type="submit" variant="account" style={{ marginTop: 8 }}>
            임시 비밀번호 발급받기
          </Button>
        </form>
      </section>
    </div>
  );
};

export default FindAccountPage;
