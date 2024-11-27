import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHandlerFn,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';


/*
 *  this is a simple http injector to add an authentication
 *  token to the header of each request if it is set
 **/
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private cookieService : CookieService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.cookieService.check('AuthToken')) {
      // Clone the request to add the new header
      const clonedRequest = req.clone({ headers: req.headers.append('Authorization', `Bearer ${this.cookieService.get('AuthToken')}`) });
      return next.handle(clonedRequest);
    }

    return next.handle(req);
    // Pass the cloned request instead of the original request to the next handle
  }


}


/*
 * function used to intercept outgoing http requests in order to append an authentication header to them
* */
export function authInterceptorFN(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const cookieService : CookieService = inject(CookieService);

  if (cookieService.check('AuthToken')) {
      // Clone the request to add the new header
      const clonedRequest = req.clone({ headers: req.headers.append('Authorization', `Bearer ${cookieService.get('AuthToken')}`) });
      return next(clonedRequest);
    }

    return next(req);
}

