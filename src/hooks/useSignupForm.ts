import { useState } from 'react';

import { usePostApi } from '@/hooks/usePostAPI';
import type { SignupFormError, SignupValues } from '@/types/signupForm.types';

import { SIGNUP_ERROR_MSG } from '../constants/signupForm.constants';
import { normalizePhoneNumber } from '../utils/phone';

function isValidPhone(phone: string) {
  try {
    normalizePhoneNumber(phone.replace(/-/g, ''));
    return true;
  } catch {
    return false;
  }
}
function isValidEmail(email: string) {
  return /^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/.test(email);
}

export function useSignupForm(initialForm: SignupValues, onSubmit: (values: SignupValues) => void) {
  const [form, setForm] = useState<SignupValues>(initialForm);
  const [error, setError] = useState<SignupFormError>({});
  const [info, setInfo] = useState<string>('');
  const [emailSent, setEmailSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const { mutateAsync: sendEmailCode } = usePostApi('/auth/email/send');
  const { mutateAsync: verifyEmailCode } = usePostApi('/auth/email/verify');

  function clearFieldError(name: string) {
    setError((prev) => ({ ...prev, [name]: undefined }));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => {
      // 비밀번호가 지워질 때 passwordCheck도 함께 초기화
      if (name === 'password' && value === '') {
        return { ...prev, password: '', passwordCheck: '' };
      }
      return { ...prev, [name]: value };
    });
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
      await sendEmailCode({ email: form.email });
      setEmailSent(true);
      setInfo('인증번호가 전송되었습니다. 메일을 확인해주세요.');
    } catch {
      setError((prev) => ({ ...prev, email: '서버 문제입니다. 나중에 다시 시도해주세요.' }));
      setInfo('');
    }
  }

  async function handleVerifyEmailCode() {
    if (!form.emailCode) {
      setError((prev) => ({ ...prev, emailAuth: SIGNUP_ERROR_MSG.emailCode }));
      return;
    }
    try {
      const res = await verifyEmailCode({ email: form.email, code: form.emailCode });
      if (res.success && res.data?.verified) {
        setEmailVerified(true);
        setError((prev) => ({ ...prev, emailAuth: undefined }));
      } else {
        setError((prev) => ({
          ...prev,
          emailAuth: res.error?.message || '인증번호가 올바르지 않습니다.'
        }));
      }
    } catch (e: any) {
      setError((prev) => ({
        ...prev,
        emailAuth: e?.response?.data?.error?.message || '인증에 실패했습니다.'
      }));
    }
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
