import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'timePipe'
})

export class TimePipe implements PipeTransform {
  transform(value: string) {
    return moment.unix(+value).format('HH:mm');
  }
}
