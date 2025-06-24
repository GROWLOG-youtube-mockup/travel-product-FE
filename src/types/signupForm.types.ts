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
