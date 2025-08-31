import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MovementsRepository } from '../domain/repository/movement.repository';
import { HttpClient } from '@angular/common/http';
import { URL_BACKEND } from '@app/core/config/url';
import { DetailMovementResponse, CreateMovementRequest, CreateMovementResponse, UpdateMovementRequest, UpdateMovementResponse, DeleteMovementResponse, DeleteMovementRequest, ListMovementResponse } from '../domain/dto/movement.dto';

export class MovementRepositoryService extends MovementsRepository  {
	
  private readonly http = inject(HttpClient);
  protected url = `${URL_BACKEND}Movement/`;

  getAll(): Observable<ListMovementResponse> {
	  return this.http.get<ListMovementResponse>(`${this.url}GetAll`);
  }

  getById(id: string): Observable<DetailMovementResponse | null> {
	  return this.http.get<DetailMovementResponse>(`${this.url}GetById?id=${id}`);
  }

  create(movement: CreateMovementRequest): Observable<CreateMovementResponse> {
	  return this.http.post<CreateMovementResponse>(`${this.url}Create`, movement);
  }

  update(movement: UpdateMovementRequest): Observable<UpdateMovementResponse> {
	  return this.http.put<UpdateMovementResponse>(`${this.url}Update`, movement);
  }

  delete(movement: DeleteMovementRequest): Observable<DeleteMovementResponse> {
	  return this.http.delete<DeleteMovementResponse>(`${this.url}Delete`, { body: movement});
  }
}
