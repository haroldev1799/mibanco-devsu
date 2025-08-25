import { Client } from "@app/modules/client/domain/dto/client.dto";
import { Column } from "@app/shared/components/organisms/table/table.interface";

export const COLUMNS_CLIENT_LIST: Column<keyof Client | ''>[] = [
	{ field: '', header: 'actions', type: 'actions' },
	{ field: 'id', header: 'ID', align: 'center' },
	{ field: 'name', header: 'NOMBRE', align: 'center' },
	{ field: 'gender', header: 'GÉNERO', align: 'center' },
	{ field: 'age', header: 'EDAD', align: 'center' },
	{ field: 'status', header: 'ESTADO', align: 'center' },
	{ field: 'identification', header: 'IDENTIFICACIÓN', align: 'center' },
	{ field: 'address', header: 'DIRECCIÓN', align: 'center' },
	{ field: 'phone', header: 'TELÉFONO', align: 'center' },
	{ field: 'password', header: 'CONTRASEÑA', align: 'center' },
];

export const MESSAGES = {
    messaeEmpty: 'No se encontró ningún héroe.'
}