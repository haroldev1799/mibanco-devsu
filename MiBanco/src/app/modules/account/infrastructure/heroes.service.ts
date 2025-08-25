import { inject, signal } from '@angular/core';
import { CreateHeroRequest, CreateHeroResponse, DeleteHeroResponse, DetailHeroResponse,
	Hero, HeroResponse, UpdateHeroRequest, UpdateHeroResponse } from '../domain/dto/heroes.dto';
import { HeroesRepository } from '../domain/repository/heroes.repository';
import { Observable, of } from 'rxjs';
import { StorageService } from '@app/shared/services/localstorage.service';

export class HeroesRepositoryService extends HeroesRepository  {
	
  private readonly _heroes = signal<Hero[]>([]);
  private storage = inject(StorageService);
  private STORAGE_KEY = 'heroes';
  readonly heroes = this._heroes;

  constructor() {
    super();
    const saved = this.storage.get<Hero[]>(this.STORAGE_KEY);
    if (saved) this._heroes.set(saved);
  }

  getAll(): Observable<HeroResponse> {
    const heroes = this._heroes();
    return of({
		data: heroes,
		message: 'Ok',
		success: true,
		status: 200
	});
  }

  getById(id: string): Observable<DetailHeroResponse | null> {
    const hero = this._heroes().find(h => h.id === id);
	if(hero){
		return of({
			data: hero,
			message: 'Ok',
			success: true,
			status: 200
		});
	}
	return of(null);
  }

  create(hero: CreateHeroRequest): Observable<CreateHeroResponse> {
    const now = Date.now();
    const heroDB: Hero = { ...hero, id: crypto.randomUUID(), createdAt: now, updatedAt: now };
    this._heroes.set([heroDB, ...this._heroes()]);
	this.persist();
    return of({
		data: heroDB,
		message: 'Ok',
		success: true,
		status: 200
	});
  }

  update(hero: UpdateHeroRequest): Observable<UpdateHeroResponse> {
    this._heroes.update(list => list.map(h => h.id === hero.id ? { ...h, ...hero, updatedAt: Date.now() } : h));
	this.persist();
    return of({
		data: hero,
		message: 'Ok',
		success: true,
		status: 200
	});
  }

  delete(id: string): Observable<DeleteHeroResponse> {
	this._heroes.update(list => list.filter(h => h.id !== id));
	this.persist();
    return of({
		data: id,
		message: 'Ok',
		success: true,
		status: 200
	});
  }

  private persist(): void {
	this.storage.set(this.STORAGE_KEY, this._heroes());
 }
}
