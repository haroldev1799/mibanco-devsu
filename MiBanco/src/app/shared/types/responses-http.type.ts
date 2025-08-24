/**
 * Estructura base de la respuesta HTTP.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type HttpBaseResponse = {
	readonly status?: number;
	readonly success: boolean;
	readonly message: string;
};

/**
 * Respuesta HTTP que contiene un objeto como data.
 */
export type HttpObjectResponse<T> = HttpBaseResponse & {
	readonly data: T;
};

/**
 * Respuesta HTTP que contiene una lista de objetos.
 */
export type HttpListResponse<T> = HttpBaseResponse & {
	readonly data: readonly T[];
};
