import { Column } from "@app/shared/components/organisms/table/table.interface";

export const COLUMNS_HEROES_LIST: Column<keyof any | ''>[] = [
	{ field: '', header: 'actions', type: 'actions' },
	{ field: 'id', header: 'ID', align: 'center' },
	{ field: 'name', header: 'NOMBRE', align: 'center' },
	{ field: 'power', header: 'PODER', align: 'center' },
	{ field: 'universe', header: 'UNIVERSO', align: 'center' },
	{ field: 'age', header: 'EDAD', align: 'center' },
	{ field: 'createdAt', header: 'FECHA CREACIÓN', type: 'date', align: 'center' },
	{ field: 'updatedAt', header: 'FECHA ACTUALIZACIÓN', type: 'date', align: 'center' },
];

export const MESSAGES = {
    messaeEmpty: 'No se encontró ningún héroe.'
}