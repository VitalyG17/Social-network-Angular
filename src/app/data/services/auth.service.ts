import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginFormData } from '../interfaces/login.interface';
import { TokenResponse } from '../interfaces/auth.interface';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  private readonly http: HttpClient = inject(HttpClient);

  private readonly cookieService: CookieService = inject(CookieService);

  private readonly router: Router = inject(Router);

  private baseApiUrl: string = 'https://icherniakov.ru/yt-course/auth/';

  token: string | null = null;

  private refreshToken: string | null = null;

  public login(payload: LoginFormData): Observable<TokenResponse> {
    const formData: FormData = new FormData();

    formData.append('username', payload.username);
    formData.append('password', payload.password);

    return this.http
      .post<TokenResponse>(`${this.baseApiUrl}token`, formData)
      .pipe(tap((value: TokenResponse) => this.saveTokens(value)));
  }

  public refreshAuthToken(): Observable<TokenResponse> {
    return this.http
      .post<TokenResponse>(`${this.baseApiUrl}refresh`, {
        refresh_token: this.refreshToken,
      })
      .pipe(
        tap((value: TokenResponse) => this.saveTokens(value)),
        catchError((error: HttpErrorResponse) => {
          this.logout();
          return throwError(error);
        }),
      );
  }

  public isAuth(): boolean {
    if (!this.token) {
      this.token = this.cookieService.get('access_token');
      this.refreshToken = this.cookieService.get('refresh_token');
    }
    return Boolean(this.token);
  }

  private logout(): void {
    this.cookieService.deleteAll();
    this.token = null;
    this.refreshToken = null;
    this.router.navigate(['login']);
  }

  private saveTokens(value: TokenResponse) {
    this.token = value.access_token;
    this.refreshToken = value.refresh_token;

    this.cookieService.set('access_token', this.token);
    this.cookieService.set('refresh_token', this.refreshToken);
  }
}
