import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tgUsername',
})
export class TgUsernamePipe implements PipeTransform {
  transform(username: string): string {
    return `@${username}`;
  }
}
