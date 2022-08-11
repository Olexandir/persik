import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genresPipe'
})

export class GenresPipe implements PipeTransform {
  transform(values: string[]) {
    return values.toString().replace(new RegExp(',', 'g'), ', ');
  }
}
