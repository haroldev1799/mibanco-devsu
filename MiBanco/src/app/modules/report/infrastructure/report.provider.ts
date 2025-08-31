import { ClientRepository } from "@app/modules/client/domain/repository/client.repository";
import { ReportRepository } from "../domain/repository/report.repository";
import { ReportRepositoryService } from "./report.service";
import { ClientRepositoryService } from "@app/modules/client/infrastructure/client.service";
import { AccountRepository } from "@app/modules/account/domain/repository/account.repository";
import { AccountRepositoryService } from "@app/modules/account/infrastructure/account.service";

export const ReportProvider = [
	{
		provide: ReportRepository,
		useClass: ReportRepositoryService,
	},
	{
		provide: ClientRepository,
		useClass: ClientRepositoryService,
	},
	{
		provide: AccountRepository,
		useClass: AccountRepositoryService,
	},
];
