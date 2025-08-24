import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export class HttpAuthInterceptor implements HttpInterceptor {
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const token = 'token_here';

		const authReq = token
			? req.clone({
					headers: req.headers.set('Authorization', `Bearer ${token}`),
				})
			: req;

		return next.handle(authReq);
	}
}
