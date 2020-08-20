import { LockType } from '@/models/LockType'

export interface LockRequest {
  site: string;
  door: string;
  type: LockType;
  is_enabled: boolean;
  timeout: number;
  relay_in?: number;
  relay_out?: number;
}
