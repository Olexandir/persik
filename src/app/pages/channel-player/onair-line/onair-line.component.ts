import { Component, Input } from '@angular/core';

import { Tvshow } from '@models/core';

@Component({
  selector: 'app-onair-line',
  templateUrl: './onair-line.component.html',
  styleUrls: ['./onair-line.component.scss']
})
export class OnairLineComponent {
  @Input()
  public tvshow: Tvshow;
  @Input()
  public currentTime: number;

  constructor() {}

  public get progress(): number {
    if (this.tvshow) {
      return Math.round(((this.currentTime - this.tvshow.start) / (+this.tvshow.stop - this.tvshow.start)) * 1000) / 10;
    }
    return 0;
  }
}
