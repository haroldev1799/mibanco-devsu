
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { URL_BACKEND } from '@app/core/config/url';
import { Observable } from 'rxjs';
import { DetailAccountResponse, CreateAccountRequest, CreateAccountResponse, UpdateAccountRequest, UpdateAccountResponse, DeleteAccountResponse, ListAccountResponse, DeleteAccountRequest } from '../domain/dto/account.dto';
import { AccountRepository } from '../domain/repository/account.repository';

export class AccountRepositoryService extends AccountRepository  {
	
  private readonly http = inject(HttpClient);
  protected url = `${URL_BACKEND}Account/`;

  getAll(): Observable<ListAccountResponse> {
	  return this.http.get<ListAccountResponse>(`${this.url}GetAll`);
  }

  getById(id: string): Observable<DetailAccountResponse | null> {
	  return this.http.get<DetailAccountResponse>(`${this.url}GetById?id=${id}`);
  }

  create(client: CreateAccountRequest): Observable<CreateAccountResponse> {
	  return this.http.post<CreateAccountResponse>(`${this.url}Create`, client);
  }

  update(client: UpdateAccountRequest): Observable<UpdateAccountResponse> {
	  return this.http.put<UpdateAccountResponse>(`${this.url}Update`, client);
  }

  delete(client: DeleteAccountRequest): Observable<DeleteAccountResponse> {
	  return this.http.delete<DeleteAccountResponse>(`${this.url}Delete`, { body: client});
  }
}
