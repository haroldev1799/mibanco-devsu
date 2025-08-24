import { APP_ROUTE_NAMES } from '@app/app.routenames';
import { DataModalMessage } from '@components/molecules/modals/modal-message-ref/modal-message-ref.interface';
import { MESSAGE_ERROR_KEY } from '@core/enums/message-error.enum';

export const DATA_MESSAGE_DEFAULT: Partial<DataModalMessage> = {
	title: 'Error',
	buttonText: 'Entendido',
	icon: 'exclamation-circle',
};

export const MESSAGE_HTTP_ERROR = {
	[MESSAGE_ERROR_KEY.CREDENTIALS]: {
		title: 'Accesos incorrectos',
		message: 'El correo o la contraseña ingresados son incorrectos. <br> Inténtalo nuevamente.',
	},
	[MESSAGE_ERROR_KEY.NOT_FOUND]: {
		message: 'No se encontró el recurso solicitado',
	},
	[MESSAGE_ERROR_KEY.CONFLICT]: {
		title: 'Conflicto de datos.',
		message: 'Al parecer ya existe un registro con el <br> mismo código',
	},
	[MESSAGE_ERROR_KEY.CONFLICT_USER]: {
		title: 'Conflicto de datos.',
		message: 'El correo ya se encuentra en uso, <br> intente con otro',
	},
	[MESSAGE_ERROR_KEY.EXPIRED_SESION]: {
		title: 'Sesión expirada',
		message: 'Por favor, inicia sesión de nuevo',
		urlRedirect: APP_ROUTE_NAMES.UNAUTHORIZED,
	},
	[MESSAGE_ERROR_KEY.PERMISSIONS]: {
		title: 'Permisos',
		message: 'No tienes permisos para acceder.',
		urlRedirect: APP_ROUTE_NAMES.UNAUTHORIZED,
	},
	[MESSAGE_ERROR_KEY.RECAPCHA]: {
		message: 'El recapcha no es válido',
	},
	[MESSAGE_ERROR_KEY.EXPIRED_TOKEN_PASS]: {
		title: 'El enlace expiró',
		message:
			'Ha sobrepasado el tiempo permitido para recuperar <br> su contraseña. Por favor, solicite un nuevo enlace.',
		urlRedirect: APP_ROUTE_NAMES.UNAUTHORIZED,
	},
};
