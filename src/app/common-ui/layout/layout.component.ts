import { Component, inject, OnInit } from '@angular/core';
import { ProfileService } from '../../data/services/profile.service';
import { Profile } from '../../data/interfaces/profile.interface';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  private readonly profileService: ProfileService = inject(ProfileService);

  public ngOnInit(): void {
    this.profileService.getMe().subscribe((value: Profile) => {
      console.log(value);
    });
  }
}
