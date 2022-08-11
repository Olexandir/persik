import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'datePipe'
})

export class DatePipe implements PipeTransform {

  transform(value: string) {
    moment.locale('ru');
    let dateStr = moment(value, 'YYYY-MM-DD').format('DD MMM - dddd');
    dateStr = dateStr.replace('.', '');
    return dateStr;
  }

}
