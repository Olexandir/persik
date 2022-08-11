import { Person } from './../../models/person';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'castsPipe'
})

export class CastsPipe implements PipeTransform {
  transform(value: Person[]) {
    const casts = value.map(item => item.name);
    return casts;
  }
}
