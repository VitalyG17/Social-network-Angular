import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../interfaces/profile.interface';

@Injectable()
export class ProfileService {
  private readonly http: HttpClient = inject(HttpClient);
  private baseApiUrl: string = 'https://icherniakov.ru/yt-course';

  getTestAccounts(): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${this.baseApiUrl}/account/test_accounts`);
  }
}
