import { LockType } from './LockType'
import { RelayModel } from './RelayModel'

export interface LockModel {
  id: number;
  destination: string;
  type: LockType;
  timeout: number;
  is_enabled: boolean;
  relay_in: RelayModel;
  relay_out: RelayModel;
  created_at: string;
  updated_at: string;
}
