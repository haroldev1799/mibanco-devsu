import { Account } from "@app/modules/account/domain/dto/account.dto";
import { Column } from "@app/shared/components/organisms/table/table.interface";
import { ButtonComponent } from "@app/shared/components/atoms/button/button.component";
import { TableComponent } from "@app/shared/components/organisms/table/table.component";
import { MenuComponent } from "@app/shared/components/atoms/menu/menu.component";

export const COLUMNS_ACCOUNT_LIST: Column<keyof Account | ''>[] = [
	{ field: '', header: 'actions', type: 'actions' },
	{ field: 'id', header: 'ID', align: 'center' },
	{ field: 'account_number', header: 'Número de Cuenta', align: 'center' },
	{ field: 'type', header: 'Tipo', align: 'center' },
	{ field: 'initial_balance', header: 'Saldo Inicial', align: 'center' },
	{ field: 'daily_limit_amount', header: 'Saldo límite diario', align: 'center' },
	{ field: 'status', header: 'Estado', align: 'center' },
];

export const MESSAGES = {
    messaeEmpty: 'No se encontró ningún héroe.'
}

export const ACCOUNT_LIST_IMPORTS = [
    ButtonComponent,
    TableComponent,
    MenuComponent
];