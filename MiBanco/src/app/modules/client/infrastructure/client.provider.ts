import { ClientRepository } from "../domain/repository/client.repository";
import { ClientRepositoryService } from "./client.service";

export const ClientProvider = [
	{
		provide: ClientRepository,
		useClass: ClientRepositoryService,
	},
];
