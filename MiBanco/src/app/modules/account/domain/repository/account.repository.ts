import { Observable } from 'rxjs';
import { ListAccountResponse, CreateAccountRequest, CreateAccountResponse, DeleteAccountResponse, DetailAccountResponse, UpdateAccountRequest, UpdateAccountResponse, DeleteAccountRequest } from '../dto/account.dto';

export abstract class AccountRepository {
	
    abstract getAll(): Observable<ListAccountResponse>;
    abstract getById(id: string): Observable<DetailAccountResponse | null>;
    abstract create(account: CreateAccountRequest): Observable<CreateAccountResponse>;
    abstract update(account: UpdateAccountRequest): Observable<UpdateAccountResponse>;
    abstract delete(client: DeleteAccountRequest): Observable<DeleteAccountResponse>;

}
