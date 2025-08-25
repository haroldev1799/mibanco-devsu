import { HeroesRepository } from "../domain/repository/heroes.repository";
import { HeroesRepositoryService } from "./heroes.service";

export const HeroesProvider = [
	{
		provide: HeroesRepository,
		useClass: HeroesRepositoryService,
	},
];
