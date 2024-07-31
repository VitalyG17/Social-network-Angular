import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginFormData } from '../interfaces/login.interface';
import { TokenResponse } from '../interfaces/auth.interface';
import { Observable, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthService {
  private readonly http: HttpClient = inject(HttpClient);

  private readonly cookieService: CookieService = inject(CookieService);

  private baseApiUrl: string = 'https://icherniakov.ru/yt-course/auth/';

  private token: string | null = null;

  private refreshToken: string | null = null;

  public login(payload: LoginFormData): Observable<TokenResponse> {
    const formData: FormData = new FormData();

    formData.append('username', payload.username);
    formData.append('password', payload.password);

    return this.http
      .post<TokenResponse>(`${this.baseApiUrl}token`, formData)
      .pipe(
        tap((value: TokenResponse) => {
          this.token = value.access_token;
          this.refreshToken = value.refresh_token;

          this.cookieService.set('access_token', this.token);
          this.cookieService.set('refresh_token', this.refreshToken);
        }),
      );
  }

  public isAuth(): boolean {
    if (!this.token) {
      this.token = this.cookieService.get('access_token');
    }
    return Boolean(this.token);
  }
}
