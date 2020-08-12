import { ErrorResponse } from './ErrorResponse'

export interface CommonResponse<T> {
  data: T;
  error?: ErrorResponse;
}
