import { Tvshow } from '@models/core';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'appUniqueDates'
})

export class UniqueDatesPipe implements PipeTransform {
  transform(tvshows: Tvshow[]): string[] {
    const dates = tvshows.map(tvshow => tvshow.date);

    return Array.from(new Set(dates));
  }
}
