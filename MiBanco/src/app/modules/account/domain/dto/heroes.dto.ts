import { HttpListResponse, HttpObjectResponse } from "@app/shared/types/responses-http.type";

export interface Hero {
  id: string;
  name: string;
  power?: string;
  universe?: 'Marvel' | 'DC' | 'Other';
  age: number;
  createdAt?: number;
  updatedAt: number;
}

export interface HeroForm {
  name: string;
  power?: string;
  universe?: 'Marvel' | 'DC' | 'Other';
  age: number;
}

export type CreateHeroRequest = Omit<Hero, 'id'>;
export type UpdateHeroRequest = Omit<Hero, 'createdAt'>;

export type HeroResponse = HttpListResponse<Hero>;
export type DetailHeroResponse = HttpObjectResponse<Hero>;
export type CreateHeroResponse = HttpObjectResponse<Hero>;
export type UpdateHeroResponse = HttpObjectResponse<Hero>;
export type DeleteHeroResponse = HttpObjectResponse<string>;
