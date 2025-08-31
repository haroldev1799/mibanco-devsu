import { FilterForm, Reports } from "@app/modules/report/domain/dto/report.dto";
import { Column } from "@app/shared/components/organisms/table/table.interface";

export const COLUMNS_REPORT_LIST: Column<keyof Reports | ''>[] = [
	{ field: '', header: 'actions', type: 'actions' },
	{ field: 'client', header: 'CLIENTE', align: 'center' },
	{ field: 'account', header: 'CUENTA', align: 'center' },
	{ field: 'daily_limit_amount', header: 'LÍMITE DIARIO', align: 'center' },
	{ field: 'initial_balance', header: 'SALDO INICIAL', align: 'center' },
	{ field: 'current_balance', header: 'SALDO ACTUAL', align: 'center' },
	{ field: 'transaction_type', header: 'TIPO DE MOVIMIENTO', align: 'center' },
	{ field: 'balance', header: 'SALDO DURANTE EL MOVIMIENTO', align: 'center' },
	{ field: 'amount', header: 'MONTO DE MOVIMINETO', align: 'center' },
	{ field: 'date', header: 'FECHA DE MOVIMIENTO', type: 'date', align: 'center' },
];

export const FILTER_FORM = {
    client_id: 'client_id',
    account_id: 'account_id',
    date: 'date'
} as const satisfies Record<string, keyof FilterForm>;


export const MESSAGES = {
    messaeEmpty: 'No se encontró ningún reporte.'
}