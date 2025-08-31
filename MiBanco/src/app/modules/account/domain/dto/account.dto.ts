import { HttpListResponse, HttpObjectResponse } from "@app/shared/types/responses-http.type";

export interface Account {
  id: number;
  account_number: string;
  type: string;
  initial_balance: number;
  daily_limit_amount: number;
  status: boolean;
  client_id: number;
}

export interface AccountForm {
  account_number: string;
  type: string;
  initial_balance: number;
  daily_limit_amount: number;
  status: boolean;
  client_id: number;
}

export type CreateAccountRequest = Omit<Account, 'id'>;
export type UpdateAccountRequest = Omit<Account, 'initial_balance'>;
export type DeleteAccountRequest = Pick<Account, 'id'>;

export type ListAccountResponse = HttpListResponse<Account>;
export type DetailAccountResponse = HttpObjectResponse<Account>;
export type CreateAccountResponse = HttpObjectResponse<Account>;
export type UpdateAccountResponse = HttpObjectResponse<Account>;
export type DeleteAccountResponse = HttpObjectResponse<string>;
