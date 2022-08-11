import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timePipe'
})

export class TimePipe implements PipeTransform {
  transform(value: string) {
    const time = +value;
    const hours: number = Math.floor(time / 3600);
    const minutes: number = Math.floor((time - hours * 3600) / 60);
    const seconds: number = Math.floor(time - hours * 3600 - minutes * 60);
    return `${this.checkZero(hours)}:${this.checkZero(minutes)}:${this.checkZero(seconds)}`;
  }

  private checkZero(time: number) {
    return `${time > 9 ? time : '0' + time}`;
  }
}

