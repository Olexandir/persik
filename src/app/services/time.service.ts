import { isPlatformBrowser } from '@angular/common';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Subject } from 'rxjs';
import * as moment from 'moment';

@Injectable()
export class TimeService {

  private readonly interval: number = 60000;
  private fastInterval = 1000;
  public timeController: Subject<number> = new Subject<number>();
  public timeControllerFast: Subject<number> = new Subject<number>();

  constructor(@Inject(PLATFORM_ID) private platform: any) {
    if (isPlatformBrowser(this.platform)) {
      setInterval(() => {
        this.timeController.next(this.currentTime);
      }, this.interval);

      setInterval(() => {
        this.timeControllerFast.next(this.currentTime);
      }, this.fastInterval);
    }
  }

  get currentTime(): number {
    return moment().unix();
  }

  getDate(): string { // return 2019-10-02
    return moment().format('YYYY-MM-DD');
  }

  getPreviousDate(): string {
    return moment().add(-1, 'days').format('YYYY-MM-DD');
  }

  convertToTime(time: number): string { // from unixtime to HH:mm
    if (time) {
      return moment.unix(time).format('HH:mm');
    }
    return '';
  }

  convertToDate(date: string): string { // from 2017-09-28 11:30:55 to 28.09.2017
    if (date.length > 10) {
      return moment('YYYY-MM-DD HH:mm:ss').format('DD.MM.YYYY');
    } return '';
  }

  getDurationFromTime(time: number): string {
    if (time) {
      const hours: number = Math.floor(time / 3600);
      const minutes: number = Math.floor((time - hours * 3600) / 60);
      const seconds: number = Math.floor(time - hours * 3600 - minutes * 60);
      return `${this.checkZero(hours)}:${this.checkZero(minutes)}:${this.checkZero(seconds)}`;
    }
    return '';
  }

  private checkZero(time: number) {
    return `${time > 9 ? time : '0' + time}`;
  }
}
