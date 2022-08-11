import { Tvshow } from './../../models/tvshow';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'progressPipe'
})

export class ProgressPipe implements PipeTransform {
  transform(tvshow: Tvshow, currentTime: number): number {
    if (tvshow && currentTime) {
      const start: number = +tvshow.start;
      const stop: number = +tvshow.stop;
      const result = ((currentTime - start) / (stop - start)) * 100;
      return result <= 100 ? result : 0;
    }
    return 0;
  }
}
