import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'durationTime'
})

export class DurationTimePipe implements PipeTransform {
  transform(value: number): string {
    const duration = moment.duration(value, 'seconds');
    return duration.hours() + 'ч. ' + duration.minutes() + 'мин. ' + duration.seconds() + 'сек.';
  }
}
