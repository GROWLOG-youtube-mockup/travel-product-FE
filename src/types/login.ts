export interface UserInformation {
  email: string;
  password: string;
}

export interface LoginFormProps {
  onSubmit: (credentials: UserInformation) => void;
  authError?: string;
}
