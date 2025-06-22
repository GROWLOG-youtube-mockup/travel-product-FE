import React, { useState } from 'react';

import Button from '../../components/atoms/Button/Button';
import Input from '../../components/atoms/Input/Input';
import PasswordInputField from '../../components/atoms/Input/PasswordInputField';
import Label from '../../components/atoms/Label/Label';

import styles from './JoinMembership.module.scss';

const JoinMembershipPage = () => {
  // form state
  const [form, setForm] = useState({
    name: '',
    phone: '',
    phoneCode: '',
    phoneCodeCheck: '',
    email: '',
    emailCode: '',
    emailCodeCheck: '',
    password: '',
    passwordCheck: ''
  });

  // input change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 회원가입 API 연동
    console.log('회원가입 시도:', form);
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentInner}>
        <div className={styles.title}>
          <h1>회원가입</h1>
        </div>
        <div className={styles.subtitle}>
          <span>새로운 계정을 생성합니다</span>
        </div>
        <form onSubmit={handleSubmit}>
          {/* 이름 */}
          <Label htmlFor="name">이름</Label>
          <Input
            id="name"
            name="name"
            placeholder="본 서비스에 사용하실 이름을 입력해주세요 (건별 찾기시 사용됩니다)"
            variant="short"
            value={form.name}
            onChange={handleChange}
          />
          {/* 전화번호 */}
          <Label htmlFor="phone">전화번호</Label>
          <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            <Input
              id="phone"
              name="phone"
              placeholder="본 서비스에 사용하실 전화번호를 입력해주세요"
              variant="short"
              value={form.phone}
              onChange={handleChange}
            />
            <Button type="button" variant="account">
              인증번호 받기
            </Button>
          </div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            <Input
              name="phoneCode"
              placeholder="인증번호를 입력하세요"
              variant="short"
              value={form.phoneCode}
              onChange={handleChange}
            />
            <Button type="button" variant="account">
              인증번호 확인
            </Button>
          </div>
          {/* 이메일 */}
          <Label htmlFor="email">이메일</Label>
          <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            <Input
              id="email"
              name="email"
              placeholder="본 서비스에 사용하실 이메일을 입력해주세요"
              variant="short"
              value={form.email}
              onChange={handleChange}
            />
            <Button type="button" variant="account">
              인증번호 받기
            </Button>
          </div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            <Input
              name="emailCode"
              placeholder="인증번호를 입력하세요"
              variant="short"
              value={form.emailCode}
              onChange={handleChange}
            />
            <Button type="button" variant="account">
              인증번호 확인
            </Button>
          </div>
          {/* 비밀번호 */}
          <Label htmlFor="password">비밀번호</Label>
          <PasswordInputField
            value={form.password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setForm((prev) => ({ ...prev, password: e.target.value }))
            }
            id="password"
            name="password"
            placeholder="본 서비스에 사용하실 비밀번호를 입력해주세요"
          />
          <div style={{ height: 8 }} />
          <Input
            name="passwordCheck"
            type="password"
            placeholder="비밀번호를 다시 입력해주세요"
            variant="short"
            value={form.passwordCheck}
            onChange={handleChange}
          />
          <div
            style={{ color: '#4f4fff', fontSize: 14, margin: '8px 0 16px 0', cursor: 'pointer' }}
          >
            비밀번호를 잊으셨나요?
          </div>
          <Button type="submit" variant="default" style={{ width: 400, margin: '24px 0 16px 0' }}>
            계정 생성하기
          </Button>
        </form>
        <div className={styles.footer}>
          <span>로그인 | 아이디/비밀번호 찾기</span>
        </div>
      </div>
    </div>
  );
};

export default JoinMembershipPage;
