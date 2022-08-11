import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titlePipe'
})

export class TitlePipe implements PipeTransform {
  transform(value: string) {
    return (value && value.length > 0) ? value : 'Нет данных';
  }
}
