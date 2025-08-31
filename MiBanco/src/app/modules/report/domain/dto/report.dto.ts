import { HttpListResponse, HttpObjectResponse } from "@app/shared/types/responses-http.type";

export interface Reports {
  client_id: number;
  client: string;
  account: string;
  account_id: number;
  current_balance: number;
  daily_limit_amount: number;
  initial_balance: number;
  amount: number;
  date: Date;
  transaction_type: string;
  balance: number;
}

export interface FilterForm {
  client_id: number;
  account_id: number;
  date: Date;
}

export type ReportResponse = HttpListResponse<Reports>;