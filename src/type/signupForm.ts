import { useState } from 'react';

// 회원가입 폼 값 타입
export interface SignupValues {
  name: string;
  phone: string;
  email: string;
  emailCode: string;
  password: string;
  passwordCheck: string;
}

// 회원가입 폼 초기값
export const signupInitialForm: SignupValues = {
  name: '',
  phone: '',
  email: '',
  emailCode: '',
  password: '',
  passwordCheck: ''
};

// 에러 타입
export type SignupFormError = Partial<
  Record<'name' | 'phone' | 'email' | 'emailCode' | 'password' | 'passwordCheck', string>
> & {
  emailAuth?: string;
};

// 에러 메시지 상수
export const SIGNUP_ERROR_MSG = {
  name: '이름을 입력하세요.',
  email: '이메일을 입력하세요.',
  emailFormat: '올바른 이메일 형식을 입력하세요.',
  phone: '전화번호는 000-0000-0000 형식이어야 합니다.',
  password: '비밀번호를 입력하세요.',
  passwordCheck: '비밀번호가 일치하지 않습니다.',
  emailSend: '이메일 인증코드 전송 실패',
  emailNetwork: '네트워크 오류',
  emailCode: '인증코드가 올바르지 않습니다'
};

// 커스텀 훅
export function useSignupForm(initialForm: SignupValues, onSubmit: (values: SignupValues) => void) {
  const [form, setForm] = useState<SignupValues>(initialForm);
  const [error, setError] = useState<SignupFormError>({});
  const [info, setInfo] = useState<string>('');
  const [emailSent, setEmailSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  function isValidPhone(phone: string) {
    return /^\d{3}-\d{3,4}-\d{4}$/.test(phone);
  }
  function isValidEmail(email: string) {
    return /^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/.test(email);
  }
  function clearFieldError(name: string) {
    setError((prev) => ({ ...prev, [name]: undefined }));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    clearFieldError(name);
    if (name === 'email') {
      setEmailSent(false);
      setEmailVerified(false);
      setForm((prev) => ({ ...prev, emailCode: '' }));
      setError((prev) => ({ ...prev, emailAuth: undefined }));
    }
  }

  async function handleSendEmailCode() {
    if (!form.email) {
      setError((prev) => ({ ...prev, email: SIGNUP_ERROR_MSG.email }));
      setInfo('');
      return;
    }
    if (!isValidEmail(form.email)) {
      setError((prev) => ({ ...prev, email: SIGNUP_ERROR_MSG.emailFormat }));
      setInfo('');
      return;
    }
    setError((prev) => ({ ...prev, email: undefined }));
    setInfo('');
    setEmailSent(false);
    try {
      const res = await fetch('/auth/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email })
      });
      const data = await res.json();
      if (data.success) {
        setEmailSent(true);
        setInfo('인증번호가 전송되었습니다. 메일을 확인해주세요.');
      } else {
        throw new Error();
      }
    } catch {
      setError((prev) => ({ ...prev, email: '서버 문제입니다. 나중에 다시 시도해주세요.' }));
      setInfo('');
    }
  }

  function handleVerifyEmailCode() {
    if (!form.emailCode) {
      setError((prev) => ({ ...prev, emailAuth: SIGNUP_ERROR_MSG.emailCode }));
      return;
    }
    setEmailVerified(true);
    setError((prev) => ({ ...prev, emailAuth: undefined }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let valid = true;
    const newError: SignupFormError = {};
    if (!form.name) {
      newError.name = SIGNUP_ERROR_MSG.name;
      valid = false;
    }
    if (!form.phone || !isValidPhone(form.phone)) {
      newError.phone = SIGNUP_ERROR_MSG.phone;
      valid = false;
    }
    if (!form.email) {
      newError.email = SIGNUP_ERROR_MSG.email;
      valid = false;
    } else if (!isValidEmail(form.email)) {
      newError.email = SIGNUP_ERROR_MSG.emailFormat;
      valid = false;
    }
    if (!emailVerified) {
      newError.emailAuth = '이메일 인증을 완료해주세요.';
      valid = false;
    }
    if (!form.password) {
      newError.password = SIGNUP_ERROR_MSG.password;
      valid = false;
    }
    if (!form.passwordCheck || form.password !== form.passwordCheck) {
      newError.password = SIGNUP_ERROR_MSG.passwordCheck;
      valid = false;
    }
    setError(newError);
    if (!valid) return;
    onSubmit(form);
  }

  return {
    form,
    error,
    info,
    emailSent,
    emailVerified,
    handleChange,
    handleSendEmailCode,
    handleVerifyEmailCode,
    handleSubmit
  };
}
