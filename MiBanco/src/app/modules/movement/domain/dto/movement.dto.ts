import { HttpListResponse, HttpObjectResponse } from "@app/shared/types/responses-http.type";

export interface Movement {
  id: string;
  date: string;
  transaction_type: string;
  amount: number;
  balance: number;
  account_id: number;
  account?: string;
  client?: string;
}

export interface MovementForm {
  date: string;
  transaction_type: string;
  amount: number;
  account_id: number;
}
export type CreateMovementRequest = Omit<Movement, 'id' | 'date' | 'balance' | 'account' | 'client'>;
export type UpdateMovementRequest = Pick<Movement, 'date'>;
export type DeleteMovementRequest = Pick<Movement, 'id'>;

export type ListMovementResponse = HttpListResponse<Movement>;
export type DetailMovementResponse = HttpObjectResponse<Movement>;
export type CreateMovementResponse = HttpObjectResponse<Movement>;
export type UpdateMovementResponse = HttpObjectResponse<Movement>;
export type DeleteMovementResponse = HttpObjectResponse<string>;
