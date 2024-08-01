import { inject, Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { TokenResponse } from '../interfaces/auth.interface';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  private readonly authService: AuthService = inject(AuthService);

  private token: string | null = this.authService.token;

  private isRefreshing: boolean = false;

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    if (!this.token) return next.handle(req);

    if (this.isRefreshing) {
      return this.refreshAndProceed(this.authService, req, next);
    }

    return next.handle(this.addToken(req, this.token)).pipe(
      catchError((err) => {
        if (err.status === 403) {
          return this.refreshAndProceed(this.authService, req, next);
        }
        return throwError(err);
      }),
    );
  }

  private refreshAndProceed(
    authService: AuthService,
    req: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      return authService.refreshAuthToken().pipe(
        switchMap((res: TokenResponse) => {
          this.isRefreshing = false;
          return next.handle(this.addToken(req, res.access_token));
        }),
      );
    }

    return next.handle(this.addToken(req, this.authService.token));
  }

  private addToken(
    req: HttpRequest<unknown>,
    token: string | null,
  ): HttpRequest<unknown> {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
