import { Tvshow } from './../../../models/tvshow';
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'appCurrentDateTvshows'
})

export class CurrentDateTvshowsPipe implements PipeTransform {
  transform(tvshows: Tvshow[], date: string): Tvshow[] {
    const filteredTvshows = tvshows.filter(item => item.date === date);

    return filteredTvshows;
  }
}
