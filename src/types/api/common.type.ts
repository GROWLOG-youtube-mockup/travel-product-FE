export interface ApiMeta {
  success: boolean;
  error: {
    code: string;
    message: string;
  } | null;
}
