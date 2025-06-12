export interface UserInformation {
  username: string;
  password: string;
}

export interface LoginFormProps {
  onSubmit: (credentials: UserInformation) => void;
  authError?: string;
}
