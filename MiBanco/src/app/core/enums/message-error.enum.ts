export enum MESSAGE_ERROR_KEY {
	CREDENTIALS = 'credentials',
	NOT_FOUND = 'notFound',
	CONFLICT = 'confict',
	CONFLICT_USER = 'conflictUser',
	EXPIRED_SESION = 'expiredSesion',
	PERMISSIONS = 'permissions',
	RECAPCHA = 'recapcha',
	EXPIRED_TOKEN_PASS = 'expiredTokenPassword',
}

export enum MESSAGE_HTTP {
	RECAPCHA = 'Captcha incorrecto.',
	TOKEN_INVALID = 'Token no válido.',
	TOKEN_PASSWORD = 'El token no es válido.',
	ERR_DEFAULT = 'Al parecer hubo un error en su solicitud',
}

export enum END_POINTS_EXCLUDED {
	SEARCH = 'search',
}
