import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'expiredPipe'
})

export class ExpiredPipe implements PipeTransform {
  transform(value: string) {
    moment.locale('ru');
    const isActive = moment().unix() < moment(value, 'YYYY-MM-DD HH:mm:ss').unix();
    if (isActive) {
      const textArray = moment(value, 'YYYY-MM-DD HH:mm:ss').endOf('day').fromNow().split(' ');
      return textArray[1] + ' ' + textArray[2];
    }
    return 'Подписка закончилась';
  }
}
