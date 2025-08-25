import { Observable } from 'rxjs';
import { CreateClientRequest, CreateClientResponse, DeleteClientRequest, DeleteClientResponse,
    DetailClientResponse, ListClientResponse, UpdateClientRequest, UpdateClientResponse } from '../dto/client.dto';

export abstract class ClientRepository {
    abstract getAll(): Observable<ListClientResponse>;
    abstract getById(id: string): Observable<DetailClientResponse | null>;
    abstract create(client: CreateClientRequest): Observable<CreateClientResponse>;
    abstract update(client: UpdateClientRequest): Observable<UpdateClientResponse>;
    abstract delete(client: DeleteClientRequest): Observable<DeleteClientResponse>;
}
