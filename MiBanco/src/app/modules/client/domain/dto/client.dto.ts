import { HttpListResponse, HttpObjectResponse } from "@app/shared/types/responses-http.type";

export interface Client {
  id: string;
  name: string;
  gender: string;
  age: string;
  identification: string;
  address: string;
  phone: string;
  password: string;
  status: boolean;
}

export interface ClientForm {
  id: string;
  name: string;
  gender: string;
  age: string;
  identification: number;
  address: string;
  phone: string;
  password: number;
  status: string;
}

export type CreateClientRequest = Omit<Client, 'id'>;
export type UpdateClientRequest = Omit<Client, ''>;
export type DeleteClientRequest = Pick<Client, 'id'>;

export type ListClientResponse = HttpListResponse<Client>;
export type DetailClientResponse = HttpObjectResponse<Client>;
export type CreateClientResponse = HttpObjectResponse<Client>;
export type UpdateClientResponse = HttpObjectResponse<Client>;
export type DeleteClientResponse = HttpObjectResponse<string>;
