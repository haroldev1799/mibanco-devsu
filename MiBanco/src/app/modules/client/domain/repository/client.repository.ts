import { CreateHeroRequest, CreateHeroResponse, DeleteHeroResponse, DetailHeroResponse, HeroResponse, UpdateHeroRequest, UpdateHeroResponse } from "../dto/client.dto";
import { Observable } from 'rxjs';

export abstract class ClientRepository {
	
    abstract getAll(): Observable<HeroResponse>;
    abstract getById(id: string): Observable<DetailHeroResponse | null>;
    abstract create(hero: CreateHeroRequest): Observable<CreateHeroResponse>;
    abstract update(hero: UpdateHeroRequest): Observable<UpdateHeroResponse>;
    abstract delete(id: string): Observable<DeleteHeroResponse>;

}
