import { ClientRepository } from "@app/modules/client/domain/repository/client.repository";
import { ClientRepositoryService } from "@app/modules/client/infrastructure/client.service";
import { AccountRepository } from "../domain/repository/account.repository";
import { AccountRepositoryService } from "./account.service";

export const AccountProvider = [
	{
		provide: AccountRepository,
		useClass: AccountRepositoryService,
	},
	{
		provide: ClientRepository,
		useClass: ClientRepositoryService,
	},
];
