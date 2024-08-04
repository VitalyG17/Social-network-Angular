import { Component, inject, OnInit } from '@angular/core';
import { SideBar } from '../../data/interfaces/side-bar.interface';
import { ProfileService } from '../../data/services/profile.service';
import { firstValueFrom, Observable } from 'rxjs';
import { Profile } from '../../data/interfaces/profile.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  private readonly profileService: ProfileService = inject(ProfileService);

  protected readonly subscribers$: Observable<Profile[]> =
    this.profileService.getSubscribersShortList();

  protected me: Profile | null = this.profileService.me;

  protected menuItems: SideBar[] = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: '',
    },
    {
      label: 'Чаты',
      icon: 'chats',
      link: 'chats',
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: 'search',
    },
  ];

  public ngOnInit(): void {
    firstValueFrom(this.profileService.getMe());
  }
}
