import { HttpListResponse, HttpObjectResponse } from "@app/shared/types/responses-http.type";

export interface Client {
  id: string;
  password: string;
  status: string;
  person_id: number;
  name: string;
  gender: string;
  age: number;
  identification: string;
  address: string;
  phone: string;
}

export interface ClientForm {
  name: string;
  power?: string;
  universe?: 'Marvel' | 'DC' | 'Other';
  age: number;
}

export type CreateClientRequest = Omit<Client, 'id'>;
export type UpdateClientRequest = Omit<Client, 'createdAt'>;
export type DeleteClientRequest = Pick<Client, 'id'>;

export type ListClientResponse = HttpListResponse<Client>;
export type DetailClientResponse = HttpObjectResponse<Client>;
export type CreateClientResponse = HttpObjectResponse<Client>;
export type UpdateClientResponse = HttpObjectResponse<Client>;
export type DeleteClientResponse = HttpObjectResponse<string>;
