import { TimeService } from '@services/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-connection-info',
  templateUrl: 'connection-info.component.html',
  styleUrls: ['connection-info.component.scss']
})

export class ConnectionInfoComponent implements OnInit, OnDestroy {

  public isShowInfo: boolean;
  public isOnline = true;

  private timerSubscriber: Subscription;
  private readonly delay = 4000;
  private delayTimer: any;

  constructor(private timeService: TimeService) {}

  ngOnInit() {
    this.timerSubscriber = this.timeService.timeControllerFast.subscribe(_ => {
      const isOnline = window.navigator.onLine;
      if (isOnline !== this.isOnline) {
        this.isOnline = isOnline;
        this.showInfo();
      }
    });
  }

  private showInfo(): void {
    this.isShowInfo = true;
    if (this.isOnline) {
      clearTimeout(this.delayTimer);
      this.delayTimer = setTimeout(() => {
        this.isShowInfo = false;
      }, this.delay);
    }
  }

  ngOnDestroy() {
    if (this.timerSubscriber) {
      this.timerSubscriber.unsubscribe();
    }
  }
}
