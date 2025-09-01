import { inject } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HTTP_CODE } from '@core/enums/status.enum';
import { DATA_MESSAGE_DEFAULT, MESSAGE_HTTP_ERROR } from '@core/constants/message-modal-error';
import { END_POINTS_EXCLUDED, MESSAGE_ERROR_KEY, MESSAGE_HTTP } from '@core/enums/message-error.enum';
import { DataModalMessage } from '@components/molecules/modals/modal-message-ref/modal-message-ref.interface';
export class HttpErrorInterceptor implements HttpInterceptor {
	/* eslint-disable @typescript-eslint/no-explicit-any */
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(req).pipe(
			catchError((error: HttpErrorResponse) => {
				const errorMsg = error.error.message ?? MESSAGE_HTTP.ERR_DEFAULT;
				let dataErrorMsg: DataModalMessage = {
					message: errorMsg,
				};

				if (error.status === HTTP_CODE.STATUS_403) {
					dataErrorMsg = MESSAGE_HTTP_ERROR[MESSAGE_ERROR_KEY.PERMISSIONS];
				}

				if (error.status === HTTP_CODE.STATUS_403 && errorMsg === MESSAGE_HTTP.RECAPCHA) {
					dataErrorMsg = MESSAGE_HTTP_ERROR[MESSAGE_ERROR_KEY.RECAPCHA];
				}

				if (error.status === HTTP_CODE.STATUS_403 && errorMsg === MESSAGE_HTTP.TOKEN_INVALID) {
					dataErrorMsg = MESSAGE_HTTP_ERROR[MESSAGE_ERROR_KEY.EXPIRED_SESION];
				}

				if (error.status === HTTP_CODE.STATUS_404) {
					dataErrorMsg = {
						...MESSAGE_HTTP_ERROR[MESSAGE_ERROR_KEY.NOT_FOUND],
						message: errorMsg ? errorMsg : MESSAGE_HTTP_ERROR[MESSAGE_ERROR_KEY.NOT_FOUND].message,
					};
				}

				if (error.status === HTTP_CODE.STATUS_422) {
					dataErrorMsg = MESSAGE_HTTP_ERROR[MESSAGE_ERROR_KEY.CREDENTIALS];
				}

				if (error.status === HTTP_CODE.STATUS_422 && errorMsg === MESSAGE_HTTP.TOKEN_PASSWORD) {
					dataErrorMsg = MESSAGE_HTTP_ERROR[MESSAGE_ERROR_KEY.EXPIRED_TOKEN_PASS];
				}

				if (!req.url.includes(END_POINTS_EXCLUDED.SEARCH)) {
					
					console.log({ status: true, data: { ...DATA_MESSAGE_DEFAULT, ...dataErrorMsg }})
				}
				return throwError(() => error);
			}),
		);
	}
}
