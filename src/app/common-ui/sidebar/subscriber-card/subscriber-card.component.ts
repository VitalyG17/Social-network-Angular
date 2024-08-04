import { Component, Input } from '@angular/core';
import { Profile } from 'src/app/data/interfaces/profile.interface';

@Component({
  selector: 'app-subscriber-card',
  templateUrl: './subscriber-card.component.html',
  styleUrls: ['./subscriber-card.component.scss'],
})
export class SubscriberCardComponent {
  @Input() profile!: Profile;
}
