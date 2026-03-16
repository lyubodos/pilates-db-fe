import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {catchError, throwError} from "rxjs";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const isApiCall = req.url.startsWith('/');

    const reqWithCreds = isApiCall
      ? req.clone({ withCredentials: true })
      : req;

    return next.handle(reqWithCreds).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.auth.logout('unauthorized');
        }
        return throwError(() => err);
      })
    );
  }
}
