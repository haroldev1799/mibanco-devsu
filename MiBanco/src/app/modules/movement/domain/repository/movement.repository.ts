import { Observable } from 'rxjs';
import { ListMovementResponse, DetailMovementResponse, CreateMovementRequest, CreateMovementResponse, UpdateMovementRequest, UpdateMovementResponse, DeleteMovementResponse, DeleteMovementRequest } from '../dto/movement.dto';

export abstract class MovementsRepository {
	
    abstract getAll(): Observable<ListMovementResponse>;
    abstract getById(id: string): Observable<DetailMovementResponse | null>;
    abstract create(Movement: CreateMovementRequest): Observable<CreateMovementResponse>;
    abstract update(Movement: UpdateMovementRequest): Observable<UpdateMovementResponse>;
    abstract delete(data: DeleteMovementRequest): Observable<DeleteMovementResponse>;

}
