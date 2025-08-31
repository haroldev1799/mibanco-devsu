import { AccountRepository } from "@app/modules/account/domain/repository/account.repository";
import { MovementsRepository } from "../domain/repository/movement.repository";
import { MovementRepositoryService } from "./movement.service";
import { AccountRepositoryService } from "@app/modules/account/infrastructure/account.service";

export const MovementProvider = [
	{
		provide: MovementsRepository,
		useClass: MovementRepositoryService,
	},
	{
		provide: AccountRepository,
		useClass: AccountRepositoryService,
	},
];
