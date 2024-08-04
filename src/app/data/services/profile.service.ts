import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { Profile } from '../interfaces/profile.interface';
import { Pageble } from '../interfaces/pageble.interface';

@Injectable()
export class ProfileService {
  private readonly http: HttpClient = inject(HttpClient);

  private baseApiUrl: string = 'https://icherniakov.ru/yt-course';

  me: Profile | null = null;

  public getTestAccounts(): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${this.baseApiUrl}/account/test_accounts`);
  }

  public getMe(): Observable<Profile> {
    return this.http
      .get<Profile>(`${this.baseApiUrl}/account/me`)
      .pipe(tap((res: Profile) => (this.me = res)));
  }

  public getSubscribersShortList(): Observable<Profile[]> {
    return this.http
      .get<Pageble<Profile>>(`${this.baseApiUrl}/account/subscribers/`)
      .pipe(map((res: Pageble<Profile>) => res.items.slice(0, 3)));
  }
}
