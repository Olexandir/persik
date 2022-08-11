import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'castsPipe'
})

export class CastsPipe implements PipeTransform {
  transform(value: string[]) {
    let castString = '';
    value.forEach((cast, index) => {
      if (index < value.length - 1) {
        castString += cast + ', ';
      } else {
        castString += cast + '.';
      }
    });
    return castString;
  }
}
