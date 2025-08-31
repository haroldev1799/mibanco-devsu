import { inject } from '@angular/core';

import { Observable, of } from 'rxjs';
import { ClientRepository } from '../domain/repository/client.repository';
import { HttpClient } from '@angular/common/http';
import { URL_BACKEND } from '@app/core/config/url';
import { CreateClientRequest, CreateClientResponse, DeleteClientRequest, DeleteClientResponse, DetailClientResponse, ListClientResponse, UpdateClientRequest, UpdateClientResponse } from '../domain/dto/client.dto';

export class ClientRepositoryService extends ClientRepository  {
	
  private readonly http = inject(HttpClient);
  protected url = `${URL_BACKEND}Client/`;

  getAll(): Observable<ListClientResponse> {
	  return this.http.get<ListClientResponse>(`${this.url}GetAll`);
  }

  getById(id: string): Observable<DetailClientResponse | null> {
	  return this.http.get<DetailClientResponse>(`${this.url}GetById?id=${id}`);
  }

  create(client: CreateClientRequest): Observable<CreateClientResponse> {
	  return this.http.post<CreateClientResponse>(`${this.url}Create`, client);
  }

  update(client: UpdateClientRequest): Observable<UpdateClientResponse> {
	  return this.http.put<UpdateClientResponse>(`${this.url}Update`, client);
  }

  delete(client: DeleteClientRequest): Observable<DeleteClientResponse> {
	  return this.http.delete<DeleteClientResponse>(`${this.url}Delete`, { body: client});
  }
}
