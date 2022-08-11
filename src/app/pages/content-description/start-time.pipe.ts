import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'startTimePipe'
})

export class StartTimePipe implements PipeTransform {
  transform(value: string) {
    moment.locale('ru');
    return moment.unix(+value).calendar().toLowerCase().replace(',', '');
  }
}
