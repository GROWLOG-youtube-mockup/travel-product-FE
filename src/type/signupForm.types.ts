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
    switch (name) {
      case 'password':
        setForm((prev) => ({ ...prev, password: value, passwordCheck: '' }));
        break;
      case 'email':
        setForm((prev) => ({ ...prev, email: value, emailCode: '' }));
        setEmailSent(false);
        setEmailVerified(false);
        setError((prev) => ({ ...prev, emailAuth: undefined }));
        break;
      default:
        setForm((prev) => ({ ...prev, [name]: value }));
    }
    clearFieldError(name);
  }

  async function handleSendEmailCode() {
    setError((prev) => ({ ...prev, emailAuth: undefined }));
    if (!form.email) {
      setError((prev) => ({ ...prev, emailAuth: SIGNUP_ERROR_MSG.email }));
      return;
    }
    if (!isValidEmail(form.email)) {
      setError((prev) => ({ ...prev, emailAuth: SIGNUP_ERROR_MSG.emailFormat }));
      return;
    }
    try {
      const res = await fetch('/auth/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email })
      });
      const data = await res.json();
      if (data.success) {
        setEmailSent(true);
      } else {
        setError((prev) => ({
          ...prev,
          emailAuth: data.error?.message || SIGNUP_ERROR_MSG.emailSend
        }));
      }
    } catch {
      setError((prev) => ({ ...prev, emailAuth: SIGNUP_ERROR_MSG.emailNetwork }));
    }
  }

  async function handleVerifyEmailCode() {
    setError((prev) => ({ ...prev, emailAuth: undefined }));
    try {
      const res = await fetch('/auth/email/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, code: form.emailCode })
      });
      const data = await res.json();
      if (data.success && data.data.verified) {
        setEmailVerified(true);
      } else {
        setError((prev) => ({
          ...prev,
          emailAuth: data.error?.message || SIGNUP_ERROR_MSG.emailCode
        }));
      }
    } catch {
      setError((prev) => ({ ...prev, emailAuth: SIGNUP_ERROR_MSG.emailNetwork }));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    let hasError = false;
    const newError: SignupFormError = {};
    if (!form.name) {
      newError.name = SIGNUP_ERROR_MSG.name;
      hasError = true;
    }
    if (!form.email) {
      newError.email = SIGNUP_ERROR_MSG.email;
      hasError = true;
    } else if (!isValidEmail(form.email)) {
      newError.email = SIGNUP_ERROR_MSG.emailFormat;
      hasError = true;
    }
    if (!isValidPhone(form.phone)) {
      newError.phone = SIGNUP_ERROR_MSG.phone;
      hasError = true;
    }
    if (!form.password) {
      newError.password = SIGNUP_ERROR_MSG.password;
      hasError = true;
    } else if (form.password !== form.passwordCheck) {
      newError.password = SIGNUP_ERROR_MSG.passwordCheck;
      hasError = true;
    }
    setError((prev) => ({ ...prev, ...newError }));
    if (hasError) return;
    onSubmit({ ...form });
  }

  return {
    form,
    error,
    emailSent,
    emailVerified,
    handleChange,
    handleSendEmailCode,
    handleVerifyEmailCode,
    handleSubmit
  };
}
