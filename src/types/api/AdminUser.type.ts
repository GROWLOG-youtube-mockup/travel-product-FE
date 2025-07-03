export interface AdminUser extends Record<string, unknown> {
  userId: number;
  name: string;
  email: string;
  phoneNumber: string;
  roleCode: number;
  createAt: string;
  deleteAt: string | null;
}
