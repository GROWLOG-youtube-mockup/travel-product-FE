export interface AdminLog extends Record<string, unknown> {
  logId: number;
  userId: number;
  actionType: number;
  targetId: number;
  timestamp: string;
}
