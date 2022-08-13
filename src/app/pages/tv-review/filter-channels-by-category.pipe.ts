import { Pipe, PipeTransform } from '@angular/core';
import { Channel } from '@models/core';

@Pipe({
  name: 'filterChannelsByCategory'
})
export class FilterChannelsByCategoryPipe implements PipeTransform {
  transform(channels: Channel[], categoryId: number): Channel[] {
    return !categoryId ? channels : this.filter(channels, categoryId);
  }

  private filter(channels: Channel[], categoryId: number): Channel[] {
    return channels.filter(({ genres }) => {
      return genres.some((genreId) => genreId === categoryId);
    });
  }
}
