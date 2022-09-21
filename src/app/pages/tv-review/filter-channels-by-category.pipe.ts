import { Pipe, PipeTransform } from '@angular/core';
import { Channel } from '@models/core';

@Pipe({
  name: 'filterChannelsByCategoryPipe'
})
export class FilterChannelsByCategoryPipe implements PipeTransform {
  transform(channels: Channel[], categoryId: number): Channel[] {
    return !categoryId ? channels : this.filter(channels, categoryId);
  }

  private filter(channels: Channel[], categoryId: number): Channel[] {
    return channels.filter(({ genres }) => {
      return genres.includes(categoryId);
    });

    // return channels.filter(({ genres }) => {
    //   return genres.some((genre) => genre === categoryId);
    // });
  }
}
