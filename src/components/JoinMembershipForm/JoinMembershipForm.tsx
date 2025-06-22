import { useState } from 'react';

import type { JoinMembershipFormValues } from '../../type/joinMembership';
import Button from '../atoms/Button/Button';
import Input from '../atoms/Input/Input';
import PasswordInputField from '../atoms/Input/PasswordInputField';
import Label from '../atoms/Label/Label';

import styles from './JoinMembershipForm.module.scss';

interface JoinMembershipFormProps {
  onSubmit: (values: JoinMembershipFormValues) => void;
}

const initialForm: JoinMembershipFormValues = {
  name: '',
  phone: '',
  phoneCode: '',
  phoneCodeCheck: '',
  email: '',
  emailCode: '',
  emailCodeCheck: '',
  password: '',
  passwordCheck: ''
};

const JoinMembershipForm = ({ onSubmit }: JoinMembershipFormProps) => {
  const [form, setForm] = useState<JoinMembershipFormValues>(initialForm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Label htmlFor="name">이름</Label>
      <Input
        id="name"
        name="name"
        placeholder="본 서비스에 사용하실 이름을 입력해주세요 (건별 찾기시 사용됩니다)"
        variant="long"
        value={form.name}
        onChange={handleChange}
      />
      <Label htmlFor="phone">전화번호</Label>
      <div className={styles.flexRow}>
        <Input
          id="phone"
          name="phone"
          placeholder="본 서비스에 사용하실 전화번호를 입력해주세요"
          variant="long"
          value={form.phone}
          onChange={handleChange}
        />
      </div>
      <Label htmlFor="email">이메일</Label>
      <div className={styles.flexRow}>
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
      <div className={styles.flexRow}>
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
      <Label htmlFor="password">비밀번호</Label>
      <PasswordInputField
        value={form.password}
        onChange={handleChange}
        id="password"
        name="password"
        placeholder="본 서비스에 사용하실 비밀번호를 입력해주세요"
      />
      <div className={styles.spacer} />
      <Input
        name="passwordCheck"
        type="password"
        placeholder="비밀번호를 다시 입력해주세요"
        variant="short"
        value={form.passwordCheck}
        onChange={handleChange}
      />
      <Button type="submit" className={styles.submitBtn}>
        계정 생성하기
      </Button>
    </form>
  );
};

export default JoinMembershipForm;
