import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'simpleDate'
})

export class SimpleDatePipe implements PipeTransform {
  transform(value: string) {
    return moment(value, 'YYYY-MM-DD HH:mm:ss').format('DD.MM.YYYY');
  }
}
