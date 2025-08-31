import { Movement } from "@app/modules/movement/domain/dto/movement.dto";
import { Column } from "@app/shared/components/organisms/table/table.interface";

export const COLUMNS_MOVEMENTS_LIST: Column<keyof Movement | ''>[] = [
	{ field: '', header: 'actions', type: 'actions' },
	{ field: 'id', header: 'ID', align: 'center' },
	{ field: 'date', header: 'FECHA', align: 'center', type: 'date' },
	{ field: 'transaction_type', header: 'TIPO DE TRANSACCION', align: 'center' },
	{ field: 'amount', header: 'MONTO', align: 'center' },
	{ field: 'balance', header: 'SALDO', align: 'center' },
	{ field: 'account', header: 'CUENTA', align: 'center' },
	{ field: 'client', header: 'CLIENTE', align: 'center' },
];

export const MESSAGES = {
    messaeEmpty: 'No se encontró ningún héroe.'
}