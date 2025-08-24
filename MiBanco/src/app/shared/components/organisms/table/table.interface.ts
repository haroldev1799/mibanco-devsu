
export interface Column<T> {
	field: T;
	header: string;
	type?: I_ColumnType;
	width?: string;
	maxWidth?: string;
	align?: 'left' | 'center' | 'right';
}

export type I_ColumnType =
	| 'date'
	| 'state'
	| 'actions'
	| 'text'
	| 'link'
	| 'ordinal'
	| 'color'
	| 'collapsed'
	| 'dateTime'
	| 'checked'
	| 'dateRange'
	| 'wordBreak'
	| 'background'
	| 'stageCounter'
	| 'button'
	| 'currency';
